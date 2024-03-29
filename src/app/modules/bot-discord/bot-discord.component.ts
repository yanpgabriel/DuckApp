import { Component, OnInit, ViewChild } from '@angular/core';
import { BotDiscordService } from './bot-discord.service';
import { BotDiscordSocketService } from './bot-discord.socket.service';
import { DuckTerminalComponent } from "../../shared/components/duck-terminal/duck-terminal.component";
import { DuckTerminalService } from "../../shared/components/duck-terminal/duck-terminal.service";

@Component({
  selector: 'duck-bot-discord',
  templateUrl: './bot-discord.component.html',
  styleUrls: ['./bot-discord.component.css']
})
export class BotDiscordComponent implements OnInit {

  servers: any = [];
  queue: any = {};
  loading = false;
  botUp = false;
  @ViewChild('terminal') terminal: DuckTerminalComponent | any = null;


  set selectedServer(server) {
    this.botService.selectedServer = server;
  }

  get selectedServer() {
    return this.botService.selectedServer;
  }

  constructor(
    private botService: BotDiscordService,
    private botWsService: BotDiscordSocketService,
    private terminalService: DuckTerminalService
  ) {
  }

  ngOnInit(): void {
    this.servers = this.botService.servers;
    this.checkBotUp();
  }

  async checkBotUp() {
    this.botUp = await this.botService.checkBot();
    if (this.botUp) {
      this.listarServers();
    }
  }

  listarServers() {
    this.botService.listServers().subscribe(res => {
      this.botService.servers = res.map((r: string) => {
        const splited = r.split(' #');
        return {id: splited[1], nome: splited[0]};
      });
    });
  }

  queueFromServer(): void {
    if (null == this.selectedServer) {
      // this.toastService.showDanger('Escolha um dos servidores primeiro!');
      return;
    }
    const socket = this.botWsService.socket(this.selectedServer.id);
    // Verifica se é um comando padrão e caso não seja envia pro socket do bot
    this.terminalService.commandHandler.subscribe(command => {
      if (command == 'cls') {
        this.terminal.commands = [];
        return;
      }
      if (command == 'queue') {
        this.botService.queueFromServer(this.selectedServer.id).subscribe(res => this.queue = res);
        return;
      }
      socket.next(command);
    });
    // Pega toda a resposta do socket e manda pro terminal
    socket.subscribe(res => this.terminalService.sendResponse(res.data));
  }

  iniciarBot() {
    this.loading = true;
    this.botService.initBot().subscribe({
      complete: () => {
        this.checkBotUp();
        this.loading = false;
      }
    });
  }

  pararBot() {
    this.loading = true;
    this.botService.stopBot().subscribe({
      complete: () => {
        this.checkBotUp();
        this.loading = false;
      }
    });
  }
}
