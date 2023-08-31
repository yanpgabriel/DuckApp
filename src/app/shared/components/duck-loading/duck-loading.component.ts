import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'duck-loading',
  template: `
    <div *ngIf="loading" class="flex flex-column align-items-center h-full w-full duck-container duck-loading">
      <div class="w-20rem">
        <h2>{{ 'system.name' | translate }}</h2>
        <div class="text-center align-self-center duck">
          <img alt="DuckApp" src="/assets/img/duck.png"/>
        </div>
        <div class="text-center align-self-center w-full">
          <!--      <div class="spinner-border" style="margin-top: 1rem; width: 5rem; height: 5rem;" role="status">-->
          <!--        <span class="sr-only">Loading...</span>-->
          <!--      </div>-->
          <!--<mat-progress-bar mode="indeterminate" style="width: 16%; margin-left: 42%;"></mat-progress-bar>-->
          <p-progressBar mode="indeterminate" [style]="{'height': '1rem'}"></p-progressBar>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .duck-loading {
        color: white;
        position: fixed;
        /*background-color: #ffffffd4;*/
        /*background-color: #000000e0;*/
        z-index: 1;
      }
      .duck-loading h2 {
        margin-bottom: -2rem;
      }
      .duck-loading div {
        box-shadow: none;
      }
      .duck-loading > div {
        box-shadow: 0 0 1.0rem 0.2rem var(--surface-b);
      }
    `
  ]
})
export class DuckLoadingComponent implements OnInit {

  loading = false;

  constructor(
    public loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        if (this.loading !== loading) {
          this.loading = loading;
        }
      });
  }

}
