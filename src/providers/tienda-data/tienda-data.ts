import { Injectable } from '@angular/core';
import { Tienda } from './tienda';


@Injectable()
export class TiendaDataProvider {

  data:Tienda[]; 

  constructor() {
    this.loadData();
  }

  loadData(){
    this.data = [
      { nombre: '500 Metros', descripcion: 'Quieres ir más allá de unos cuantos metros?  Pues bien, agranda tu rango!', precio: 10000, imagen: 'https://www.espcializados.es/wp-content/uploads/2017/08/Encontrar-aparcamiento-con-Google-Maps.jpg' },
      { nombre: '1 Kilómetro', descripcion: 'Llevar a otro nivel tu interacción implica un rango aún más grande', precio: 20000, imagen: 'https://www.espcializados.es/wp-content/uploads/2017/08/Encontrar-aparcamiento-con-Google-Maps.jpg' },
      { nombre: '10 Kilometros', descripcion: 'Demuestra que estás a otro nivel al poder hablar con quien quieras, desde tu casa hasta un rango de 10 Kilómetros', precio: 50000, imagen: 'https://www.espcializados.es/wp-content/uploads/2017/08/Encontrar-aparcamiento-con-Google-Maps.jpg' },
      { nombre: 'Apariencia V.I.P', descripcion: 'Quieres diferenciarte de los demás?', precio: 5000, imagen: 'http://k45.kn3.net/taringa/2/2/8/0/6/1/87/kanikase/4F3.jpg?9688' },
      { nombre: 'Apariencia V.I.P', descripcion: 'Quieres diferenciarte de los demás?', precio: 5000, imagen: 'https://vignette4.wikia.nocookie.net/dragonball/images/7/71/Aladdin_Jasmine.jpg/revision/latest?cb=20120412125826g' },
    ];
  }

}
