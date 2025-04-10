import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MockOrganization } from '../interfaces/mock-organization.interface';

@Injectable({
  providedIn: 'root'
})
export class FakeOrganizationService {
  private readonly FAKE_DELAY = 800; // Simulate network delay
  /**
   * Get organization information including name and members count
   * @returns Observable with organization data
   */
  getOrganization(): Observable<MockOrganization> {
    // Mock data - in a real app, this would call an API
    const organization: MockOrganization = {
      name: 'Acme Corporation',
      membersCount: 42
    };
    
    // Simulate API delay
    return of(organization).pipe(delay(this.FAKE_DELAY));
  }
}
