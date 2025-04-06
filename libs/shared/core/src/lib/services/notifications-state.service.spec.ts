import { TestBed } from '@angular/core/testing';
import { NotificationsStateService } from './notifications-state.service';
import { FakeNotificationsService } from '../mock-api/services/fake-notifications.service';
import { of } from 'rxjs';
import { NotificationResponse } from '../mock-api/interfaces';

describe('NotificationsStateService', () => {
  let service: NotificationsStateService;
  let getNotificationsSpy: jest.SpyInstance;
  let updateNotificationSpy: jest.SpyInstance;
  let deleteNotificationSpy: jest.SpyInstance;

  const mockNotifications = [
    {
      id: '1',
      title: 'Test Notification 1',
      message: 'Test Message 1',
      type: 'info',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2',
      title: 'Test Notification 2',
      message: 'Test Message 2',
      type: 'success',
      timestamp: new Date(),
      read: true
    }
  ];

  beforeEach(() => {
    const mockFakeNotificationsService = new FakeNotificationsService();
    getNotificationsSpy = jest.spyOn(mockFakeNotificationsService, 'getNotifications').mockReturnValue(of({ notifications: mockNotifications, unreadCount: 1 } as unknown as NotificationResponse));
    updateNotificationSpy = jest.spyOn(mockFakeNotificationsService, 'updateNotification').mockReturnValue(of({ notifications: mockNotifications, unreadCount: 0 } as unknown as NotificationResponse));
    deleteNotificationSpy = jest.spyOn(mockFakeNotificationsService, 'deleteNotification').mockReturnValue(of({ notifications: mockNotifications.filter(n => n.id !== '1'), unreadCount: 0 } as unknown as NotificationResponse));
    TestBed.configureTestingModule({
      providers: [
        NotificationsStateService,
        { provide: FakeNotificationsService, useValue: mockFakeNotificationsService }
      ]
    });

    service = TestBed.inject(NotificationsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load notifications on initialization', () => {
    service.loadNotifications();
    expect(getNotificationsSpy).toHaveBeenCalled();
    expect(service.hasUnread()).toBe(true);
    expect(service.unreadCount()).toBe(1);
  });

  it('should mark notification as read', () => {
    service.loadNotifications();
    service.markAsRead('1');
    expect(updateNotificationSpy).toHaveBeenCalledWith({ id: '1', read: true });
  });

  it('should delete notification', () => {
    service.loadNotifications();
    service.deleteNotification('1');
    expect(deleteNotificationSpy).toHaveBeenCalledWith('1');
  });

  it('should update state after marking notification as read', () => {
    // Setup initial state
    service.loadNotifications();
    expect(service.unreadCount()).toBe(1);

    // Mock the response for marking as read
    const updatedNotifications = mockNotifications.map(n => 
      n.id === '1' ? { ...n, read: true } : n
    );
    updateNotificationSpy.mockReturnValue(of({
      notifications: updatedNotifications,
      unreadCount: 0
    } as unknown as NotificationResponse));

    // Mark as read and verify state update
    service.markAsRead('1');
    expect(service.unreadCount()).toBe(0);
    expect(service.hasUnread()).toBe(false);
  });
});
