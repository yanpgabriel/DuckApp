import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  constructor(
    private messageService: MessageService,
    private translateService: TranslateService,
  ) {
  }

  showSuccess(message: string): void {
    this.show('success', 'Sucesso', message);
  }

  showInfo(message: string ): void {
    this.show('info', 'Info', message);
  }

  showDanger(message: string): void {
    this.show('error', 'Erro', message);
  }

  private show(type: string, titulo: string, message: string) {
    const messageFinal = this.translateService.instant(message);
    this.messageService.add({ key: 'principal', severity: type, summary: titulo, detail: messageFinal, life: 10000 });
  }

}
