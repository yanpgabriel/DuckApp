import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DomHandler } from 'primeng/dom';
import { DuckTerminalService } from './duck-terminal.service';

@Component({
  selector: 'duck-terminal',
  templateUrl: './duck-terminal.component.html',
  styleUrls: ['./duck-terminal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DuckTerminalComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() welcomeMessage: string = '';

  @Input() prompt: string = '';

  @Input() style: any;

  @Input() styleClass: string = '';

  commands: any[] = [];

  command: string = '';

  container: Element | undefined;

  commandProcessed: boolean | undefined;

  subscription: Subscription;

  constructor(
    public el: ElementRef,
    public terminalService: DuckTerminalService,
    public cd: ChangeDetectorRef) {
    this.subscription = terminalService.responseHandler.subscribe(response => {
      this.commands[this.commands.length - 1].response = response.split('\n');
      this.commandProcessed = true;
    });
  }

  ngAfterViewInit() {
    this.container = DomHandler.find(this.el.nativeElement, '.duck-terminal')[0];
  }

  ngAfterViewChecked() {
    if (this.commandProcessed) {
      // @ts-ignore
      this.container.scrollTop = this.container.scrollHeight;
      this.commandProcessed = false;
      this.cd.detectChanges();
    }
  }

  @Input()
  set response(value: string) {
    if (value) {
      this.commands[this.commands.length - 1].response = value;
      this.commandProcessed = true;
    }
  }

  handleCommand(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.commands.push({ text: this.command });
      this.terminalService.sendCommand(this.command);
      this.command = '';
    }
  }

  focus(element: HTMLElement) {
    element.focus();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
