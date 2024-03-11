export interface UserInfo {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  avatar_url: string;
}
export interface Game {
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
