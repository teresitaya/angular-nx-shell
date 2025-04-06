import { Injectable, computed, signal } from '@angular/core';
import { FakeNotificationsService } from '../mock-api/services/fake-notifications.service';
import { NotificationResponse } from '../mock-api/interfaces/mock-notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationsStateService {
  private notificationsState = signal<NotificationResponse>({
    notifications: [],
    unreadCount: 0
  });

  readonly notifications = computed(() => this.notificationsState().notifications);
  readonly unreadCount = computed(() => this.notificationsState().unreadCount);
  readonly hasUnread = computed(() => this.unreadCount() > 0);

  constructor(private fakeNotificationsService: FakeNotificationsService) {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.fakeNotificationsService.getNotifications().subscribe(
      response => this.notificationsState.set(response)
    );
  }

  markAsRead(id: string): void {
    this.fakeNotificationsService.updateNotification({ id, read: true })
      .subscribe(response => this.notificationsState.set(response));
  }

  markAsUnread(id: string): void {
    this.fakeNotificationsService.updateNotification({ id, read: false })
      .subscribe(response => this.notificationsState.set(response));
  }

  deleteNotification(id: string): void {
    this.fakeNotificationsService.deleteNotification(id)
      .subscribe(response => this.notificationsState.set(response));
  }

  markAllAsRead(): void {
    this.fakeNotificationsService.markAllNotificationsAsRead()
      .subscribe(response => this.notificationsState.set(response));
  }
}
