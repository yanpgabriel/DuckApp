import { Component, Input } from '@angular/core';

@Component({
  selector: 'duck-layout',
  templateUrl: './duck-layout.component.html',
  styleUrls: ['./duck-layout.component.css']
})
export class DuckLayoutComponent {

  @Input() colapsarMenu = false;
  @Input() mostrarSidebar = false;

  fechaMenuSeAberto(divLayout) {
    if (!this.colapsarMenu && divLayout.clientWidth <= 768) {
      this.colapsarMenu = !this.colapsarMenu;
    }
  }
}
