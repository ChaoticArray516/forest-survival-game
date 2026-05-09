import type { GameEntity, GameState, DeathCause, Campfire } from './types';

// 生成唯一ID
let nextId = 1;
export function generateId(): string {
  return `entity_${nextId++}`;
}

// 两点间距离
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// 检查点是否在圆形内
export function inCircle(px: number, py: number, cx: number, cy: number, r: number): boolean {
  return distance(px, py, cx, cy) <= r;
}

// 生成随机数
export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(random(min, max + 1));
}

// 限制值在范围内
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// 生成树实体
export function createTree(x: number, y: number): GameEntity {
  return {
    id: generateId(),
    type: 'tree',
    x,
    y,
    width: 70,
    height: 70,
    collisionRadius: 30,
    respawnTimer: 0,
  };
}

// 生成苹果树实体
export function createAppleTree(x: number, y: number): GameEntity {
  return {
    id: generateId(),
    type: 'apple_tree',
    x,
    y,
    width: 75,
    height: 75,
    collisionRadius: 30,
    respawnTimer: 0,
  };
}

// 生成水池实体
export function createPool(x: number, y: number): GameEntity {
  return {
    id: generateId(),
    type: 'pool',
    x,
    y,
    width: 100,
    height: 80,
    collisionRadius: 45,
    respawnTimer: 0,
  };
}

// 生成营火
export function createCampfire(x: number, y: number): Campfire {
  return {
    id: generateId(),
    x,
    y,
    lifetime: 60,
    maxLifetime: 60,
  };
}

// 添加浮动文字
export function addFloatingText(
  state: GameState,
  x: number,
  y: number,
  text: string,
  color: string = '#FFFFFF'
): void {
  state.floatingTexts.push({
    x,
    y,
    text,
    color,
    life: 1.0,
    maxLife: 1.0,
  });
}

// 添加粒子效果
export function addParticles(
  state: GameState,
  x: number,
  y: number,
  color: string,
  count: number = 6
): void {
  for (let i = 0; i < count; i++) {
    const angle = random(0, Math.PI * 2);
    const speed = random(40, 120);
    state.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 30,
      size: random(2, 5),
      color,
      life: 0.6,
      maxLife: 0.6,
    });
  }
}

// 获取死亡原因文本
export function getDeathCauseText(cause: DeathCause): string {
  switch (cause) {
    case 'hunger': return '饥饿';
    case 'thirst': return '口渴';
    case 'cold': return '寒冷';
    default: return '未知原因';
  }
}

// 检查实体是否重叠
export function isOverlapping(
  x: number,
  y: number,
  radius: number,
  entities: GameEntity[],
  playerX: number,
  playerY: number,
  playerRadius: number = 60
): boolean {
  // 检查与玩家的距离
  if (distance(x, y, playerX, playerY) < radius + playerRadius) return true;

  // 检查与其他实体的距离
  for (const e of entities) {
    if (distance(x, y, e.x, e.y) < radius + e.collisionRadius + 20) return true;
  }

  return false;
}

// 在地图上随机生成位置(避免重叠)
export function findValidPosition(
  mapWidth: number,
  mapHeight: number,
  radius: number,
  entities: GameEntity[],
  playerX: number,
  playerY: number,
  maxAttempts: number = 50
): { x: number; y: number } | null {
  for (let i = 0; i < maxAttempts; i++) {
    const x = random(radius + 50, mapWidth - radius - 50);
    const y = random(radius + 50, mapHeight - radius - 50);
    if (!isOverlapping(x, y, radius, entities, playerX, playerY)) {
      return { x, y };
    }
  }
  return null;
}

// 初始化世界实体
export function initWorldEntities(
  mapWidth: number,
  mapHeight: number,
  config: { initialTrees: number; initialPools: number },
  playerX: number,
  playerY: number
): GameEntity[] {
  const entities: GameEntity[] = [];

  // 生成普通树
  for (let i = 0; i < config.initialTrees; i++) {
    const pos = findValidPosition(mapWidth, mapHeight, 35, entities, playerX, playerY);
    if (pos) {
      entities.push(createTree(pos.x, pos.y));
    }
  }

  // 生成苹果树(约占30%)
  const appleTreeCount = Math.floor(config.initialTrees * 0.3);
  for (let i = 0; i < appleTreeCount; i++) {
    const pos = findValidPosition(mapWidth, mapHeight, 37, entities, playerX, playerY);
    if (pos) {
      entities.push(createAppleTree(pos.x, pos.y));
    }
  }

  // 生成水池
  for (let i = 0; i < config.initialPools; i++) {
    const pos = findValidPosition(mapWidth, mapHeight, 50, entities, playerX, playerY);
    if (pos) {
      entities.push(createPool(pos.x, pos.y));
    }
  }

  return entities;
}

// 格式化数字显示
export function formatNum(n: number): string {
  return Math.floor(n).toString();
}
