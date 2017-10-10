import { Component, NgZone } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../models/usuario';
import { LoginPage } from '../login/login';
import { ChatPage } from '../chat/chat';
import { MapaPage } from '../mapa/mapa';
import { PerfilPage } from '../perfil/perfil';
import { PerfilUsuarioPage } from '../perfil-usuario/perfil-usuario';
import { FavoritosPage } from '../favoritos/favoritos';
import { TiendaPage } from '../tienda/tienda';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Perfil } from '../../models/perfil';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { GeoProvider } from '../../providers/geo/geo';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  root:any = MapaPage;
  nativepath: any;
  firestore = firebase.storage();
  perfilDatos: FirebaseObjectObservable<Perfil>
  imgsource: any;
  estado: any;

 
  

  menuOpc: Menu[] = [
    { label: 'Perfil', icon: 'home' },
    { label: 'Chat', icon: 'md-beer' },
    { label: 'Favoritos', icon: 'md-pizza' },
    { label: 'Tienda', icon: 'md-restaurant' }

  ]

  usuario = {} as Usuario;
  constructor(private fire: AngularFireAuth,
    public fch: FileChooser,
    public zone: NgZone,
    public storage: Storage,private geo: GeoProvider,
    private afDatabase: AngularFireDatabase, public navCtrl: NavController, private toas: ToastController) {

  }

  ionViewDidLoad() {
      this.fire.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid){  
        this.perfilDatos = this.afDatabase.object(`perfil/${data.uid}`)
        }else{
          this.toas.create({
            message: `No se encuentra usuario`,
            duration: 3000
          }).present();
        }
        this.firestore.ref().child(`image/${data.uid}`).getDownloadURL().then((url) =>{
          this.zone.run(() => {
            this.imgsource = url;
          })
        })
       
    })
  }

  setContent(i){
    switch(i){
      case 0:this.navCtrl.push(PerfilUsuarioPage);
      break;
      case 1: this.navCtrl.push(ChatPage);
      break;
      case 2: this.navCtrl.push(FavoritosPage);
      break;
      case 3: this.navCtrl.push(TiendaPage);
      break;
    } 
  
}

logout(){
  const key = firebase.auth().currentUser.uid;
  this.afDatabase.database.ref(`locations/${key}`).remove();
  this.fire.auth.signOut();
  this.storage.set("logged", false);
  this.navCtrl.setRoot(LoginPage);
  }

}

interface Menu{
  label:string;
  icon:string;
}