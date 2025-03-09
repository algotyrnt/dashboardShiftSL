export interface Nurse {
    id: bigint;
    first_name: string;
    last_name: string;
    email: string;
    role: string; // check the role cause the backend is designed to understand whether it's a doctor, or an admin
    phone_no: string;
    ward: string
}