import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ErrorContent } from '../../models/error.interface';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent implements OnInit {
  @Input()
  public error?: ErrorContent;

  public ngOnInit(): void {
    this.createError();
  }

  private createError(): void {
    const message: string | undefined = this.error?.message
      .split('.')[0]
      .replace('Firebase: ', '');
    if (this.error?.topic) {
      const attributes: string[] = this.generateModalAttributes();
      this.error = {
        ...this.error,
        message: message!,
        icon: attributes[0],
      };
      this.error?.modal?.classList.add('error-dialog-modal', attributes[1]);
    }
  }

  private generateModalAttributes(): string[] {
    let icon: string;
    let backgroundClass: string;
    switch (this.error?.topic) {
      case 'business-error':
        icon = 'fa-circle-exclamation';
        backgroundClass = 'bg-secondary';
        return [icon, backgroundClass];
      case 'service-error':
        icon = 'fa-xmark';
        backgroundClass = 'bg-warning';
        return [icon, backgroundClass];
    }
    return [];
  }
}
