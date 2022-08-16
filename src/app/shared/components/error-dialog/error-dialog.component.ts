import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ErrorContent } from '../../models/error-content';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent implements OnInit {
  @Input()
  public error?: string;

  public errorContent: ErrorContent = {
    icon: '',
    message: '',
  };

  public ngOnInit(): void {
    switch (this.error) {
      case 'user-not-found':
        this.errorContent = {
          icon: 'fa-user-large-slash',
          message:
            'Lo sentimos, no encontramos un registro asociado con estos datos. El usuario puede no estar registrado.' +
            'Por favor, contacte al administrador.',
        };
    }
  }
}
