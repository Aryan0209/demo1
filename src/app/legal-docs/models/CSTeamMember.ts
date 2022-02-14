export interface CsTeamMember {
    user_id: number;
    email: string;
    mobile: string;
    emp_code: string;
    firstname: string;
    lastname: string;
    status?: any;
    isActive: boolean;
    authority: number;
    department: string;
    updated_at: Date;
    created_at: Date;
    hod?: any;
    role: number;
}