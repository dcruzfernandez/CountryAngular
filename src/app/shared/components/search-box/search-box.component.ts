import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  @Input()
  public placeholder:string="";

  @Input()
  public value:string="";

  @Output()
  public onValue : EventEmitter<string> = new EventEmitter();

  @ViewChild('txtBuscar')
  public Buscar!:ElementRef<HTMLInputElement>

  //public claveBusqueda:string='';

  consultar(clave:string):void{
    if(clave.length==0) return;
    this.onValue.emit(clave);
    this.Buscar.nativeElement.value='';
  }
}
