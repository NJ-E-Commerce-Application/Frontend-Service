import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-prompt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css'],
})
export class MessagePromptComponent {
  showMessage = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  displayMessage(type: 'success' | 'error', msg: string): void {
    this.messageType = type;
    this.message = msg;
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 10000); // 10 seconds
  }

  closeMessage(): void {
    this.showMessage = false;
  }
}
