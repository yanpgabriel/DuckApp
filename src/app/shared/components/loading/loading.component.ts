import {Component, OnInit} from '@angular/core';
import {LoadingService} from '../../services/loading.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'duck-loading',
  template: `
    <div *ngIf="loading" class="flex flex-column align-items-center h-full w-full duck-container duck-loading">
      <div>
        <div class="text-center align-self-center w-15rem duck">
          <img alt="DuckApp" src="/assets/img/duck.png"/>
          <h2>{{ 'system.name' | translate }}</h2>
        </div>
        <div class="text-center align-self-center w-15rem">
          <!--      <div class="spinner-border" style="margin-top: 1rem; width: 5rem; height: 5rem;" role="status">-->
          <!--        <span class="sr-only">Loading...</span>-->
          <!--      </div>-->
          <!--<mat-progress-bar mode="indeterminate" style="width: 16%; margin-left: 42%;"></mat-progress-bar>-->
          <p-progressBar mode="indeterminate" [style]="{'height': '0.5rem'}"></p-progressBar>
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
      .duck-loading div {
        box-shadow: none;
      }
      .duck-loading > div {
        box-shadow: 0 0 10px 2px #cccccc;
      }
    `
  ]
})
export class LoadingComponent implements OnInit {

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