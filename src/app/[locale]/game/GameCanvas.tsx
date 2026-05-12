import { useRef, useEffect, useState, useCallback } from 'react';
import type { GameState, GameAssets, InputState } from './types';
import { createInitialState, updateGame, consumeItem, collectWater, placeCampfire, startGame, continueToNextDay } from './engine';
import { renderGame, renderMenuBackground, getTimeText, getTimeColor } from './renderer';
import { COLORS } from './config';
import { gameText } from '@/i18n/game';

export default function GameCanvas({ locale }: { locale: string }) {
  const t = gameText[locale as 'zh' | 'en'];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState>(createInitialState());
  const inputRef = useRef<InputState>({
    keys: new Set(),
    joystickActive: false,
    joystickDx: 0,
    joystickDy: 0,
    collectPressed: false,
  });
  const assetsRef = useRef<GameAssets | null>(null);
  const [gameScreen, setGameScreen] = useState(gameStateRef.current.screen);
  const [stats, setStats] = useState({
    hp: 100,
    maxHp: 100,
    hunger: 100,
    maxHunger: 100,
    thirst: 100,
    maxThirst: 100,
    inventory: { wood: 0, apple: 0, water: 0, fire: 0 },
    day: 1,
    timeText: locale === 'zh' ? '白天' : 'Daytime',
    timeColor: '#F8B500',
    nearTree: false,
    score: 0,
    deathCause: 'unknown',
    totalDaysSurvived: 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const joystickRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  });
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // 检测移动端
  useEffect(() => {
    const check = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(check);
  }, []);

  // 加载资源
  useEffect(() => {
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img); // 即使失败也继续
        img.src = src;
      });
    };

    Promise.all([
      loadImage('/player.png'),
      loadImage('/tree.png'),
      loadImage('/apple_tree.png'),
      loadImage('/pool.png'),
      loadImage('/campfire.png'),
      loadImage('/grass_tile.jpg'),
    ]).then(([player, tree, appleTree, pool, campfire, grassTile]) => {
      assetsRef.current = { player, tree, appleTree, pool, campfire, grassTile };
    });
  }, []);

  // 键盘输入
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      inputRef.current.keys.add(key);

      // 空格或E收集
      if (key === ' ' || key === 'e') {
        inputRef.current.collectPressed = true;
        setTimeout(() => { inputRef.current.collectPressed = false; }, 100);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      inputRef.current.keys.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 游戏主循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const gameLoop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05); // 限制最大dt
      lastTimeRef.current = timestamp;

      const state = gameStateRef.current;
      const input = inputRef.current;
      const assets = assetsRef.current;

      // 更新摇杆输入
      const joy = joystickRef.current;
      if (joy.active) {
        input.joystickActive = true;
        const dx = joy.currentX - joy.startX;
        const dy = joy.currentY - joy.startY;
        const maxDist = 50;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
          const scale = Math.min(dist, maxDist) / dist;
          input.joystickDx = (dx * scale) / maxDist;
          input.joystickDy = (dy * scale) / maxDist;
        }
      } else {
        input.joystickActive = false;
        input.joystickDx = 0;
        input.joystickDy = 0;
      }

      // 更新游戏逻辑
      updateGame(state, input, dt);

      // 渲染
      if (assets) {
        if (state.screen === 'menu') {
          renderMenuBackground(ctx, assets, canvas.width, canvas.height);
        } else if (state.screen === 'playing' || state.screen === 'day_transition' || state.screen === 'game_over') {
          renderGame(ctx, state, assets, canvas.width, canvas.height);
        }
      } else {
        ctx.fillStyle = '#2D3436';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 同步React状态(降低频率)
      if (Math.floor(timestamp / 100) !== Math.floor((timestamp - dt * 1000) / 100)) {
        setGameScreen(state.screen);
        setStats({
          hp: Math.round(state.player.hp),
          maxHp: state.player.maxHp,
          hunger: Math.round(state.player.hunger),
          maxHunger: state.player.maxHunger,
          thirst: Math.round(state.player.thirst),
          maxThirst: state.player.maxThirst,
          inventory: { ...state.player.inventory },
          day: state.currentDay,
          timeText: getTimeText(state, locale),
          timeColor: getTimeColor(state),
          nearTree: state.nearTree,
          score: state.score,
          deathCause: state.deathCause,
          totalDaysSurvived: state.totalDaysSurvived,
        });
      }

      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // 虚拟摇杆触摸事件
  const handleJoystickStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    joystickRef.current = {
      active: true,
      startX: rect.left + rect.width / 2,
      startY: rect.top + rect.height / 2,
      currentX: touch.clientX,
      currentY: touch.clientY,
    };
  }, []);

  const handleJoystickMove = useCallback((e: React.TouchEvent) => {
    if (!joystickRef.current.active) return;
    const touch = e.touches[0];
    joystickRef.current.currentX = touch.clientX;
    joystickRef.current.currentY = touch.clientY;
  }, []);

  const handleJoystickEnd = useCallback(() => {
    joystickRef.current.active = false;
    inputRef.current.joystickActive = false;
    inputRef.current.joystickDx = 0;
    inputRef.current.joystickDy = 0;
  }, []);

  // 收集按钮
  const handleCollect = useCallback(() => {
    inputRef.current.collectPressed = true;
    setTimeout(() => { inputRef.current.collectPressed = false; }, 100);
  }, []);

  // 消耗物品
  const handleConsumeApple = useCallback(() => {
    consumeItem(gameStateRef.current, 'apple');
  }, []);

  const handleConsumeWater = useCallback(() => {
    consumeItem(gameStateRef.current, 'water');
  }, []);

  const handleCollectWater = useCallback(() => {
    collectWater(gameStateRef.current);
  }, []);

  const handlePlaceFire = useCallback(() => {
    placeCampfire(gameStateRef.current);
  }, []);

  // 开始游戏
  const handleStartGame = useCallback(() => {
    startGame(gameStateRef.current);
  }, []);

  // 继续下一天
  const handleContinue = useCallback(() => {
    continueToNextDay(gameStateRef.current);
  }, []);

  // 重新开始
  const handleRestart = useCallback(() => {
    startGame(gameStateRef.current);
  }, []);

  // 获取死亡原因文本
  const getDeathCauseText = (cause: string): string => {
    switch (cause) {
      case 'hunger': return t.deathHunger;
      case 'thirst': return t.deathThirst;
      case 'cold': return t.deathCold;
      default: return t.deathUnknown;
    }
  };

  // 计算状态条百分比
  const hpPercent = (stats.hp / stats.maxHp) * 100;
  const hungerPercent = (stats.hunger / stats.maxHunger) * 100;
  const thirstPercent = (stats.thirst / stats.maxThirst) * 100;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#2D3436] select-none" style={{ touchAction: 'none' }}>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* ====== 主菜单 ====== */}
      {gameScreen === 'menu' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="text-center">
            <div
              role="presentation"
              className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg"
            >
              {t.menuTitle}
            </div>
            <p className="text-lg md:text-xl text-[#DFE6E9] mb-8 drop-shadow">
              {t.menuSubtitle}
            </p>
            <button
              onClick={handleStartGame}
              className="px-10 py-4 bg-[#F8B500] hover:bg-[#FFD93D] text-white font-bold text-xl rounded-full shadow-lg transition-transform active:scale-95"
            >
              {t.startGame}
            </button>
            <div className="mt-6 text-sm text-[#DFE6E9] space-y-1">
              <p>{t.menuHintPC}</p>
              <p>{t.menuHintMobile}</p>
            </div>
          </div>
        </div>
      )}

      {/* ====== 游戏中 HUD ====== */}
      {gameScreen === 'playing' && (
        <>
          {/* 顶部状态栏 */}
          <div className="absolute top-0 left-0 right-0 p-3 z-10">
            <div className="flex items-start justify-between max-w-lg mx-auto">
              {/* 左侧：天数和时间 */}
              <div className="bg-black/50 rounded-xl px-3 py-2 backdrop-blur-sm">
                <div className="text-white font-bold text-sm">{t.day.replace('{day}', String(stats.day))}</div>
                <div className="text-xs font-medium" style={{ color: stats.timeColor }}>
                  {stats.timeText}
                </div>
              </div>

              {/* 中间：状态条 */}
              <div className="flex-1 mx-3 space-y-1.5 bg-black/50 rounded-xl px-3 py-2 backdrop-blur-sm">
                {/* 生命值 */}
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs w-8">{t.hp}</span>
                  <div className="flex-1 h-2.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${hpPercent}%`,
                        backgroundColor: hpPercent < 25 ? '#FF4757' : '#FF6B81',
                      }}
                    />
                  </div>
                  <span className="text-white text-xs w-12 text-right">{stats.hp}/{stats.maxHp}</span>
                </div>
                {/* 饥饿值 */}
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs w-8">{t.hunger}</span>
                  <div className="flex-1 h-2.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${hungerPercent}%`,
                        backgroundColor: COLORS.hunger,
                      }}
                    />
                  </div>
                  <span className="text-white text-xs w-12 text-right">{stats.hunger}/{stats.maxHunger}</span>
                </div>
                {/* 口渴值 */}
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs w-8">{t.thirst}</span>
                  <div className="flex-1 h-2.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${thirstPercent}%`,
                        backgroundColor: COLORS.thirst,
                      }}
                    />
                  </div>
                  <span className="text-white text-xs w-12 text-right">{stats.thirst}/{stats.maxThirst}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 物品栏 */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
            <div className="flex items-center gap-3 bg-black/50 rounded-2xl px-4 py-2 backdrop-blur-sm">
              {/* 木头 */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: COLORS.wood }}>
                  🪵
                </div>
                <span className="text-white text-xs font-bold mt-0.5">{stats.inventory.wood}</span>
              </div>
              {/* 苹果 */}
              <button onClick={handleConsumeApple} className="flex flex-col items-center active:scale-90 transition-transform">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: COLORS.apple }}>
                  🍎
                </div>
                <span className="text-white text-xs font-bold mt-0.5">{stats.inventory.apple}</span>
              </button>
              {/* 水 */}
              <button onClick={handleConsumeWater} className="flex flex-col items-center active:scale-90 transition-transform">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: COLORS.water }}>
                  💧
                </div>
                <span className="text-white text-xs font-bold mt-0.5">{stats.inventory.water}</span>
              </button>
              {/* 生火按钮 */}
              <button
                onClick={handlePlaceFire}
                disabled={stats.inventory.wood < 3}
                className="flex flex-col items-center active:scale-90 transition-transform disabled:opacity-40"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: COLORS.fire }}>
                  🔥
                </div>
                <span className="text-white text-xs font-bold mt-0.5">{Math.floor(stats.inventory.wood / 3)}</span>
              </button>
              {/* 补水按钮 */}
              <button onClick={handleCollectWater} className="flex flex-col items-center active:scale-90 transition-transform ml-1">
                <div className="w-10 h-10 rounded-full bg-blue-500/80 flex items-center justify-center text-lg">
                  💧
                </div>
                <span className="text-white text-xs font-bold mt-0.5">{t.refill}</span>
              </button>
            </div>
          </div>

          {/* 底部控制区 */}
          <div className="absolute bottom-4 left-0 right-0 px-4 z-10">
            <div className="flex items-end justify-between max-w-lg mx-auto">
              {/* 虚拟摇杆(移动端) */}
              {isMobile && (
                <div
                  className="w-28 h-28 rounded-full bg-[#55E6C1]/30 border-2 border-[#55E6C1]/50 relative"
                  onTouchStart={handleJoystickStart}
                  onTouchMove={handleJoystickMove}
                  onTouchEnd={handleJoystickEnd}
                >
                  {/* 摇杆点 */}
                  <div
                    className="absolute w-10 h-10 bg-white rounded-full shadow-lg"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate(${(joystickRef.current?.currentX || 0) - (joystickRef.current?.startX || 0)}px, ${(joystickRef.current?.currentY || 0) - (joystickRef.current?.startY || 0)}px)`,
                      transition: joystickRef.current?.active ? 'none' : 'transform 0.15s',
                    }}
                  />
                </div>
              )}
              {!isMobile && <div />}

              {/* 收集按钮 */}
              <button
                onClick={handleCollect}
                onTouchStart={(e) => { e.preventDefault(); handleCollect(); }}
                className={`w-20 h-20 rounded-full font-bold text-white text-sm shadow-lg transition-all active:scale-90 ${
                  stats.nearTree
                    ? 'bg-[#F8B500] shadow-[#F8B500]/50 animate-pulse'
                    : 'bg-gray-500'
                }`}
              >
                {t.collect}
              </button>
            </div>
          </div>

          {/* PC端操作提示 */}
          {!isMobile && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/40 text-xs z-10">
              {t.pcHint}
            </div>
          )}
        </>
      )}

      {/* ====== 每日结算 ====== */}
      {gameScreen === 'day_transition' && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/70">
          <div className="bg-[#2D3436] rounded-2xl p-8 text-center max-w-sm mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-[#1DD1A1] mb-4">
              {t.daySurvived.replace('{day}', String(stats.totalDaysSurvived))}
            </h2>
            <div className="text-[#DFE6E9] mb-2">
              {t.resources}
            </div>
            <div className="flex justify-center gap-4 mb-6 text-white">
              <div>🪵 {stats.inventory.wood}</div>
              <div>🍎 {stats.inventory.apple}</div>
              <div>💧 {stats.inventory.water}</div>
            </div>
            <div className="text-sm text-[#DFE6E9] mb-6">
              {t.nextDay.replace('{day}', String(stats.day))}
            </div>
            <button
              onClick={handleContinue}
              className="px-8 py-3 bg-[#F8B500] hover:bg-[#FFD93D] text-white font-bold rounded-full transition-transform active:scale-95"
            >
              {t.continue}
            </button>
          </div>
        </div>
      )}

      {/* ====== 游戏结束 ====== */}
      {gameScreen === 'game_over' && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/70">
          <div className="bg-[#2D3436] rounded-2xl p-8 text-center max-w-sm mx-4 shadow-2xl">
            <h2 className="text-3xl font-bold text-[#FF4757] mb-2">
              {t.gameOver}
            </h2>
            <div className="text-[#DFE6E9] mb-4">
              {t.deathCause}<span className="text-white font-bold">{getDeathCauseText(stats.deathCause)}</span>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {stats.totalDaysSurvived}
            </div>
            <div className="text-sm text-[#DFE6E9] mb-6">
              {t.daysSurvived}
            </div>
            <div className="text-sm text-[#DFE6E9] mb-6">
              {t.score}{stats.score}
            </div>
            {stats.totalDaysSurvived >= 10 && (
              <div className="text-lg text-[#F8B500] font-bold mb-4">
                {t.congrats}
              </div>
            )}
            <button
              onClick={handleRestart}
              className="px-8 py-3 bg-[#1DD1A1] hover:bg-[#2EE8B5] text-white font-bold rounded-full transition-transform active:scale-95"
            >
              {t.restart}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
