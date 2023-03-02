import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { isNullOrUndefined } from "./util";

export enum DowloadState {
  PENDENTE,
  EM_PROGRESSO,
  FINALIZADO
}

export interface Download {
  state: DowloadState;
  progress: number;
  content: Blob | null;
}

function getFileName(event: HttpResponse<Blob>): string {
  const contentDisposition = event.headers.get('Content-Disposition');
  console.log(event.headers, event.headers.keys());
  let fileName;
  if (!isNullOrUndefined(contentDisposition)) {
    // @ts-ignore
    const splitInfo = contentDisposition.split(';');
    fileName = splitInfo[1].replace('filename=', '');
  }
  return fileName || 'arquivo sem nome';
}

export function download(saver?: (b: Blob, filename?: string) => void): (source: Observable<HttpEvent<Blob>>) => Observable<Download> {
  return (source: Observable<HttpEvent<Blob>>) => source.pipe(
      scan((previous: Download, event: HttpEvent<Blob>): Download => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
            case HttpEventType.DownloadProgress:
              return {
                progress: event.total
                  ? Math.round((100 * event.loaded) / event.total)
                  : previous.progress,
                state: DowloadState.EM_PROGRESSO,
                content: null
              };
            case HttpEventType.Response:
              if (saver && event.body) {
                saver(event.body, getFileName(event));
              }
              return {
                progress: 100,
                state: DowloadState.FINALIZADO,
                content: event.body
              };
            default:
              return previous;
          }
        },
        { state: DowloadState.PENDENTE, progress: 0, content: null }
      )
    );
}
