import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'duck-list',
  templateUrl: './duck-list.component.html',
  styleUrls: ['./duck-list.component.css']
})
export class DuckListComponent {

  @Input() model: MenuItem[] = [];
  @Input() logged = false;

  constructor(
    public utilsService: UtilsService
  ) { }

}
