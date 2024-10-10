export interface CreateUserDto {
  email: string;
  password: string;
  roles: string[];
  sportOrganizationsIds: string[];
}

export interface UpdateUserDto {
  id: string;
  email: string;
  password: string;
  roles: string[];
  sportOrganizationsIds: string[];
}
