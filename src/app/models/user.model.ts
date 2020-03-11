
export class User {

  constructor(
    public uid: string,
    public name: string,
    public email: string
  ) { }

  static fromFirebase( dbUser: DBUser ) {
    return new User( dbUser.uid, dbUser.name, dbUser.email );
  }

}

export interface DBUser {
  email: string;
  name: string;
  uid: string;
}
