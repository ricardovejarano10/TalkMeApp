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

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  perfilDatos: FirebaseObjectObservable<Perfil> //Se cargan los datos de la persona en sesión
  imgsource: any; // URL de la imagen del usuario
  firestore = firebase.storage(); // Acceso al storage de firebase 
  key2; //  UID del usuario que está en sesión
  lat: number;  // Latitud del usuario que está en sesión
  lng: number;  // Longitud del usuario que está en sesión 
  zoom: number = 16;  // Valor por defecto del zoom cuando se inicializa el mapa
  markers = [];  // Se guardan las ubicaciones de los usuarios externos
  borrar = 0;  // Variable temporar para evaluar markers

  constructor(private fire: AngularFireAuth, public zone: NgZone, public storage: Storage,
    private afDatabase: AngularFireDatabase, private geo: GeoProvider, public navCtrl: NavController,
    public navParams: NavParams, private modal: ModalController, public loadingCtrl: LoadingController,
     public event: Events) {

    //Se recupera la variable id de storage que contiene la UID del usuario actual
    this.storage.get("id").then(val => {
      this.key2 = val;
    })
    this.ngOnInit();
  }//Cierra el constructor


  public ngOnInit() {
    //Con las siguientes lineas, obtenermos la url de descarga de la imagen de perfil
    this.fire.authState.take(1).subscribe(data => {
      this.perfilDatos = this.afDatabase.object(`perfil/${data.uid}`)
      this.firestore.ref().child(`image/${data.uid}`).getDownloadURL().then((url) => {
        this.zone.run(() => {
          this.imgsource = url;
        })
      })
    })//Cierra la función de URL de imagen

    //Se llama la función para obtener la ubicación del usuario
    this.getUserLocation();

    // Se obtienen todos los hits en la variable markers, markers que corresponden a las ubicaciones
    // distancias y llaves de los usuarios.
    this.geo.hits.subscribe(hits => {
      this.markers = hits;
      console.log(this.markers)
    })

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
    });
    const myModal = this.modal.create('ModalPerfilPage', { key: key });
    myModal.present();
  }//Cierra la función abrirModalPerfil

  tutorial() {
    this.navCtrl.push(TutorialPage);
  }

  recargar() {
    let loader = this.loadingCtrl.create({
      content: 'Recargando mapa...',
    });
    loader.present();
    // this.geo.hits.subscribe(hits =>
    // this.markers = [])
    //this.markers = [];
    history.go(0);
    //this.tam = this.markers.length;
    //this.getUserLocation();
    loader.dismiss();
    //window.location.reload();
    //history.go(0);
  }



}//Cierra la clase MapaPage

