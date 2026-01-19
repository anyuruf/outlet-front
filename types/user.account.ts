export interface UserAccount {
    userId: string;
    login: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    imageUrl?: string;
    activated: boolean;
    authorities: string[];
}
