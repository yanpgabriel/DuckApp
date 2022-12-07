import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'duck-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() model: any[] | MenuItem[] = [];
  @Input() logged: boolean = false;

  constructor(
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
  }

}
