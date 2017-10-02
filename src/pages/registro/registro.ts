import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  usuario = {} as Usuario;
 
  constructor(private fire: AngularFireAuth, public alertCtrl: AlertController ,
    public navCtrl: NavController, private toas: ToastController, public navParams: NavParams) {}

async registro(usuario: Usuario){
  try{ 
    const result = await this.fire.auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
    .then((authData) => {
      const alert = this.alertCtrl.create({
        title: 'Usuario creado',
        subTitle: 'Ahora puede iniciar sesión',
        
      });
      alert.present();
      this.navCtrl.setRoot('LoginPage');

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
  }catch(e){
    console.error(e);
  }
}

}
