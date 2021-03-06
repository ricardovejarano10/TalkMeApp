import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from '../../models/perfil';
import firebase from 'firebase';
import { PerfilUsuarioPage } from '../perfil-usuario/perfil-usuario';
import { MapaPage } from '../mapa/mapa';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  perfilDatosUs: FirebaseObjectObservable<Perfil>
  perfilDatos: FirebaseObjectObservable<Perfil>
  nickname: String = '';
  key: any;
  keyUsuarioChat:any;
  username: String = '';
  message: String = '';
  s;
  messages: object[] = [];

  constructor(private fire: AngularFireAuth, public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {

    var user = firebase.auth().currentUser;
    this.key = user.uid;
    
    this.perfilDatos = this.db.object(`perfil/${this.key}`)
    
    var keyUs = this.navParams.get('keyUs');
    this.keyUsuarioChat = keyUs;
    this.perfilDatosUs = this.db.object(`perfil/${this.keyUsuarioChat}`)
    this.s = this.db.list(`/chat/${this.key}${keyUs}`).subscribe(data => {
    this.messages = data;      

    });

  }

  send(){
     
    if(this.message){
      var keyUs = this.navParams.get('keyUs');
      console.log(keyUs); 
      this.db.list(`/chat/${this.key}${keyUs}`).push({
      key: this.key,
      username: this.username,
      message: this.message
      //new: 0
      }).then(() => {
        //Lo que sucede si se hace la actualización correcta
      }).catch(()=>{
        //Por si se presenta algún error
      })

      this.db.list(`/chat/${keyUs}${this.key}`).push({
        key: this.key,
        username: this.username,
        message: this.message
        //new: 1
        }).then(() => {
          //Lo que sucede si se hace la actualización correcta
        }).catch(()=>{
          //Por si se presenta algún error
        })

      this.message = '';
  }
}

cerrarChat(){
  this.navCtrl.pop();
}



}
