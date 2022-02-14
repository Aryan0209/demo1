import { UsersTransC } from "src/app/users/users";

export interface OKLogin {
   message: string,
   email: string,
   mobile: string,
   emp_code: string,
   success: boolean,
   loginId: number,
   auth_token: string,
   firstname: string,
   lastname: string,
   isActive: boolean,
   hod: string | any,
   department: string,
   authority: any,
   role: any,
   last_login: any
}

export class OKLoginTransC {
   message: string;
   email: string;
   mobile: string;
   emp_code: string;
   success: boolean;
   loginId: number;
   auth_token: string;
   firstname: string;
   lastname: string;
   isActive: boolean;
   hod: string | any;
   department: string;
   authority: any;
   role: any;
   last_login: any
   constructor(obj?: OKLoginTransC) {
      this.message = obj && obj.message || "";
      this.email = obj && obj.email || "";
      this.mobile = obj && obj.mobile || "";
      this.emp_code = obj && obj.emp_code || "";
      this.success = obj && obj.success || false;
      this.loginId = obj && obj.loginId || null;
      this.auth_token = obj && obj.auth_token || "";
      this.firstname = obj && obj.firstname || "";
      this.lastname = obj && obj.lastname || "";
      this.isActive = obj && obj.isActive || false;
      this.hod = obj && obj.hod || null;
      this.department = obj && obj.department || "";
      this.authority = obj && obj.authority || null;
      this.role = obj && obj.role || null;
      this.last_login = obj && obj.last_login || null
   }

}