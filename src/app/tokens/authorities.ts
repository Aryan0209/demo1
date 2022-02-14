export interface TempAuthorities {
  id: number;
  roles_id: number;
  users_id: number;
}
export interface Authorities {
  id: number;
  roles_id: number;
  users_id: number;
  plants_id: number;
  reportingto: string;
  expirydate: string;
}
export class AuthoritiesC {
  id: number;
  roles_id: number;
  users_id: number;
  plants_id: number;
  reportingto: string;
  expirydate: string;

  constructor(obj?: AuthoritiesC) {
    this.id = (obj && obj.id) || null;
    this.roles_id = (obj && obj.roles_id) || null;
    this.users_id = (obj && obj.users_id) || null;
    this.plants_id = (obj && obj.plants_id) || null;
    this.reportingto = (obj && obj.reportingto) || '';
    this.expirydate = (obj && obj.expirydate) || '';
  }
}
