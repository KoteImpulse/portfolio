export enum UserPermissions {
  CREATEWORK = 'CREATEWORK',
  DELETEWORK = 'DELETEWORK',
  UPDATEWORK = 'UPDATEWORK',
}
const Permissions = {
  ...UserPermissions,
};

type Permissions = UserPermissions;

export default Permissions;
