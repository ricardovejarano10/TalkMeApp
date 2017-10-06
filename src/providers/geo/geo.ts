import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as GeoFire from "geofire"
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Perfil } from '../../models/perfil';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';


@Injectable()
export class GeoProvider {
 
  urlPerfil = "https://talkmeapp-59cd7.firebaseio.com/perfil/";
  dbref:any;
  geoFire:any;

  hits = new BehaviorSubject([])
  perfilDatos: FirebaseObjectObservable<Perfil>

  constructor(private fire: AngularFireAuth,private db: AngularFireDatabase, public http:Http,
    private afDatabase: AngularFireDatabase,) {
    this.dbref = this.db.list('/locations');
    this.geoFire = new GeoFire(this.dbref.$ref);
  }

  //setLocation agrega la información a la base de datos GeoFire
  setLocation(key:string, coords: Array<number>){
    this.geoFire.set(key, coords).then(_ => console.log('location updated')).catch(err => console.log(err))
  }

  getLocation(radius: number, coords: Array<number>){
    this.geoFire.query({
      center: coords,
      radius: radius
    })
    .on('key_entered', (key, location, distance) => {
        var nombre = firebase.database().ref('/perfil/' + key).once('value').then(function(snapshot) {
          var username = (snapshot.val() && snapshot.val().nickname) || 'Anonymous';
          var nombreDeUsuario:String = username;
          console.log("El nombre de usuario es: " + nombreDeUsuario);

        });
      
      let hit = {
        location: location,
        distance: distance,
        key: key
      }
      let currentHints = this.hits.value
      currentHints.push(hit)
      this.hits.next(currentHints)
 
  })
  

  }


}
