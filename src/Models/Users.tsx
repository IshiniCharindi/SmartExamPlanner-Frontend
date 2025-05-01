export interface User {
    userId?: number;
    username?: string;
    password?: string;
    role?: 'Admin' | 'Editor' | 'Viewer' | 'Coordinator';
    email?: string;
    phone?: string;
}