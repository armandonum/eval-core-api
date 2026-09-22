import { Role } from '../../../roles/domain/entities/role.entity';
import { Email } from '../value-objects/email.value-object';
import { UserStatus}  from '../value-objects/status.value-object';


export class User {
  constructor(
    public readonly user_id: string | undefined,
    public created_by: string | undefined,
    private readonly email: Email ,
    public password_hash: string ,
    public display_name: string,
    public status: UserStatus,
    public last_login_at: Date | null,
    public roles: Role[],
    public readonly created_at: Date,
    public updated_at: Date,
  ) {}

  get _email(): string {
    return this.email.getValue();
  }

  updateDisplayName(display_name: string): void {
    this.display_name = display_name;
    this.updated_at = new Date();
  }

  activate(): void {
    this.status = 'active';
    this.updated_at = new Date();
  }

  deactivate(): void {
    this.status = 'inactive';
    this.updated_at = new Date();
  }

  block(): void {
    this.status = 'blocked';
    this.updated_at = new Date();
  }

  markLogin(): void {
    this.last_login_at = new Date();
  }

  assignRoles(roles: Role[]): void {
    this.roles = roles;
    this.updated_at = new Date();
  }
}