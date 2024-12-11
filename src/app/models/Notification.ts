export interface Notification {
    notificationId: number;
    message: string;
    type: string;
    dateCreated: Date; 
    isRead: boolean;
    dateRead?: string | null; 
    userId: number;
}