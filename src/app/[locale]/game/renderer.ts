import type { GameState, GameAssets, FloatingText, Particle, Campfire } from './types';
import { MAP_WIDTH, MAP_HEIGHT, COLORS } from './config';

// 渲染游戏世界
export function renderGame(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  assets: GameAssets,
  canvasWidth: number,
  canvasHeight: number
): void {
  const { camera, player, entities, campfires, floatingTexts, particles } = state;

  // 计算视口偏移
  const offsetX = canvasWidth / 2 - camera.x;
  const offsetY = canvasHeight / 2 - camera.y;

  // 清空画布
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // 绘制背景(草地)
  renderBackground(ctx, assets, offsetX, offsetY, canvasWidth, canvasHeight);

  // 绘制实体(按Y排序实现遮挡关系)
  const sortedEntities = [...entities, ...campfires.map(cf => ({
    id: cf.id,
    type: 'campfire' as const,
    x: cf.x,
    y: cf.y,
    width: 50,
    height: 50,
    collisionRadius: 0,
    respawnTimer: 0,
  }))].sort((a, b) => a.y - b.y);

  for (const entity of sortedEntities) {
    const screenX = entity.x + offsetX;
    const screenY = entity.y + offsetY;

    // 视口剔除
    if (screenX < -100 || screenX > canvasWidth + 100 || screenY < -100 || screenY > canvasHeight + 100) {
      continue;
    }

    switch (entity.type) {
      case 'tree':
        renderTree(ctx, assets, screenX, screenY);
        break;
      case 'apple_tree':
        renderAppleTree(ctx, assets, screenX, screenY);
        break;
      case 'pool':
        renderPool(ctx, assets, screenX, screenY);
        break;
      case 'campfire':
        renderCampfireEntity(ctx, assets, screenX, screenY, state.campfires.find(cf => cf.id === entity.id));
        break;
    }
  }

  // 绘制玩家
  renderPlayer(ctx, assets, player.x + offsetX, player.y + offsetY, player);

  // 绘制粒子
  for (const particle of particles) {
    renderParticle(ctx, particle, offsetX, offsetY);
  }

  // 绘制浮动文字
  for (const ft of floatingTexts) {
    renderFloatingText(ctx, ft, offsetX, offsetY);
  }

  // 绘制昼夜遮罩
  renderDayNightOverlay(ctx, state, canvasWidth, canvasHeight, offsetX, offsetY);

  // 绘制收集范围提示(如果有树在附近)
  if (state.nearTree && !player.isChopping) {
    ctx.strokeStyle = COLORS.btnCollect;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(player.x + offsetX, player.y + offsetY, 90, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // 绘制砍伐进度条
  if (player.isChopping && player.chopTarget) {
    const target = entities.find(e => e.id === player.chopTarget);
    if (target) {
      renderProgressBar(ctx, target.x + offsetX, target.y + offsetY - 50, player.chopProgress, COLORS.btnCollect);
    }
  }
}

// 绘制背景
function renderBackground(
  ctx: CanvasRenderingContext2D,
  assets: GameAssets,
  offsetX: number,
  offsetY: number,
  canvasWidth: number,
  canvasHeight: number
): void {
  // 使用草地贴图平铺
  if (assets.grassTile.complete) {
    const tileSize = 200;
    const startX = Math.floor(-offsetX / tileSize) * tileSize;
    const startY = Math.floor(-offsetY / tileSize) * tileSize;

    for (let x = startX; x < -offsetX + canvasWidth + tileSize; x += tileSize) {
      for (let y = startY; y < -offsetY + canvasHeight + tileSize; y += tileSize) {
        ctx.drawImage(assets.grassTile, x + offsetX, y + offsetY, tileSize, tileSize);
      }
    }
  } else {
    // 后备纯色
    ctx.fillStyle = '#81C784';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  // 绘制地图边界
  ctx.strokeStyle = '#5D4037';
  ctx.lineWidth = 4;
  ctx.strokeRect(offsetX, offsetY, MAP_WIDTH, MAP_HEIGHT);
}

// 绘制树木
function renderTree(ctx: CanvasRenderingContext2D, assets: GameAssets, x: number, y: number): void {
  if (assets.tree.complete) {
    const size = 70;
    ctx.drawImage(assets.tree, x - size / 2, y - size / 2, size, size);
  } else {
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
  }

  // 阴影
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.beginPath();
  ctx.ellipse(x, y + 30, 25, 8, 0, 0, Math.PI * 2);
  ctx.fill();
}

// 绘制苹果树
function renderAppleTree(ctx: CanvasRenderingContext2D, assets: GameAssets, x: number, y: number): void {
  if (assets.appleTree.complete) {
    const size = 75;
    ctx.drawImage(assets.appleTree, x - size / 2, y - size / 2, size, size);
  } else {
    ctx.fillStyle = '#66BB6A';
    ctx.beginPath();
    ctx.arc(x, y, 33, 0, Math.PI * 2);
    ctx.fill();
  }

  // 阴影
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.beginPath();
  ctx.ellipse(x, y + 33, 28, 8, 0, 0, Math.PI * 2);
  ctx.fill();
}

// 绘制水池
function renderPool(ctx: CanvasRenderingContext2D, assets: GameAssets, x: number, y: number): void {
  if (assets.pool.complete) {
    const w = 100;
    const h = 80;
    ctx.drawImage(assets.pool, x - w / 2, y - h / 2, w, h);
  } else {
    ctx.fillStyle = '#42A5F5';
    ctx.beginPath();
    ctx.ellipse(x, y, 45, 35, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 绘制营火实体
function renderCampfireEntity(
  ctx: CanvasRenderingContext2D,
  assets: GameAssets,
  x: number,
  y: number,
  cf?: Campfire
): void {
  if (!cf) return;

  // 光晕效果
  const glowAlpha = 0.3 + Math.sin(performance.now() / 200) * 0.1;
  const gradient = ctx.createRadialGradient(x, y, 10, x, y, 100);
  gradient.addColorStop(0, `rgba(255, 149, 0, ${glowAlpha})`);
  gradient.addColorStop(1, 'rgba(255, 149, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, 100, 0, Math.PI * 2);
  ctx.fill();

  // 营火图片
  if (assets.campfire.complete) {
    const size = 50;
    ctx.drawImage(assets.campfire, x - size / 2, y - size / 2, size, size);
  } else {
    ctx.fillStyle = '#FF6D00';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 绘制玩家
function renderPlayer(
  ctx: CanvasRenderingContext2D,
  assets: GameAssets,
  x: number,
  y: number,
  player: GameState['player']
): void {
  ctx.save();

  // 行走时的弹跳动画
  let bounceY = 0;
  if (player.isMoving) {
    bounceY = Math.sin(player.walkFrame) * 3;
  }

  // 砍伐时的摇摆
  let rotateAngle = 0;
  if (player.isChopping) {
    rotateAngle = Math.sin(player.chopProgress * Math.PI * 4) * 0.15;
  }

  ctx.translate(x, y + bounceY);
  ctx.rotate(rotateAngle);

  // 阴影
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(0, 18, 16, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // 翻转(根据朝向)
  if (player.facing === 'left') {
    ctx.scale(-1, 1);
  }

  // 绘制玩家图片
  if (assets.player.complete) {
    const size = 44;
    ctx.drawImage(assets.player, -size / 2, -size / 2, size, size);
  } else {
    // 后备：简单圆形
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2E7D32';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();

  // 低血量时红色闪烁警告
  if (player.hp < 25) {
    const flash = Math.sin(performance.now() / 200) > 0;
    if (flash) {
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

// 绘制粒子
function renderParticle(
  ctx: CanvasRenderingContext2D,
  particle: Particle,
  offsetX: number,
  offsetY: number
): void {
  const alpha = particle.life / particle.maxLife;
  ctx.globalAlpha = alpha;
  ctx.fillStyle = particle.color;
  ctx.fillRect(
    particle.x + offsetX - particle.size / 2,
    particle.y + offsetY - particle.size / 2,
    particle.size,
    particle.size
  );
  ctx.globalAlpha = 1;
}

// 绘制浮动文字
function renderFloatingText(
  ctx: CanvasRenderingContext2D,
  ft: FloatingText,
  offsetX: number,
  offsetY: number
): void {
  const alpha = ft.life / ft.maxLife;
  ctx.globalAlpha = alpha;
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = ft.color;
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.lineWidth = 3;
  ctx.strokeText(ft.text, ft.x + offsetX, ft.y + offsetY);
  ctx.fillText(ft.text, ft.x + offsetX, ft.y + offsetY);
  ctx.globalAlpha = 1;
}

// 绘制进度条
function renderProgressBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  progress: number,
  color: string
): void {
  const width = 50;
  const height = 8;

  // 背景
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.roundRect(x - width / 2, y, width, height, 4);
  ctx.fill();

  // 进度
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x - width / 2, y, width * progress, height, 4);
  ctx.fill();
}

// 绘制昼夜遮罩
function renderDayNightOverlay(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  canvasWidth: number,
  canvasHeight: number,
  offsetX: number,
  offsetY: number
): void {
  const { timeOfDay, dayTime, dayConfig, player, campfires } = state;

  if (timeOfDay === 'day') {
    // 白天：计算黄昏过渡
    const dayLength = dayConfig.dayLength;
    const nightStart = dayLength * (1 - dayConfig.nightRatio);
    const transitionStart = nightStart - 15; // 提前15秒开始过渡

    if (dayTime >= transitionStart) {
      const t = (dayTime - transitionStart) / (nightStart - transitionStart);
      const alpha = t * 0.6;
      renderNightOverlay(ctx, canvasWidth, canvasHeight, offsetX, offsetY, player, campfires, alpha);
    }
    return;
  }

  // 黑夜
  const nightOpacity = 0.65;
  renderNightOverlay(ctx, canvasWidth, canvasHeight, offsetX, offsetY, player, campfires, nightOpacity);
}

// 绘制黑夜遮罩和光照
function renderNightOverlay(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  offsetX: number,
  offsetY: number,
  player: GameState['player'],
  campfires: Campfire[],
  opacity: number
): void {
  // 创建遮罩层
  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = canvasWidth;
  maskCanvas.height = canvasHeight;
  const maskCtx = maskCanvas.getContext('2d')!;

  // 填充黑色
  maskCtx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
  maskCtx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 在玩家周围创建光照孔
  const playerScreenX = player.x + offsetX;
  const playerScreenY = player.y + offsetY;

  maskCtx.globalCompositeOperation = 'destination-out';

  // 玩家光照
  const playerLight = maskCtx.createRadialGradient(
    playerScreenX, playerScreenY, 5,
    playerScreenX, playerScreenY, 130
  );
  playerLight.addColorStop(0, `rgba(255, 255, 200, ${opacity * 1.5})`);
  playerLight.addColorStop(1, 'rgba(255, 255, 200, 0)');
  maskCtx.fillStyle = playerLight;
  maskCtx.beginPath();
  maskCtx.arc(playerScreenX, playerScreenY, 130, 0, Math.PI * 2);
  maskCtx.fill();

  // 营火光照
  for (const cf of campfires) {
    const cfScreenX = cf.x + offsetX;
    const cfScreenY = cf.y + offsetY;
    const fireLight = maskCtx.createRadialGradient(
      cfScreenX, cfScreenY, 5,
      cfScreenX, cfScreenY, 140
    );
    fireLight.addColorStop(0, `rgba(255, 180, 50, ${opacity * 2})`);
    fireLight.addColorStop(1, 'rgba(255, 180, 50, 0)');
    maskCtx.fillStyle = fireLight;
    maskCtx.beginPath();
    maskCtx.arc(cfScreenX, cfScreenY, 140, 0, Math.PI * 2);
    maskCtx.fill();
  }

  maskCtx.globalCompositeOperation = 'source-over';

  // 绘制遮罩
  ctx.drawImage(maskCanvas, 0, 0);
}

// 渲染菜单背景
export function renderMenuBackground(
  ctx: CanvasRenderingContext2D,
  assets: GameAssets,
  canvasWidth: number,
  canvasHeight: number
): void {
  // 简单的森林背景
  if (assets.grassTile.complete) {
    const tileSize = 200;
    for (let x = 0; x < canvasWidth + tileSize; x += tileSize) {
      for (let y = 0; y < canvasHeight + tileSize; y += tileSize) {
        ctx.drawImage(assets.grassTile, x, y, tileSize, tileSize);
      }
    }
  } else {
    ctx.fillStyle = '#81C784';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  // 添加暗色遮罩
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 随机画一些树作为装饰
  ctx.save();
  const treePositions = [
    [100, 150], [300, 200], [500, 100], [700, 250],
    [150, 400], [450, 350], [650, 450], [200, 550],
  ];
  for (const [tx, ty] of treePositions) {
    if (assets.tree.complete) {
      ctx.globalAlpha = 0.3;
      ctx.drawImage(assets.tree, tx - 35, ty - 35, 70, 70);
    }
  }
  ctx.restore();
}

// 获取时间文本
export function getTimeText(state: GameState, locale: string = 'zh'): string {
  if (state.timeOfDay === 'day') {
    return locale === 'zh' ? '白天' : 'Daytime';
  }
  return locale === 'zh' ? '黑夜' : 'Night';
}

// 获取时间颜色
export function getTimeColor(state: GameState): string {
  return state.timeOfDay === 'day' ? '#F8B500' : '#9B59B6';
}
