import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as GeoFire from "geofire"
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Perfil } from '../../models/perfil';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';


@Injectable()
export class GeoProvider {
  refrescarUbicacion;
  a = 0;
  lat: number;
  lng: number;
  urlPerfil = "https://talkmeapp-59cd7.firebaseio.com/perfil/";
  dbref:any;
  geoFire:any;
  keyActual: string;

  hits = new BehaviorSubject([])
  perfilDatos: FirebaseObjectObservable<Perfil>

  constructor(private fire: AngularFireAuth,private db: AngularFireDatabase, public http:Http,public storage: Storage,
    private afDatabase: AngularFireDatabase,) {
    this.dbref = this.db.list('/locations');
    this.geoFire = new GeoFire(this.dbref.$ref);
  }

  //setLocation agrega la información a la base de datos GeoFire
  setLocation(key:string, coords: Array<number>){
    this.geoFire.set(key, coords).then(_ => console.log('Ubicación actualizada')).catch(err => console.log(err))
  }

  getLocation(radius: number, coords: Array<number>){
    this.geoFire.query({
      center: coords,
      radius: radius
    })
    .on('key_entered', (key, location, distance) => {
              
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

  refUb(key2: string){
    this.keyActual = key2;
    this.refrescarUbicacion = setInterval(() => {
      this.a = this.a + 1;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          this.fire.authState.take(1).subscribe(data => {
          console.log('La llave para mapear es: ' + data.uid);
          this.setLocation(data.uid, [this.lat, this.lng]);  
        });
        
        });
      }

      
      console.log('El valor de a es: ' + this.a);
    },4000)

  }

  
}
