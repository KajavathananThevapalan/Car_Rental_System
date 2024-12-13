import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationUrl = 'http://localhost:5282/api/Notification';

  constructor(private http: HttpClient) { }

  sendNotification(notificationData: any): Observable<any> {
    return this.http.post<any>(this.notificationUrl, notificationData);
  }

  GetAllNotificationByUserId(userId: number) {
    return this.http.get(this.notificationUrl + '/' + userId);
  }

  MarkAsRead(notificationId: any) {
    return this.http.put(this.notificationUrl + '/' + notificationId, { isRead: true });
  }
}
