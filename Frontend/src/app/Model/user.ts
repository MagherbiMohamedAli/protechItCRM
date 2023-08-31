import { Role } from "./Role";

export class User {
    id!: Number;
    username!: string;
    email!: string;
    password!: string;
    birthday!: Date;
    roles!: Role[];
    created!: Date;
    creator!: string;
    modified!: Date;
    modifier!: string;
    uid: any;
    constructor(){
        
    }
}
export interface FirebaseUser extends firebase.default.User{}
