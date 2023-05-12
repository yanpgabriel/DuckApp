import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UtilsService } from "./utils.service";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  constructor(
    private messageService: MessageService,
    private utilsService: UtilsService,
  ) {
  }

  showSuccess(message: string): void {
    this.show('success', 'Sucesso', message);
  }

  showMultipleSuccess(messages: string[]): void {
    messages.forEach(message => {
      this.showSuccess(message)
    })
  }

  showInfo(message: string): void {
    this.show('info', 'Info', message);
  }

  showMultipleInfo(messages: string[]): void {
    messages.forEach(message => {
      this.showInfo(message)
    })
  }

  showDanger(message: string): void {
    this.show('error', 'Erro', message);
  }

  showMultipleDanger(messages: string[]): void {
    messages.forEach(message => {
      this.showDanger(message)
    })
  }

  private async show(type: string, titulo: string, message: string) {
    const messageFinal = await this.utilsService.traduzir(message);
    this.messageService.add({key: 'principal', severity: type, summary: titulo, detail: messageFinal, closable: true, life: 5000});
  }

}
