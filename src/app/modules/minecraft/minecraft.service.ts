import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { saveAs } from 'file-saver';
import { Download, download } from "../../shared/download.util";
import { BaseResponse } from "../../shared/models/BaseResponse";

@Injectable({
  providedIn: 'root'
})
export class MinecraftService {

  private readonly baseUri = `${environment.api_host}/minecraft`;

  constructor(
    private httpClient: HttpClient
  ) { }

  listVersionsPaperMC(): Observable<BaseResponse> {
    return this.httpClient.get<BaseResponse>(
      `${this.baseUri}/papermc/version`,
      {
        observe: 'body',
        responseType: 'json',
        reportProgress: true,
      });
  }

  listBuildPaperMCByVersion(versao: string): Observable<BaseResponse> {
    return this.httpClient.get<BaseResponse>(
      `${this.baseUri}/papermc/version/${versao}`,
      {
        observe: 'body',
        responseType: 'json',
        reportProgress: true,
      });
  }

  downloadFilePaperMC(versao: string, build: string): Observable<Download> {
    return this.httpClient.get(
      `${this.baseUri}/papermc/version/${versao}/build/${build}/file`,
      {
        observe: 'events',
        responseType: 'blob',
        reportProgress: true,
      }).pipe(
        download((blob, filename) => saveAs(blob, filename))
      );
  }

  // saveFile(file) {
  //   const headers = new HttpHeaders();
  //   const body = new FormData();
  //   body.append('nome', file.name);
  //   body.append('arquivo', file, file.name);
  //   return this.httpClient.post(
  //     this.URL,
  //     body,
  //     { headers }
  //   );
  // }
}
