export class Role {
  constructor(
    public readonly role_id: number,
    public code: string,
    public name: string,
    public description: string,

  ) {}

  update(name?: string, description?: string): void {
    if (name) this.name = name;
    if (description) this.description = description;
  }

  
}