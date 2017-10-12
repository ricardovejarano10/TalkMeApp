import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MapaPage } from '../../pages/mapa/mapa';

@Injectable()
export class TimerProvider {

  refrescarUbicacion;
  a = 0;
  constructor(public http: Http) {
    console.log('Hello TimerProvider Provider');
  }

  refUb(){
    this.refrescarUbicacion = setInterval(() => {
      this.a = this.a + 1;
      
      console.log('El valor de a es: ' + this.a);
    },5000)

  }

}
