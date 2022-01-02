import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalMessageService {
  message$ = new BehaviorSubject<AlertMessage | null>(null);
  private timeout?: number;

  clearAlertMessage(): void {
    console.log("clearAlertMessage");
    this.message$.next(null);
  }

  logAndSetErrorMessage(message: string, errorResponse?: HttpErrorResponse): void {
    console.log('ERROR: ' + message, errorResponse);
    this.setAlertMessage('danger', message, errorResponse);
  }

  setAlertMessage(type: MessageType, message: string, errorResponse?: HttpErrorResponse): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    const detail = this.createErrorMessage(errorResponse);

    const currentAlertMessage: AlertMessage = {type, message, detail};
    const timeoutInMillis = type === 'danger' || type === 'warning' ? 8000 : 4000;
    this.timeout = window.setTimeout(() => this.clearAlertMessage(), timeoutInMillis);
    this.message$.next(currentAlertMessage);
  }

  createErrorMessage(errorResponse?: HttpErrorResponse): string {
    let detail = '';
    if (errorResponse) {

      console.log('errorResponse', errorResponse);
      if (errorResponse.error) {
        if (errorResponse.error.rootException && errorResponse.error.rootMessage) {
          if (errorResponse.error.rootException === 'ConstraintViolationException') {
            detail = this.createConstraintViolationMessage(errorResponse);
          } else {
            detail = errorResponse.error.rootMessage;
          }
        } else {
          const exceptionName = errorResponse.error.error ? errorResponse.error.error + ": " : "";
          detail = exceptionName + errorResponse.error.message;
        }
      } else {
        return errorResponse.status + ' ' + errorResponse.statusText + ': ' + errorResponse.message;
      }
    }
    return detail;
  }

  createConstraintViolationMessage(errorResponse: HttpErrorResponse): string {
    console.log(errorResponse.error.rootMessage);
    const rootMessage = errorResponse.error.rootMessage;
    let message = '';
    if (rootMessage.indexOf('propertyPath') !== -1) {
      // full array of hibernate-validator generated constraint violations
      message +=
          rootMessage.substring(rootMessage.indexOf('propertyPath=') + 13, rootMessage.indexOf(', rootBeanClass')) + ' ';
    }

    if (rootMessage.indexOf('interpolatedMessage') !== -1) {
      // full array of hibernate-validator generated constraint violations
      message += rootMessage.substring(
          rootMessage.indexOf(`interpolatedMessage='`) + 21,
          rootMessage.indexOf(`', propertyPath`)
      );
    }

    return message === '' ? rootMessage : message;
  }
}

type MessageType = 'success' | 'info' | 'warning' | 'danger';

interface AlertMessage {
  type: MessageType;
  message: string;
  detail: string;
}
