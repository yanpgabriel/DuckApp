import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {UserService} from '../user/user.service';

@Component({
  selector: 'duck-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  verifyGroup(): void {
    this.userService.verifyGroup().subscribe(res => console.log(res));
  }

}
