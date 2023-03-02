import ProfileDTO from './ProfileDTO';

export default class UserDTO {

  id?: number;
  dtcreation: string | null = null;
  password: string | null = null;
  profile: ProfileDTO | null = null;

  constructor(
    email: string,
    fullname: string,
  ) {
  }

}
