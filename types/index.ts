export interface UserInfo {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  avatar_url: string;
}
export interface Game {
  id: number;
  player_one_id: string;
  player_two_id: string;
  player_one_progress: Record<string, boolean>;
  player_two_progress: Record<string, boolean>;
}

export interface GameContent {
  playerOne: Player;
  playerTwo: Player;
}

export interface StateEntry {
  state: string;
}
export interface Player {
  id: number;
  user_id: string;
  playerProgress: Record<string, boolean>;
}
