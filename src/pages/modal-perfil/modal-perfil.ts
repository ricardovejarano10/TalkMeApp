import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from '../../models/perfil';
import { PerfilPage } from '../perfil/perfil';
import firebase from 'firebase';
import { MapaPage } from '../mapa/mapa';
import { ChatPage } from '../chat/chat';
import { Storage } from '@ionic/storage';
import { DatosUsuarioProvider } from '../../providers/datos-usuario/datos-usuario';


@IonicPage()
@Component({
  selector: 'page-modal-perfil',
  templateUrl: 'modal-perfil.html',
})
export class ModalPerfilPage {

  perfilDatos: FirebaseObjectObservable<Perfil>
  imgsource: any;
  firestore = firebase.storage();
  keyPropia;

  constructor(private view:ViewController,
              public zone: NgZone, public datosUsuario: DatosUsuarioProvider,
              private afDatabase: AngularFireDatabase,public storage: Storage,
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
   const keyUs = this.navParams.get('key');

   //se agrega una lista de amigos 
   this.storage.get("id").then(val => {
    this.keyPropia = val;
    console.log('La UID propia en modal es: '+ this.keyPropia);
    console.log('La UID del usuario a chatear es: '+ keyUs)

    this.firestore.ref().child(`image/${keyUs}`).getDownloadURL().then((url) =>{
      this.zone.run(() => {
        this.imgsource = url;
      })
    })


     this.datosUsuario.obtenerDatos(this.keyPropia, keyUs, this.imgsource);
  })

   this.navCtrl.setRoot(ChatPage, {keyUs:keyUs});
    
  }
}
