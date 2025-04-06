import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_NOTIFICATIONS } from '../consts/mock-notifications';
import { NotificationResponse, NotificationUpdate } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FakeNotificationsService {
  private readonly FAKE_DELAY = 800; // Simulate network delay
  private notifications = [...MOCK_NOTIFICATIONS]; // Create a mutable copy

  getNotifications(): Observable<NotificationResponse> {
    const unreadCount = this.notifications.filter(n => !n.read).length;
    return of({
      notifications: this.notifications,
      unreadCount
    }).pipe(delay(this.FAKE_DELAY));
  }

  updateNotification(update: NotificationUpdate): Observable<NotificationResponse> {
    const notification = this.notifications.find(n => n.id === update.id);
    if (notification) {
      notification.read = update.read;
    }
    return this.getNotifications();
  }

  markAllNotificationsAsRead(): Observable<NotificationResponse> {
    this.notifications.forEach(n => n.read = true);
    return this.getNotifications();
  }

  deleteNotification(id: string): Observable<NotificationResponse> {
    this.notifications = this.notifications.filter(n => n.id !== id);
    return this.getNotifications();
  }
}
