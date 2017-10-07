import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from '../../models/perfil';
import { PerfilPage } from '../perfil/perfil';
import firebase from 'firebase';
import { MapaPage } from '../mapa//mapa';
import { InteraccionesPage } from '../interacciones/interacciones';

@IonicPage()
@Component({
  selector: 'page-modal-perfil',
  templateUrl: 'modal-perfil.html',
})
export class ModalPerfilPage {

  perfilDatos: FirebaseObjectObservable<Perfil>
  imgsource: any;
  firestore = firebase.storage();

  constructor(private view:ViewController,
              public zone: NgZone,
              private afDatabase: AngularFireDatabase,
              public navCtrl: NavController, public navParams: NavParams,) {
  }

  ionViewDidLoad() {
    const key = this.navParams.get('key');
    this.perfilDatos = this.afDatabase.object(`perfil/${key}`)
    this.firestore.ref().child(`image/${key}`).getDownloadURL().then((url) =>{
      this.zone.run(() => {
        this.imgsource = url;
      })
    })
  }

  cerrarModal(){
     this.view.dismiss();

  }

  chatear(){
   // this.view.dismiss();
    this.navCtrl.push(InteraccionesPage);
    
  }
}
