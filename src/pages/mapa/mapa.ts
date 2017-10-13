import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, LoadingController } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GeoProvider } from '../../providers/geo/geo';
import { Perfil } from '../../models/perfil';
import { TutorialPage } from '../tutorial/tutorial';
import { PerfilPage } from '../perfil/perfil';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ModalPerfilPage } from '../modal-perfil/modal-perfil';
import { Storage } from '@ionic/storage';
import { TimerProvider } from '../../providers/timer/timer';

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  perfilDatos: FirebaseObjectObservable<Perfil>
  perfilAmigos: any;
  imgsource: any;
  firestore = firebase.storage();
  keyPropio: any;
  key2;
  lat: number;
  lng: number;
  zoom: number = 16;
  markers: any;
  markersGeo: any;
  title: string = 'Habla con alguien';
  tarea;
  a = 0;

  constructor(private fire: AngularFireAuth, public zone: NgZone, public storage: Storage,
    private afDatabase: AngularFireDatabase, private geo: GeoProvider, public navCtrl: NavController,
    public navParams: NavParams, private modal: ModalController, public loadingCtrl: LoadingController,
    public timer: TimerProvider, public event:Events) {
   
    //Se recupera la variable id de storage que contiene la UID del usuario actual
    this.storage.get("id").then(val => {
        this.key2 = val;
        console.log('la llave 2 en mapa es: '+ this.key2)
      })
      this.ngOnInit();
  }//Cierra el constructor



  public ngOnInit() {
    
    this.fire.authState.take(1).subscribe(data => {
      this.perfilDatos = this.afDatabase.object(`perfil/${data.uid}`)
      this.firestore.ref().child(`image/${data.uid}`).getDownloadURL().then((url) => {
        this.zone.run(() => {
          this.imgsource = url;
        })
      })
    })
   // this.markers = [];
    this.getUserLocation();
    
    this.geo.hits.subscribe(hits =>
      this.markers = hits)
      
  }//cierra la función ngOnInit


  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.geo.getLocation(40, [this.lat, this.lng])

        this.fire.authState.take(1).subscribe(data => {
          this.geo.setLocation(data.uid, [this.lat, this.lng]);
        })
      });
    }
  }//Cierra la función grtUserLocation


  abrirModalPerfil(key: string) {
    var nombre: any = firebase.database().ref('/perfil/' + key).once('value').then(function (snapshot) {
      var username = (snapshot.val() && snapshot.val().nickname) || 'Anonymous';
      var nombreDeAmigos = username;
      console.log("El nombre de usuario es: " + nombreDeAmigos);
    });
    const myModal = this.modal.create('ModalPerfilPage', { key: key });
    myModal.present();
  }//Cierra la función abrirModalPerfil

  tutorial(){
    this.navCtrl.push(TutorialPage);
  }

  recargar(){
    let loader = this.loadingCtrl.create({
      content: 'Cargando mapa...',
    });
    loader.present(); 
  //  history.go(0);
  this.getUserLocation();
  this.markers = null;
  this.geo.hits.subscribe(hits =>
    this.markers = hits)
    loader.dismiss();
    //window.location.reload();
    //this.markers = null;
    //this.ngOnInit();
  }



}//Cierra la clase MapaPage

