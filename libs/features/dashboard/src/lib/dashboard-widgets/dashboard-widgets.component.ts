import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWidget, OrganizationStateService } from '@teresitaya/core';
import { CardModule } from 'primeng/card';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'lib-dashboard-widgets',
  imports: [CommonModule, CardModule],
  templateUrl: './dashboard-widgets.component.html',
  styles: ``,
})
export class DashboardWidgetsComponent implements OnInit {
  widgets: DashboardWidget[] = [];
  
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _organizationStateService = inject(OrganizationStateService);

  ngOnInit(): void {
    this.widgets = [
      {
        id: 'dw-organization',
        title: '',
        description: 'Org',
        principalIcon: 'pi pi-building',
        secondaryIcon: 'pi pi-users',
        contentTemplate: this._sanitizer.bypassSecurityTrustHtml('<div class="flex flex-col gap-2"><p>Loading organization data...</p></div>'),
        contentTemplateParams: {},
        endpoint: 'getOrganization',
        status: 'pending',
        result: undefined,
        error: undefined,
        params: {},
      }
    ];
    this.resolveAllWidgets();
  }


  resolveAllWidgets() {
    this.widgets.forEach((widget) => this.resolveWidget(widget));
  }


  async resolveWidget(widget: DashboardWidget) {
    widget.status = 'pending';
    
    try {
      // Handle different endpoints
      if (widget.endpoint === 'getOrganization') {
        // Get organization data from the state service
        const result = this._organizationStateService.getOrganizationSnapshot();
        widget.result = result;
        widget.status = 'success';
        
        // Update the content template with the actual data
        widget.contentTemplate = this._sanitizer.bypassSecurityTrustHtml(`
          <div class="flex flex-col gap-4">
            <div>
              <span class="font-semibold">Organization:</span> ${result.name}
            </div>
            <div>
              <span class="font-semibold">Members:</span> ${result.membersCount}
            </div>
          </div>
        `);
      }
      // Add other endpoint handlers here as needed
    } catch (error) {
      widget.error = error;
      widget.status = 'error';
      widget.contentTemplate = this._sanitizer.bypassSecurityTrustHtml(`
        <div class="text-red-600 dark:text-red-300">
          <p>Error loading organization data</p>
          <p class="text-sm">${error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      `);
    }
  }


}

