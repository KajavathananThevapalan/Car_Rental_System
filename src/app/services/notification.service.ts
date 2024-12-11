import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationUrl = 'http://localhost:5282/api/Notification';

    constructor(private http: HttpClient) {}

    CreateNotification(notification: any ){
      return this.http.post(this.notificationUrl, notification).subscribe({
        next: () => console.log('Notification sent'),
        error: (err) => console.error('Failed to send notification', err)
    });
    }

    GetAllNotificationByUserId(userId:number){
      return this.http.get(this.notificationUrl+'/'+userId).subscribe({
        next: () => console.log('Notification get'),
        error: (err) => console.error('Failed to get notification', err)
    });
    }

    MarkAsRead(notification:any){
      return this.http.put(this.notificationUrl+'/'+notification.userId,notification).subscribe({
        next: () => console.log('Notification set as Read'),
        error: (err) => console.error('Failed to set notification as Read', err)
    });
    }
}
