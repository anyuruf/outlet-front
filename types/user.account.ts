export interface UserAccount {
    id: string;
    login: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    imageUrl?: string;
    activated: boolean;
    authorities: string[];
}
