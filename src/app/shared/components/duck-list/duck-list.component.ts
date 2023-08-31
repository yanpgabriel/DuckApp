import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'duck-list',
  templateUrl: './duck-list.component.html',
  styleUrls: ['./duck-list.component.css']
})
export class DuckListComponent implements OnInit {

  @Input() model: any[] | MenuItem[] = [];
  @Input() logged: boolean = false;

  constructor(
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
  }

}
