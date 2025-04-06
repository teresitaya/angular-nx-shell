import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-coming-soon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-surface-50 dark:bg-surface-900">
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold text-primary mb-4">Coming Soon!</h1>
        <p class="text-xl text-surface-600 dark:text-surface-400">This feature is currently under development.</p>
        <p class="text-lg text-surface-500 dark:text-surface-500">Stay tuned for exciting updates!</p>
      </div>
    </div>
  `,
  styles: []
})
export class ComingSoonComponent {}
