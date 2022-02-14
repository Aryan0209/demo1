export interface Tokens {
    id: number;
    api_token: string;
    users_id: string;
    validity: string;
}
export class TokensC {
    id: number;
    api_token: string;
    users_id: string;
    validity: string;

    constructor(obj?: TokensC) {
        this.id = obj && obj.id || null;
        this.api_token = obj && obj.api_token || "";
        this.users_id = obj && obj.users_id || "";
        this.validity = obj && obj.validity || "";
    }
}

export interface ResetPassword {
    currentpassword: string;
    newpassword: string;
    confirmpassword: string;
}
export class ResetPasswordC {
    currentpassword: string;
    newpassword: string;
    confirmpassword: string;
    constructor(obj?: ResetPasswordC) {
        this.currentpassword = obj && obj.currentpassword || "";
        this.newpassword = obj && obj.newpassword || "";
        this.confirmpassword = obj && obj.confirmpassword || "";
    }
}
