import { SafeHtml } from '@angular/platform-browser';

export interface DashboardWidget {
  id: string;
  title: string;
  description: string;
  principalIcon: string;
  secondaryIcon: string;
  contentTemplate: string | SafeHtml;
  contentTemplateParams: Record<string, unknown>;
  endpoint: string;
  status: 'pending' | 'success' | 'error';
  result: unknown;
  error: unknown;
  params: Record<string, unknown>;
}