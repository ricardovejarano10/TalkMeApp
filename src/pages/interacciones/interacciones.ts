import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-interacciones',
  templateUrl: 'interacciones.html',
})
export class InteraccionesPage {

  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';



  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
              public navCtrl: NavController, public navParams: NavParams) {
                this.items = af.list('/messages', {
                  query: {
                    limitToLast: 50
                  }
                });
            
                this.user = this.afAuth.authState;

  }

  ionViewDidLoad() {}

Send(desc: string) {
    this.items.push({ message: desc});
    this.msgVal = '';
}
}
