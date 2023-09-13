import { Component, Input } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { DuckMenuItem } from "../../models/DuckMenuItem";

@Component({
  selector: 'duck-list',
  templateUrl: './duck-list.component.html',
  styleUrls: ['./duck-list.component.css']
})
export class DuckListComponent {

  @Input() model: DuckMenuItem[] = [];
  @Input() logged = false;

  constructor(
    public utilsService: UtilsService
  ) { }

}
