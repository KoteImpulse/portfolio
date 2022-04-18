export enum UserRoles {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
  GHOST = 'GHOST',
}
const Roles = {
  ...UserRoles,
};

type Roles = UserRoles;

export default Roles;
