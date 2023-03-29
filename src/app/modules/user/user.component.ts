import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'duck-user',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
