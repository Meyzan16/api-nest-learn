export class RegisterUserRequest {
    username : number;
    password : string;
    name: string;
}

export class UserResponse {
    username: number;
    name: string;
    token?:string;
    created_at? : Date;
    updated_at? : Date;
    is_deleted? : boolean;
}