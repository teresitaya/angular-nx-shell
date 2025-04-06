import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_DASHBOARD_STATS } from '../consts/mock-data';
import { DashboardStats } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {
  private readonly FAKE_DELAY = 800; // Simulate network delay

  
  getDashboardStats(): Observable<DashboardStats> {
    // Update timestamps to be relative to now
    const stats = { ...MOCK_DASHBOARD_STATS };
    stats.recentAlerts = stats.recentAlerts.map((alert) => ({
      ...alert,
      timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60).toISOString() // Random time within last hour
    }));
    stats.agentStatus = stats.agentStatus.map((agent) => ({
      ...agent,
      lastSeen: new Date(Date.now() - Math.random() * 1000 * 60 * 30).toISOString() // Random time within last 30 minutes
    }));
    
    return of(stats).pipe(delay(this.FAKE_DELAY));
  }
}
