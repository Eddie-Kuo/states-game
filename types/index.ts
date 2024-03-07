export interface UserInfo {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  avatar_url: string;
}
export interface Game {
  id: string;
  player_one_id: string;
  player_two_id: string;
  player_one_progress: JSON;
  player_two_progress: JSON;
}

export interface StateEntry {
  state: string;
  seen: boolean;
}
export interface Player {
  id: string | undefined;
  playerProgress: {
    progress: StateEntry[];
  };
}
