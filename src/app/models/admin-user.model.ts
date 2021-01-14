export class AdminUser {
  first_name: string;
  last_name: string;
  email: string;
  groups: Array<any>;

  /**
   * Constructor
   *
   * @param user
   */
  constructor(user) {
    {
      this.first_name = user.first_name || '';
      this.last_name = user.last_name || '';
      this.email = user.email || '';
      this.groups = user.groups || [];
    }
  }
}