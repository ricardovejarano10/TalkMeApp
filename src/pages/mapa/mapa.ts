import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GeoProvider } from '../../providers/geo/geo';
import { Perfil } from '../../models/perfil';
import { PerfilPage } from '../perfil/perfil';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ModalPerfilPage } from '../modal-perfil/modal-perfil';


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
 

  lat: number;
  lng:number;
  zoom:number = 16;
  markers:any;
  title: string = 'Habla con alguien';

  constructor(private fire: AngularFireAuth,
    public zone: NgZone,
    private afDatabase: AngularFireDatabase,
    private geo: GeoProvider,public navCtrl: NavController, 
    public navParams: NavParams,
    private modal:ModalController) {

    }



  public ngOnInit(){
     this.fire.authState.take(1).subscribe(data => {
      this.perfilDatos = this.afDatabase.object(`perfil/${data.uid}`)
      this.firestore.ref().child(`image/${data.uid}`).getDownloadURL().then((url) =>{
        this.zone.run(() => {
          this.imgsource = url;
        })
      })
    })

    this.getUserLocation();
    this.geo.hits.subscribe(hits =>
      this.markers = hits)
    //  var keyUsuario = firebase.auth().currentUser.uid;
    
  }
  refresh(){
    this.ngOnInit();
  }


  
  private getUserLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.geo.getLocation(40, [this.lat, this.lng])

        this.fire.authState.take(1).subscribe(data => {
          this.geo.setLocation(data.uid, [this.lat, this.lng]);
        })
      });

    }

  }

  abrirModalPerfil(key: string){
    var nombre: any = firebase.database().ref('/perfil/' + key).once('value').then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().nickname) || 'Anonymous';
      var nombreDeAmigos = username;
      console.log("El nombre de usuario es: " + nombreDeAmigos);

    });
  
    const myModal = this.modal.create('ModalPerfilPage',{key:key});
    myModal.present();
  }
  


}

