import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MapaPage } from '../mapa/mapa';


@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

  slides = [
    {
      title: "Demos una vuelta por TalkMe",
      description: "En el mapa encontrarás a personas que estén cerca tuyo",
      image: "assets/img/marcador.png",
    },
    {
      title: "Edita tu perfil",
      description: "En el menu lateral, entra a la opción perfil => edita perfil y llena tus datos ... No olvides una buena foto",
      image: "assets/img/perfilSlide.png",
    },
    {
      title: "Cómo sé quien es cada quien?",
      description: "<b>Un toque</b> en cualquier marcador rojo del mapa basta para que conozcas el perfil de cualquier persona",
      image: "assets/img/mano.png",
    }
  ];

  omitir(){
   this.navCtrl.pop();
  }

}
