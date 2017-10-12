import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { PerfilPage } from '../perfil/perfil';
import { AngularFireDatabase } from 'angularfire2/database';
import { Perfil } from '../../models/perfil';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario = {} as Usuario;
  perfil = {} as Perfil;
  key: string = '';

  constructor(private fire: AngularFireAuth,
    public storage: Storage,
    private afDatabase: AngularFireDatabase,
    private toas: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(usuario: Usuario){
    try{
    const result = this.fire.auth.signInWithEmailAndPassword(usuario.email, usuario.password)
    .then((authData) => {
      console.log("User created successfully with payload-", authData);
      this.storage.set("logged", true);
      const key = firebase.auth().currentUser.uid;
      this.key = key;
      console.log('La pagina de login pasa la siguiente llave: '+ this.key);
      this.storage.set("id", this.key);
      this.navCtrl.setRoot(HomePage, {key:this.key});
    })
    .catch(function(error) {
      var errorCode = error.message;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('Contraseña minimo de 6 caracteres');
       
      } else {
        alert(errorMessage);
      }

    });

  } catch(e){
    console.error(e);
  
  }
}

  registro(){
    this.navCtrl.push('RegistroPage')
  }

}
