import Roles from 'src/user/Roles';
import Permissions from 'src/user/permissions';

export interface AccessTokenPayload {
  id: number;
  nickNane: string;
  createdat: Date;
  updatedat: Date;
}
export interface RefreshTokenPayload {
  id: number;
  nickNane: string;
  email: string;
  createdat: Date;
  updatedat: Date;
  roles: Roles[];
  permissions: Permissions[];
}
