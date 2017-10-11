import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from '../../models/perfil';
import { PerfilPage } from '../perfil/perfil';
import { MapaPage } from '../mapa//mapa';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-perfil-usuario',
  templateUrl: 'perfil-usuario.html',
})
export class PerfilUsuarioPage {

  perfilDatos: FirebaseObjectObservable<Perfil>
  imgsource: any;
  firestore = firebase.storage();
  estado: number = 0;
  constructor(private fire: AngularFireAuth,
    public zone: NgZone,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.fire.authState.take(1).subscribe(data => {
      this.perfilDatos = this.afDatabase.object(`perfil/${data.uid}`)
      this.firestore.ref().child(`image/${data.uid}`).getDownloadURL().then((url) =>{
        this.zone.run(() => {
          this.imgsource = url;
          this.estado = 1;
        })
      })
    })
  }

  cargarPerfil(){
    

  }


  editarPerfil(){
    this.navCtrl.push(PerfilPage);
  }




}
