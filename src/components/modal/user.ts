export interface User{
    id: number;
    firstName: string;
    lastName: string;
    gender:boolean;
    dateOfBirthday: Date;
    address: string;
    image: string;
    email:string;
    phoneNumber: string;
    role:"Admin" | "Manager" |"Staff" | "Customer" ;

}