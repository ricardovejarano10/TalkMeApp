import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tienda } from '../../providers/tienda-data/tienda';
import { TiendaDataProvider } from '../../providers/tienda-data/tienda-data';

@IonicPage()
@Component({
  selector: 'page-tienda',
  templateUrl: 'tienda.html',
})
export class TiendaPage {

  items: Tienda[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: TiendaDataProvider) {
    this.items = service.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TiendaPage');
  }
  comprar(){
    alert('Comprar en PlayStore')
  }

}
