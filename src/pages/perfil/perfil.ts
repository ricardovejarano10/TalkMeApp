import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from '../../models/perfil';
import { HomePage } from '../home/home';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';
import { LocalNotifications } from '@ionic-native/local-notifications';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  perfil = {} as Perfil;
  nativepath: any;
  firestore = firebase.storage();
  perfilDatos: FirebaseObjectObservable<Perfil>
  estadoPerfil: FirebaseObjectObservable<Perfil[]>;
  estado: Perfil[] ;

  constructor(private fire: AngularFireAuth , private localNotifications: LocalNotifications,
    public alertCtrl: AlertController ,
    public loadingCtrl: LoadingController,
    public fch: FileChooser,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.fire.authState.take(1).subscribe(data => {
      this.perfilDatos = this.afDatabase.object(`perfil/${data.uid}`)
    })

  }

  store(){
    this.fch.open().then((url) => {
      (<any>window).FilePath.resolveNativePath(url, (result) =>{
        this.nativepath = result;
        this.uploadimage();
      })
    })
  }

  uploadimage(){
    (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
      res.file((resFile) => {
        var reader = new FileReader();
        reader.readAsArrayBuffer(resFile);
        reader.onloadend = (evt: any) => {
          var imgBlob = new Blob([evt.target.result], {type: 'image/jpeg'});

          this.fire.authState.subscribe(auth => {
            var imageStore = this.firestore.ref().child(`image/${auth.uid}`);
          
          let loader = this.loadingCtrl.create({
              content: 'Cargando imagen...',
            });
          loader.present();  
          imageStore.put(imgBlob).then((res) => {
            loader.dismiss();
            const alert = this.alertCtrl.create({
              title: 'Imagen cargada',
              subTitle: 'Actualice su perfil',
              
            });
            alert.present();

          }).catch((err) => {
            const alert = this.alertCtrl.create({
              title: 'Carga fallida',
              subTitle:'Motivo: ' + err,
              
            });
            alert.present();
          })
          })
        }
      })
    })
  }

  crearPerfil(){
    this.fire.authState.take(1).subscribe(auth => {
      const alert = this.alertCtrl.create({
        title: 'Información Actualizada',
               
      });
      this.afDatabase.object(`perfil/${auth.uid}`).set(this.perfil)
      .then(() => this.navCtrl.setRoot(HomePage, {key:auth.uid}));
                  alert.present();  
    })

    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification'
    });
    

  }
}
