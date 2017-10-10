import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from '../../models/perfil';
import firebase from 'firebase';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  perfilDatos: FirebaseObjectObservable<Perfil>

  key: any;
 // username: String = '';
  message: String = '';
  s;
  messages: object[] = [];

  constructor(private fire: AngularFireAuth, public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {

    var user = firebase.auth().currentUser;
    this.key = user.uid;
    this.perfilDatos = this.db.object(`perfil/${this.key}`);
    
    this.s = this.db.list('/chat').subscribe(data => {
    this.messages = data;      

    });

  }

  send(){
    this.db.list('/chat').push({
      username: this.key,
      message: this.message
      }).then(() => {
        //Lo que sucede si se hace la actualización correcta
      }).catch(()=>{
        //Por si se presenta algún error
      })

      this.message = '';
  }

  ionViewDidLoad() { }


}
