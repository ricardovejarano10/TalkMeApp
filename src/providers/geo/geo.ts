import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import * as GeoFire from "geofire"
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GeoProvider {

  dbref:any;
  geoFire:any;

  hits = new BehaviorSubject([])


  constructor(private db: AngularFireDatabase) {
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
      
      var nombre = "prueba";

      var apellido = "Apellido";
      let hit = {
        location: location,
        distance: distance,
        key: key,
        nombre: nombre,
        apellido: apellido
      }

      let currentHints = this.hits.value
      currentHints.push(hit)
      this.hits.next(currentHints)
    })

  }


}
