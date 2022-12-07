import RoleDTO from './RoleDTO'

export default interface ProfileDTO {
  dtcreation: string;
  id: number;
  name: string;
  roles: RoleDTO[]
}
