export interface User{
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirthday: Date;
    address: string;
    image: string;
    email:string;
    phone: string;
    role:"ADMIN" | "MANAGER" |"STAFF" | "CUSTOMER" ;

}