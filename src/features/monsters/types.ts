export type MonsterListItem = {
  index: string;
  name: string;
  url: string;
};

export type MonsterListResponse = {
  count: number;
  results: MonsterListItem[];
};

export type MonsterSpeed = {
  walk?: string;
  swim?: string;
  climb?: string;
  fly?: string;
  burrow?: string;
};

export type MonsterAbilityScores = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type MonsterAction = {
  name: string;
  desc: string;
};

export type MonsterDetails = MonsterAbilityScores & {
  index: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  armor_class: Array<{ type?: string; value: number }>;
  hit_points: number;
  hit_dice: string;
  speed: MonsterSpeed;
  actions?: MonsterAction[];
  image?: string;
};
