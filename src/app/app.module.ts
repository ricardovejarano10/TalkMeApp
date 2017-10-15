import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
//============Importes para cargar imagen ====================//
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';


//============Importe de las paginas ========================//
import { ModalPerfilPage } from '../pages/modal-perfil/modal-perfil';
import { LoginPage } from '../pages/login/login';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ChatPage } from '../pages/chat/chat';
import { PerfilUsuarioPage } from '../pages/perfil-usuario/perfil-usuario';
import { TiendaPage } from '../pages/tienda/tienda';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { PerfilPage } from '../pages/perfil/perfil';
import { MapaPage } from '../pages/mapa/mapa';
import { HomePage } from '../pages/home/home';

//================Firebase=================================//
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//===============Mapa y geolocalización ==========================//
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';

//=================Providers====================================//
import { TiendaDataProvider } from '../providers/tienda-data/tienda-data';
import { GeoProvider } from '../providers/geo/geo';
import { DatosUsuarioProvider } from '../providers/datos-usuario/datos-usuario';


export const firebaseConfig = {
  apiKey: "AIzaSyDcfcEziwRVc99v-3JufSLhMYXnsummMeA",
  authDomain: "talkmeapp-59cd7.firebaseapp.com",
  databaseURL: "https://talkmeapp-59cd7.firebaseio.com",
  projectId: "talkmeapp-59cd7",
  storageBucket: "talkmeapp-59cd7.appspot.com",
  messagingSenderId: "547907949590"

};

@NgModule({
  declarations: [
    MyApp,
    PerfilPage,
    MapaPage,
    LoginPage,
    ChatPage,
    TiendaPage,
    PerfilUsuarioPage,
    FavoritosPage,
    TutorialPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    HttpModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCQ96bRQQ7XUw1fBBsc4ocQ3iUzXWzCKpI'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PerfilPage,
    MapaPage,
    LoginPage,
    ChatPage,
    TiendaPage,
    PerfilUsuarioPage,
    FavoritosPage,
    TutorialPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileChooser,
    Geolocation,
    FilePath,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeoProvider,
    TiendaDataProvider,
    DatosUsuarioProvider
  ]
})
export class AppModule {}
