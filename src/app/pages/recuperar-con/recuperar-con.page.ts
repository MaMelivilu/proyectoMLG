import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-con',
  templateUrl: './recuperar-con.page.html',
  styleUrls: ['./recuperar-con.page.scss'],
})
export class RecuperarConPage implements OnInit {

  formRecuperarCon: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {
      this.formRecuperarCon = this.fb.group({
        'usuario': new FormControl("",Validators.required),
        'correo': new FormControl("",Validators.required)
      });
     }

  ngOnInit() {
    
  }

  async validar(){
    var f = this.formRecuperarCon.value;
    var usuario = JSON.parse(localStorage.getItem('usuario')!);

    if (f.usuario !== usuario.usuario) {
      const alert = await this.alertController.create({
        header: 'Usuario no Registrado',
        message: 'Asegurece de escribir bien el usuario',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
      
    }else{
      const alert = await this.alertController.create({
        header: 'Contraseña recuperada',
        message: 'Su contraseña es: '+usuario.password,
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
      
    }
  }

}
