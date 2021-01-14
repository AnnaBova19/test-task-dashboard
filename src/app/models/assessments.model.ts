export class Assessment {
  id?: string;
  active: boolean;
  image_url: string;
  name: string;
  users_resolved?: number;

  /**
   * Constructor
   *
   * @param assessment
   */
  constructor(assessment) {
    {
      this.id = assessment.id || '';
      this.active = assessment.active || false;
      this.image_url = assessment.image_url || '';
      this.name = assessment.name || '';
      this.users_resolved = assessment.users_resolved || 0;
    }
  }
}