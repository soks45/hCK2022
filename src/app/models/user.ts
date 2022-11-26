export interface User {
  username: string
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  groups: Array<string>;
  user_permissions: Array<string>;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean;
  last_login: Date;
  date_joined: Date;
}

export interface InputUser {
  username: string;
  password: string;
}

