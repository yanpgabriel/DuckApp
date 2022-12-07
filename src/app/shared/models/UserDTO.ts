import ProfileDTO from './ProfileDTO';

export default interface UserDTO {
  dtcreation: string;
  email: string;
  fullname: string;
  id: number;
  keycloackId: string;
  password: ""
  profile: ProfileDTO
}
