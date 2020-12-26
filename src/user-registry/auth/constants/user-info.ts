export enum Role {
  Admin = "Admin",
  Manager = "Manager"
}

export class UserInfo {
  readonly userId: string;
  readonly roles: Role[];

  constructor(partial: Partial<UserInfo> = {}) {
    Object.assign(this, partial);
  }

  hasRole(role: Role): boolean {
    return this.roles.includes(role);
  }
}
