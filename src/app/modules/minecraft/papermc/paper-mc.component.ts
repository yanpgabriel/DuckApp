import { Component, OnInit } from '@angular/core';
import { MinecraftService } from "../minecraft.service";
import { DowloadState, Download } from "../../../shared/download.util";
import { isNullOrUndefined } from "../../../shared/util";

@Component({
  selector: 'duck-papermc',
  templateUrl: './paper-mc.component.html',
  styleUrls: ['./paper-mc.component.css']
})
export class PaperMcComponent implements OnInit {

  downloadInfo: Download | null = null;
  versions = [];
  version: { label: string, value: string } | null = null;
  builds = [];
  build: { label: string, value: string } | null = null;

  constructor(
    private minecraftService: MinecraftService
  ) { }

  ngOnInit(): void {
    this.listPaperMcVersions();
  }

  downloadPronto(): boolean {
    return this.downloadInfo?.state == DowloadState.FINALIZADO;
  }

  listPaperMcVersions() {
    this.minecraftService.listVersionsPaperMC().subscribe(res => {
      this.versions = res.entity.map(versao => {
        return { label: versao, value: versao }
      }).reverse();
    })
  }

  listPaperMcBuilds(versao: string | undefined) {
    this.build = null;
    if (isNullOrUndefined(versao)) {
      return;
    }
    // @ts-ignore
    this.minecraftService.listBuildPaperMCByVersion(versao).subscribe(res => {
      this.builds = res.entity.map(build => {
        return { label: build, value: build }
      }).reverse();
    })
  }

  downloadPaperMcFile() {
    if (!this.version || !this.build) {
      console.debug('Selecione a versão do minecraft e a build do papermc.');
      return;
    }
    this.minecraftService.downloadFilePaperMC(this.version.label, this.build.label).subscribe(res => {
      this.downloadInfo = res;
    })
  }

}
