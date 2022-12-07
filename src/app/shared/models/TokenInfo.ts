import UserDTO from './UserDTO';

export interface TokenInfo {
  aud: string;
  exp: number
  groups: string[];
  iat: number;
  iss: string;
  jti: string;
  sub: string;
  user: UserDTO;
}
