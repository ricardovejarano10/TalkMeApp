import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-modal-perfil',
  templateUrl: 'modal-perfil.html',
})
export class ModalPerfilPage {

  constructor(private view:ViewController, public navCtrl: NavController, public navParams: NavParams,) {
  }

  ionViewDidLoad() {
    const key = this.navParams.get('key');
    console.log('Estamos en el modal: ' + key);
  }

  cerrarModal(){
     this.view.dismiss();
  }

}
