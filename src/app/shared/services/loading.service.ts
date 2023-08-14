import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  setLoading(loading: boolean, url: string | null = null): void {
    if (!url) {
      url = window.location.pathname;
    }
    if (loading) {
      this.loadingMap.set(url, loading);
      this.loadingSub.next(loading);
      console.debug(`[LOADING] Url '${url} setado para ${loading}`)
    } else if (!loading && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
      console.debug(`[LOADING] Removendo Url '${url}`)
    }
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
      console.debug(`[LOADING] Parando o carregamento`)
    }
  }

  toggleLoading(url: string | null = null): void {
    if (!url) {
      url = window.location.pathname;
    }
    if (this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    } else {
      this.loadingMap.set(url, true);
      this.loadingSub.next(true);
    }
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
    }
  }

}
