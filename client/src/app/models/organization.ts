export interface Organization {
  organization_id: number;
  name: string;
  inn: number;
  contact_full_name: string;
  contact_phone_number: number;
  password: string;
}

export function instanceOfOrganization(object: any): object is Organization {
  return 'inn' in object;
}
