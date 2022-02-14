import { Tokens, TokensC } from '../tokens/tokens';
import { Authorities, AuthoritiesC } from '../tokens/authorities';

export interface UsersTrans {
  auth_token: string;
  authority: number;
  contact: string;
  email: string;
  emp_code: string;
  firstname: string;
  isActive: number;
  lastname: string;
  loginId: number;
  message: string;
  role: string;
  success: boolean;
  username: string;
  authority_name: string;
  advance: number;
}

export class UsersTransC {
  auth_token: string;
  authority: number;
  contact: string;
  email: string;
  emp_code: string;
  firstname: string;
  isActive: number;
  lastname: string;
  loginId: number;
  message: string;
  role: string;
  success: boolean;
  username: string;
  authority_name: string;
  advance: number;

  constructor(obj?: UsersTransC) {
    this.auth_token = (obj && obj.auth_token) || '';
    this.authority = (obj && obj.authority) || null;
    this.contact = (obj && obj.contact) || null;
    this.email = (obj && obj.email) || '';
    this.emp_code = (obj && obj.emp_code) || '';
    this.firstname = (obj && obj.firstname) || '';
    this.isActive = (obj && obj.isActive) || null;
    this.lastname = (obj && obj.lastname) || '';
    this.loginId = (obj && obj.loginId) || null;
    this.message = (obj && obj.message) || '';
    this.role = (obj && obj.role) || '';
    this.success = (obj && obj.success) || false;
    this.username = (obj && obj.username) || '';
    this.advance = (obj && obj.advance) || null;
    if (this.authority_name === '') {
      if (this.authority === 1) {
        this.authority_name = 'Rate approval';
      }
      if (this.authority === 2) {
        this.authority_name = 'Transporter';
      }
    } else {
      this.authority_name = obj && obj.authority_name;
    }
  }
}

export interface Users {
  id: number;
  plants_id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  userable_id: string;
  userable_type: string;
  userable: any;
  userableform: any;
  tokens: Tokens;
  login: boolean;
  statusmessage: string;
  statuscode: string;
  authorities: Authorities[];
  isactive: number;
  myrole: Authorities;
}
export class UsersC {
  id: number;
  plants_id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  userable_id: string;
  userable_type: string;
  userable: any;
  userableform: any;
  tokens: Tokens;
  login: boolean;
  statusmessage: string;
  statuscode: string;
  authorities: Authorities[];
  isactive: number;
  myrole: Authorities;

  constructor(obj?: UsersC) {
    this.id = (obj && obj.id) || null;
    this.plants_id = (obj && obj.plants_id) || null;
    this.firstname = (obj && obj.firstname) || '';
    this.lastname = (obj && obj.lastname) || '';
    this.username = (obj && obj.username) || '';
    this.password = (obj && obj.password) || '';
    this.userable_id = (obj && obj.userable_id) || '';
    this.userable_type = (obj && obj.userable_type) || '';
    this.userable = (obj && obj.userable) || null;
    this.userableform = (obj && obj.userableform) || null;
    this.tokens = (obj && obj.tokens) || new TokensC();
    this.login = (obj && obj.login) || false;
    this.statusmessage = (obj && obj.statusmessage) || '';
    this.statuscode = (obj && obj.statuscode) || '';
    this.authorities = (obj && obj.authorities) || [];
    this.isactive = (obj && obj.isactive) || 0;
    this.myrole = (obj && obj.myrole) || new AuthoritiesC();
  }
}
