import type { DayConfig } from './types';

// 地图大小
export const MAP_WIDTH = 2400;
export const MAP_HEIGHT = 2400;

// 玩家速度(像素/秒)
export const PLAYER_SPEED = 160;

// 收集半径
export const COLLECT_RADIUS = 90;

// 实体尺寸
export const TREE_SIZE = 70;
export const APPLE_TREE_SIZE = 75;
export const POOL_WIDTH = 100;
export const POOL_HEIGHT = 80;
export const CAMPFIRE_SIZE = 50;
export const PLAYER_SIZE = 40;

// 营火持续时间(秒)
export const CAMPFIRE_DURATION = 60;
export const CAMPFIRE_WOOD_COST = 3;

// 恢复数值
export const APPLE_HUNGER_RESTORE = 25;
export const WATER_THIRST_RESTORE = 35;

// 物品栏上限
export const INVENTORY_MAX = 99;

// 每天的配置
export const DAY_CONFIGS: DayConfig[] = [
  { day: 1, hungerDecay: 0.4, thirstDecay: 0.4, treeRespawn: 3, coldDamage: 2, dayLength: 120, nightRatio: 0.3, maxHp: 100, maxHunger: 100, maxThirst: 100, initialTrees: 40, initialPools: 8 },
  { day: 2, hungerDecay: 0.6, thirstDecay: 0.6, treeRespawn: 4, coldDamage: 3, dayLength: 120, nightRatio: 0.35, maxHp: 100, maxHunger: 100, maxThirst: 100, initialTrees: 38, initialPools: 7 },
  { day: 3, hungerDecay: 0.8, thirstDecay: 0.9, treeRespawn: 5, coldDamage: 5, dayLength: 130, nightRatio: 0.35, maxHp: 100, maxHunger: 100, maxThirst: 100, initialTrees: 35, initialPools: 7 },
  { day: 4, hungerDecay: 0.9, thirstDecay: 0.9, treeRespawn: 7, coldDamage: 5, dayLength: 130, nightRatio: 0.4, maxHp: 100, maxHunger: 100, maxThirst: 100, initialTrees: 30, initialPools: 6 },
  { day: 5, hungerDecay: 0.9, thirstDecay: 1.1, treeRespawn: 7, coldDamage: 8, dayLength: 140, nightRatio: 0.45, maxHp: 100, maxHunger: 100, maxThirst: 100, initialTrees: 28, initialPools: 6 },
  { day: 6, hungerDecay: 1.1, thirstDecay: 1.1, treeRespawn: 9, coldDamage: 8, dayLength: 140, nightRatio: 0.45, maxHp: 100, maxHunger: 80, maxThirst: 80, initialTrees: 25, initialPools: 5 },
  { day: 7, hungerDecay: 1.1, thirstDecay: 1.5, treeRespawn: 9, coldDamage: 8, dayLength: 150, nightRatio: 0.5, maxHp: 100, maxHunger: 80, maxThirst: 80, initialTrees: 22, initialPools: 3 },
  { day: 8, hungerDecay: 1.1, thirstDecay: 1.3, treeRespawn: 11, coldDamage: 12, dayLength: 150, nightRatio: 0.5, maxHp: 100, maxHunger: 80, maxThirst: 80, initialTrees: 20, initialPools: 3 },
  { day: 9, hungerDecay: 1.4, thirstDecay: 1.5, treeRespawn: 16, coldDamage: 12, dayLength: 160, nightRatio: 0.55, maxHp: 100, maxHunger: 80, maxThirst: 80, initialTrees: 18, initialPools: 2 },
  { day: 10, hungerDecay: 1.6, thirstDecay: 1.8, treeRespawn: 20, coldDamage: 15, dayLength: 180, nightRatio: 0.55, maxHp: 100, maxHunger: 80, maxThirst: 80, initialTrees: 15, initialPools: 2 },
];

// 获取指定天数的配置
export function getDayConfig(day: number): DayConfig {
  const idx = Math.min(day - 1, DAY_CONFIGS.length - 1);
  return DAY_CONFIGS[idx];
}

// 状态条颜色
export const COLORS = {
  hp: '#FF4757',
  hunger: '#1DD1A1',
  thirst: '#48DBFB',
  wood: '#D6A2E8',
  apple: '#FF6B6B',
  water: '#48DBFB',
  fire: '#F8B500',
  btnCollect: '#F8B500',
  btnCollectActive: '#FFD93D',
  joystick: '#55E6C1',
  bgDark: '#2D3436',
  textPrimary: '#FFFFFF',
  textSecondary: '#DFE6E9',
  danger: '#FF4757',
  success: '#1DD1A1',
  accent: '#F8B500',
};
