export class User {
  id?: string;
  first_name: string;
  last_name: string;
  role: string;

  /**
   * Constructor
   *
   * @param user
   */
  constructor(user) {
    {
      this.id = user.id || '';
      this.first_name = user.first_name || '';
      this.last_name = user.last_name || '';
      this.role = user.role || '';
    }
  }
}