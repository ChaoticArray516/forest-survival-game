// 游戏实体类型
export type EntityType = 'tree' | 'apple_tree' | 'pool' | 'campfire';

// 游戏状态
export type GameScreen = 'menu' | 'playing' | 'game_over' | 'day_transition';

// 死亡原因
export type DeathCause = 'hunger' | 'thirst' | 'cold' | 'unknown';

// 时间状态
export type TimeOfDay = 'day' | 'night';

// 玩家状态
export interface Player {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  hp: number;
  maxHp: number;
  hunger: number;
  maxHunger: number;
  thirst: number;
  maxThirst: number;
  inventory: Inventory;
  facing: 'up' | 'down' | 'left' | 'right';
  isMoving: boolean;
  isChopping: boolean;
  chopProgress: number;
  chopTarget: string | null; // entity id
  walkFrame: number;
  lastConsumeTime: number;
}

// 物品栏
export interface Inventory {
  wood: number;
  apple: number;
  water: number;
  fire: number;
}

// 游戏实体
export interface GameEntity {
  id: string;
  type: EntityType;
  x: number;
  y: number;
  width: number;
  height: number;
  collisionRadius: number;
  respawnTimer: number;
}

// 营火
export interface Campfire {
  id: string;
  x: number;
  y: number;
  lifetime: number; // 剩余时间(秒)
  maxLifetime: number;
}

// 浮动文字
export interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
}

// 粒子
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

// 游戏配置(每天不同)
export interface DayConfig {
  day: number;
  hungerDecay: number; // 每秒
  thirstDecay: number; // 每秒
  treeRespawn: number; // 秒
  coldDamage: number; // 每秒
  dayLength: number; // 秒
  nightRatio: number; // 黑夜占比
  maxHp: number;
  maxHunger: number;
  maxThirst: number;
  initialTrees: number;
  initialPools: number;
}

// 游戏状态
export interface GameState {
  screen: GameScreen;
  player: Player;
  entities: GameEntity[];
  campfires: Campfire[];
  floatingTexts: FloatingText[];
  particles: Particle[];
  camera: { x: number; y: number };
  timeOfDay: TimeOfDay;
  dayTime: number; // 当前天数经过的时间(秒)
  currentDay: number;
  targetDay: number; // 目标天数(10)
  score: number;
  totalDaysSurvived: number;
  isPaused: boolean;
  joystick: {
    active: boolean;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    dx: number;
    dy: number;
  };
  collectButtonPressed: boolean;
  nearTree: boolean; // 玩家附近是否有树
  deathCause: DeathCause;
  dayConfig: DayConfig;
}

// 图片资源
export interface GameAssets {
  player: HTMLImageElement;
  tree: HTMLImageElement;
  appleTree: HTMLImageElement;
  pool: HTMLImageElement;
  campfire: HTMLImageElement;
  grassTile: HTMLImageElement;
}

// 输入状态
export interface InputState {
  keys: Set<string>;
  joystickActive: boolean;
  joystickDx: number;
  joystickDy: number;
  collectPressed: boolean;
}
