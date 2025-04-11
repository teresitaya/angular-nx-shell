import { Injectable, signal } from '@angular/core';
import { DashboardWidget } from '../dtos/interfaces/dashboard-widget';

export interface WidgetState {
  widget: DashboardWidget;
  isLoading: boolean;
  error?: string;
  result?: any;
}

@Injectable({
  providedIn: 'root'
})
export class WidgetStateService {
  private widgetStates = signal<WidgetState[]>([]);

  addWidget(widget: DashboardWidget): void {
    const newState = {
      widget,
      isLoading: true,
      result: undefined
    };
    this.widgetStates.update(states => [...states, newState]);
  }

  updateWidgetState(widgetId: string, state: Partial<WidgetState>): void {
    this.widgetStates.update(states => 
      states.map(s => s.widget.id === widgetId ? { ...s, ...state } : s)
    );
  }

  getWidgetState(widgetId: string): WidgetState | undefined {
    return this.widgetStates().find(s => s.widget.id === widgetId);
  }

  getAllWidgetStates(): WidgetState[] {
    return this.widgetStates();
  }

  removeWidget(widgetId: string): void {
    this.widgetStates.update(states => 
      states.filter(s => s.widget.id !== widgetId)
    );
  }
}
