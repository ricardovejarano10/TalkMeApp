import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class DatosUsuarioProvider {

  keyAmigo;
  nombreUsuario: string;
  firestore = firebase.storage();
  urlImagen;

  constructor(public http: Http, private afDatabase: AngularFireDatabase) {
    console.log('Hello DatosUsuarioProvider Provider');
  }

  obtenerDatos(keyPropia: String, keyUsuario:String, url: String){

    this.urlImagen = 'alfo'
    //Lo primero que se hace es recuperar los datos del perfil 
    //al que corresponda la variable keyUsuario
    var nombre: any = firebase.database().ref('/perfil/' + keyUsuario).once('value').then(function (snapshot) {
      var username = (snapshot.val() && snapshot.val().nickname) || 'Anonymous';
      var nombre = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';
      var apellido = (snapshot.val() && snapshot.val().apellido) || 'Anonymous';
      var nickname = username;
      //this.nombreUsuario = nickname;
      var nombreUsuario = nombre;
      var apellidoUsuario = apellido;

      

      console.log('El nombre usuario en el provider es: '+nombreUsuario);
      console.log('El nombre es: '+ nombre + ' ' + apellido);
      firebase.database().ref(`amigos/${keyPropia}/${keyUsuario}`).set({
         key: keyUsuario,
         nombreUsuario: nickname,
         nombre: nombre,
         url: url,
         apellido: apellido

      })

    })



  }

}
