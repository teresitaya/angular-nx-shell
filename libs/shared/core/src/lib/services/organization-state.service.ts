import { Injectable, computed, signal } from '@angular/core';
import { FakeOrganizationService } from '../mock-api/services/fake-organization.service';
import { MockOrganization } from '../mock-api/interfaces/mock-organization.interface';

@Injectable({
  providedIn: 'root'
})
export class OrganizationStateService {
  private organizationState = signal<MockOrganization>({
    name: '',
    membersCount: 0
  });

  readonly name = computed(() => this.organizationState().name);
  readonly membersCount = computed(() => this.organizationState().membersCount);
  readonly hasMembersCount = computed(() => this.membersCount() > 0);

  constructor(private fakeOrganizationService: FakeOrganizationService) {
    this.loadOrganization();
  }

  /**
   * Loads organization data from the fake service
   */
  loadOrganization(): void {
    this.fakeOrganizationService.getOrganization().subscribe(
      organization => this.organizationState.set(organization)
    );
  }

  /**
   * Gets the full organization data as a snapshot
   * @returns The current organization data
   */
  getOrganizationSnapshot(): MockOrganization {
    return this.organizationState();
  }
}
