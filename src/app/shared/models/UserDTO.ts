import ProfileDTO from './ProfileDTO';

export default class UserDTO {

  id?: number;
  email: string | undefined = undefined;
  fullname: string | undefined = undefined;
  dtcreation: string | undefined = undefined;
  password: string | undefined = undefined;
  profile: ProfileDTO | undefined = undefined;

  constructor(
    email?: string,
    fullname?: string,
  ) {
    this.email = email;
    this.fullname = fullname;
  }

}
