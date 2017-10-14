import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Amigo } from '../../models/amigo';
import { Storage } from '@ionic/storage';
import { DatosUsuarioProvider } from '../../providers/datos-usuario/datos-usuario';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {

 amigos: Amigo[];
 keyPropia;
 keyAmigo; 
 constructor(public storage: Storage,private afDatabase: AngularFireDatabase,
             public datosUsuario: DatosUsuarioProvider,
             public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.storage.get("id").then(val => {
      this.keyPropia = val;

    this.afDatabase.list(`/amigos/${this.keyPropia}/`).subscribe(valor => {
        this.amigos = valor;        
      })
      
    })
  }
  chat(key:string){
    this.navCtrl.setRoot(ChatPage, {keyUs:key});

  }

}
