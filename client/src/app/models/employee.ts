export interface Employee {
  join_date: Date;
  is_active?: boolean;
  exit_date?: Date;
  full_name: string;
  date_of_birth: Date;
  position: string,
  employee_id: number;
  organization_id: number;
  is_admin: boolean;
}

export interface InputUser {
  username: string;
  password: string;
}

export function instanceOfEmployee(object: any): object is Employee {
  return 'employee_id' in object;
}
