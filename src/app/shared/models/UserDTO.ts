import ProfileDTO from './ProfileDTO';

export default class UserDTO {

  dtcreation: string | null = null;
  password: string | null = null;
  profile: ProfileDTO | null = null;

  constructor(
    id: number,
    email: string,
    fullname: string,
  ) {
  }

}
