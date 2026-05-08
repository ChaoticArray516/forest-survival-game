import type {
  GameState,
  InputState,
  GameEntity,
} from './types';
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  PLAYER_SPEED,
  COLLECT_RADIUS,
  CAMPFIRE_WOOD_COST,
  APPLE_HUNGER_RESTORE,
  WATER_THIRST_RESTORE,
  INVENTORY_MAX,
  getDayConfig,
  COLORS,
} from './config';
import {
  clamp,
  distance,
  addFloatingText,
  addParticles,
  createTree,
  createAppleTree,
  createCampfire,
  findValidPosition,
  initWorldEntities,
} from './utils';

// 创建初始游戏状态
export function createInitialState(): GameState {
  const dayConfig = getDayConfig(1);
  const playerX = MAP_WIDTH / 2;
  const playerY = MAP_HEIGHT / 2;

  return {
    screen: 'menu',
    player: {
      x: playerX,
      y: playerY,
      vx: 0,
      vy: 0,
      speed: PLAYER_SPEED,
      hp: dayConfig.maxHp,
      maxHp: dayConfig.maxHp,
      hunger: dayConfig.maxHunger,
      maxHunger: dayConfig.maxHunger,
      thirst: dayConfig.maxThirst,
      maxThirst: dayConfig.maxThirst,
      inventory: { wood: 0, apple: 0, water: 0, fire: 0 },
      facing: 'down',
      isMoving: false,
      isChopping: false,
      chopProgress: 0,
      chopTarget: null,
      walkFrame: 0,
      lastConsumeTime: 0,
    },
    entities: initWorldEntities(MAP_WIDTH, MAP_HEIGHT, dayConfig, playerX, playerY),
    campfires: [],
    floatingTexts: [],
    particles: [],
    camera: { x: playerX, y: playerY },
    timeOfDay: 'day',
    dayTime: 0,
    currentDay: 1,
    targetDay: 10,
    score: 0,
    totalDaysSurvived: 0,
    isPaused: false,
    joystick: {
      active: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      dx: 0,
      dy: 0,
    },
    collectButtonPressed: false,
    nearTree: false,
    deathCause: 'unknown',
    dayConfig,
  };
}

// 开始新游戏
export function startGame(state: GameState): void {
  const dayConfig = getDayConfig(1);
  const playerX = MAP_WIDTH / 2;
  const playerY = MAP_HEIGHT / 2;

  state.screen = 'playing';
  state.player = {
    x: playerX,
    y: playerY,
    vx: 0,
    vy: 0,
    speed: PLAYER_SPEED,
    hp: dayConfig.maxHp,
    maxHp: dayConfig.maxHp,
    hunger: dayConfig.maxHunger,
    maxHunger: dayConfig.maxHunger,
    thirst: dayConfig.maxThirst,
    maxThirst: dayConfig.maxThirst,
    inventory: { wood: 0, apple: 2, water: 2, fire: 0 },
    facing: 'down',
    isMoving: false,
    isChopping: false,
    chopProgress: 0,
    chopTarget: null,
    walkFrame: 0,
    lastConsumeTime: 0,
  };
  state.entities = initWorldEntities(MAP_WIDTH, MAP_HEIGHT, dayConfig, playerX, playerY);
  state.campfires = [];
  state.floatingTexts = [];
  state.particles = [];
  state.camera = { x: playerX, y: playerY };
  state.timeOfDay = 'day';
  state.dayTime = 0;
  state.currentDay = 1;
  state.score = 0;
  state.totalDaysSurvived = 0;
  state.isPaused = false;
  state.collectButtonPressed = false;
  state.nearTree = false;
  state.deathCause = 'unknown';
  state.dayConfig = dayConfig;
}

// 处理输入
export function processInput(state: GameState, input: InputState, dt: number): void {
  const { player } = state;

  // 重置速度
  player.vx = 0;
  player.vy = 0;

  // 如果在砍伐中，不能移动
  if (player.isChopping) {
    player.isMoving = false;
    return;
  }

  let dx = 0;
  let dy = 0;

  // 键盘输入
  if (input.keys.has('w') || input.keys.has('arrowup')) dy -= 1;
  if (input.keys.has('s') || input.keys.has('arrowdown')) dy += 1;
  if (input.keys.has('a') || input.keys.has('arrowleft')) dx -= 1;
  if (input.keys.has('d') || input.keys.has('arrowright')) dx += 1;

  // 虚拟摇杆输入(优先级更高)
  if (input.joystickActive) {
    dx = input.joystickDx;
    dy = input.joystickDy;
  }

  // 归一化
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len > 0.1) {
    if (len > 1) {
      dx /= len;
      dy /= len;
    }
    player.vx = dx * player.speed;
    player.vy = dy * player.speed;
    player.isMoving = true;

    // 更新朝向
    if (Math.abs(dx) > Math.abs(dy)) {
      player.facing = dx > 0 ? 'right' : 'left';
    } else {
      player.facing = dy > 0 ? 'down' : 'up';
    }

    // 行走动画帧
    player.walkFrame += dt * 8;
  } else {
    player.isMoving = false;
    player.walkFrame = 0;
  }
}

// 更新玩家位置
export function updatePlayer(state: GameState, dt: number): void {
  const { player } = state;

  // 更新位置
  player.x += player.vx * dt;
  player.y += player.vy * dt;

  // 碰撞地图边界
  player.x = clamp(player.x, 25, MAP_WIDTH - 25);
  player.y = clamp(player.y, 25, MAP_HEIGHT - 25);

  // 与实体碰撞(树和池子)
  for (const entity of state.entities) {
    if (entity.type === 'tree' || entity.type === 'apple_tree' || entity.type === 'pool') {
      const d = distance(player.x, player.y, entity.x, entity.y);
      const minDist = 20 + entity.collisionRadius;
      if (d < minDist && d > 0) {
        // 推开玩家
        const nx = (player.x - entity.x) / d;
        const ny = (player.y - entity.y) / d;
        const overlap = minDist - d;
        player.x += nx * overlap;
        player.y += ny * overlap;
      }
    }
  }

  // 更新相机(平滑跟随)
  const lerpFactor = 1 - Math.pow(0.01, dt);
  state.camera.x += (player.x - state.camera.x) * lerpFactor;
  state.camera.y += (player.y - state.camera.y) * lerpFactor;
}

// 检查玩家附近是否有可收集的树
export function checkNearTree(state: GameState): boolean {
  const { player, entities } = state;
  for (const entity of entities) {
    if (entity.type === 'tree' || entity.type === 'apple_tree') {
      if (distance(player.x, player.y, entity.x, entity.y) <= COLLECT_RADIUS) {
        return true;
      }
    }
  }
  return false;
}

// 找到最近的树
export function findNearestTree(state: GameState): GameEntity | null {
  const { player, entities } = state;
  let nearest: GameEntity | null = null;
  let nearestDist = COLLECT_RADIUS;

  for (const entity of entities) {
    if (entity.type === 'tree' || entity.type === 'apple_tree') {
      const d = distance(player.x, player.y, entity.x, entity.y);
      if (d <= nearestDist) {
        nearest = entity;
        nearestDist = d;
      }
    }
  }

  return nearest;
}

// 处理收集按钮
export function handleCollect(state: GameState): void {
  const { player } = state;
  if (player.isChopping) return;

  const tree = findNearestTree(state);
  if (!tree) return;

  // 开始砍伐
  player.isChopping = true;
  player.chopProgress = 0;
  player.chopTarget = tree.id;
  player.isMoving = false;
  player.vx = 0;
  player.vy = 0;

  // 面向树
  const dx = tree.x - player.x;
  const dy = tree.y - player.y;
  if (Math.abs(dx) > Math.abs(dy)) {
    player.facing = dx > 0 ? 'right' : 'left';
  } else {
    player.facing = dy > 0 ? 'down' : 'up';
  }
}

// 更新砍伐进度
export function updateChopping(state: GameState, dt: number): void {
  const { player } = state;
  if (!player.isChopping) return;

  player.chopProgress += dt * 2; // 0.5秒完成

  if (player.chopProgress >= 1) {
    // 砍伐完成
    const treeIndex = state.entities.findIndex(e => e.id === player.chopTarget);
    if (treeIndex >= 0) {
      const tree = state.entities[treeIndex];

      // 产出资源
      const woodAmount = tree.type === 'apple_tree' ? 1 : 2;
      const appleAmount = tree.type === 'apple_tree' ? Math.floor(Math.random() * 2) + 1 : 0;

      state.player.inventory.wood = Math.min(INVENTORY_MAX, state.player.inventory.wood + woodAmount);
      state.player.inventory.apple = Math.min(INVENTORY_MAX, state.player.inventory.apple + appleAmount);

      // 特效
      addParticles(state, tree.x, tree.y, COLORS.wood, 8);
      addFloatingText(state, tree.x, tree.y - 30, `+${woodAmount} 木头`, COLORS.wood);
      if (appleAmount > 0) {
        addFloatingText(state, tree.x + 20, tree.y - 45, `+${appleAmount} 苹果`, COLORS.apple);
      }

      // 标记树为待重生
      state.entities.splice(treeIndex, 1);

      // 延迟重生
      const respawnTime = state.dayConfig.treeRespawn;
      setTimeout(() => {
        const isApple = Math.random() < 0.3;
        const pos = findValidPosition(MAP_WIDTH, MAP_HEIGHT, 35, state.entities, state.player.x, state.player.y);
        if (pos) {
          if (isApple) {
            state.entities.push(createAppleTree(pos.x, pos.y));
          } else {
            state.entities.push(createTree(pos.x, pos.y));
          }
        }
      }, respawnTime * 1000);
    }

    player.isChopping = false;
    player.chopProgress = 0;
    player.chopTarget = null;
  }
}

// 处理消耗物品
export function consumeItem(state: GameState, item: 'apple' | 'water'): void {
  const now = performance.now() / 1000;
  if (now - state.player.lastConsumeTime < 0.5) return; // 0.5秒冷却

  if (item === 'apple' && state.player.inventory.apple > 0) {
    state.player.inventory.apple--;
    state.player.hunger = Math.min(state.player.maxHunger, state.player.hunger + APPLE_HUNGER_RESTORE);
    state.player.lastConsumeTime = now;
    addFloatingText(state, state.player.x, state.player.y - 30, `+${APPLE_HUNGER_RESTORE} 饱腹`, COLORS.hunger);
  } else if (item === 'water' && state.player.inventory.water > 0) {
    state.player.inventory.water--;
    state.player.thirst = Math.min(state.player.maxThirst, state.player.thirst + WATER_THIRST_RESTORE);
    state.player.lastConsumeTime = now;
    addFloatingText(state, state.player.x, state.player.y - 30, `+${WATER_THIRST_RESTORE} 水分`, COLORS.thirst);
  }
}

// 放置营火
export function placeCampfire(state: GameState): void {
  const { player } = state;
  if (player.inventory.wood >= CAMPFIRE_WOOD_COST) {
    state.player.inventory.wood -= CAMPFIRE_WOOD_COST;
    state.player.inventory.fire++;

    // 在玩家附近放置营火
    const cf = createCampfire(state.player.x + 30, state.player.y);
    state.campfires.push(cf);
    addFloatingText(state, cf.x, cf.y - 20, '营火已点燃!', COLORS.fire);
    addParticles(state, cf.x, cf.y, '#FF9500', 12);
  }
}

// 在水池边补充水
export function collectWater(state: GameState): void {
  const { player, entities } = state;
  for (const entity of entities) {
    if (entity.type === 'pool') {
      const d = distance(player.x, player.y, entity.x, entity.y);
      if (d <= COLLECT_RADIUS + 10) {
        state.player.inventory.water = Math.min(INVENTORY_MAX, state.player.inventory.water + 1);
        addFloatingText(state, entity.x, entity.y - 20, '+1 水', COLORS.water);
        return;
      }
    }
  }
}

// 更新生存状态
export function updateSurvival(state: GameState, dt: number): void {
  const { player, dayConfig, timeOfDay, campfires } = state;

  // 减少饥饿和口渴
  player.hunger -= dayConfig.hungerDecay * dt;
  player.thirst -= dayConfig.thirstDecay * dt;

  // 限制下限
  player.hunger = Math.max(0, player.hunger);
  player.thirst = Math.max(0, player.thirst);

  // 如果饥饿或口渴归零，扣除生命值
  let hpLoss = 0;
  if (player.hunger <= 0) {
    hpLoss += 8 * dt;
    if (state.deathCause === 'unknown') state.deathCause = 'hunger';
  }
  if (player.thirst <= 0) {
    hpLoss += 8 * dt;
    if (state.deathCause === 'unknown' || state.deathCause === 'hunger') state.deathCause = 'thirst';
  }

  // 黑夜寒冷伤害
  if (timeOfDay === 'night') {
    let nearFire = false;
    for (const cf of campfires) {
      if (distance(player.x, player.y, cf.x, cf.y) <= 120) {
        nearFire = true;
        break;
      }
    }
    if (!nearFire) {
      hpLoss += dayConfig.coldDamage * dt;
      if (hpLoss > 0 && state.deathCause === 'unknown') state.deathCause = 'cold';
    }
  }

  player.hp -= hpLoss;
  player.hp = clamp(player.hp, 0, player.maxHp);

  // 恢复死亡原因(如果状态恢复了)
  if (player.hunger > 5 && player.thirst > 5 && timeOfDay === 'day') {
    state.deathCause = 'unknown';
  }
}

// 更新时间
export function updateTime(state: GameState, dt: number): void {
  if (state.isPaused) return;

  state.dayTime += dt;

  const dayLength = state.dayConfig.dayLength;
  const nightStart = dayLength * (1 - state.dayConfig.nightRatio);

  // 判断白天/黑夜
  const wasDay = state.timeOfDay === 'day';
  state.timeOfDay = state.dayTime < nightStart ? 'day' : 'night';

  // 进入黑夜时的提示
  if (wasDay && state.timeOfDay === 'night') {
    addFloatingText(state, state.player.x, state.player.y - 50, '黑夜降临...', '#9B59B6');
  }

  // 一天结束
  if (state.dayTime >= dayLength) {
    state.dayTime = 0;
    state.currentDay++;
    state.totalDaysSurvived++;

    if (state.currentDay > state.targetDay) {
      // 通关!
      state.screen = 'game_over';
      state.deathCause = 'unknown';
    } else {
      // 进入下一天
      state.screen = 'day_transition';
      state.dayConfig = getDayConfig(state.currentDay);

      // 更新最大值
      state.player.maxHp = state.dayConfig.maxHp;
      state.player.maxHunger = state.dayConfig.maxHunger;
      state.player.maxThirst = state.dayConfig.maxThirst;

      // 恢复一些状态
      state.player.hp = Math.min(state.player.hp + 20, state.player.maxHp);
    }
  }
}

// 更新营火
export function updateCampfires(state: GameState, dt: number): void {
  for (let i = state.campfires.length - 1; i >= 0; i--) {
    const cf = state.campfires[i];
    cf.lifetime -= dt;
    if (cf.lifetime <= 0) {
      state.campfires.splice(i, 1);
    }
  }
}

// 更新浮动文字
export function updateFloatingTexts(state: GameState, dt: number): void {
  for (let i = state.floatingTexts.length - 1; i >= 0; i--) {
    const ft = state.floatingTexts[i];
    ft.y -= 40 * dt; // 上浮
    ft.life -= dt;
    if (ft.life <= 0) {
      state.floatingTexts.splice(i, 1);
    }
  }
}

// 更新粒子
export function updateParticles(state: GameState, dt: number): void {
  for (let i = state.particles.length - 1; i >= 0; i--) {
    const p = state.particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 100 * dt; // 重力
    p.life -= dt;
    if (p.life <= 0) {
      state.particles.splice(i, 1);
    }
  }
}

// 更新分数
export function updateScore(state: GameState): void {
  state.score = state.totalDaysSurvived * 100 + state.player.inventory.wood * 5 + state.player.inventory.apple * 3;
}

// 检查游戏结束
export function checkGameOver(state: GameState): boolean {
  if (state.player.hp <= 0) {
    state.player.hp = 0;
    state.screen = 'game_over';
    if (state.deathCause === 'unknown') state.deathCause = 'hunger';
    return true;
  }
  return false;
}

// 继续下一天
export function continueToNextDay(state: GameState): void {
  state.screen = 'playing';
  state.timeOfDay = 'day';
  state.dayTime = 0;
}

// 主更新函数
export function updateGame(state: GameState, input: InputState, dt: number): void {
  if (state.screen !== 'playing' || state.isPaused) return;

  // 处理输入
  processInput(state, input, dt);

  // 处理收集按钮
  if (input.collectPressed && !state.player.isChopping) {
    handleCollect(state);
  }

  // 更新玩家
  updatePlayer(state, dt);

  // 更新砍伐
  updateChopping(state, dt);

  // 检查附近是否有树
  state.nearTree = checkNearTree(state);

  // 更新生存状态
  updateSurvival(state, dt);

  // 更新时间
  updateTime(state, dt);

  // 更新营火
  updateCampfires(state, dt);

  // 更新特效
  updateFloatingTexts(state, dt);
  updateParticles(state, dt);

  // 更新分数
  updateScore(state);

  // 检查游戏结束
  checkGameOver(state);
}
