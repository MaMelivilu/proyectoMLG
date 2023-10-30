import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { HelperService } from 'src/app/services/helper.service';
import { LocationService } from 'src/app/services/location.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  regiones:Region[]=[];
  comunas:Comuna[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;
  seleccionComuna:boolean = true;

  region!:string;
  comuna!:string;
  

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    private helper:HelperService,
    private locationService:LocationService,
    public navCtrl: NavController) {
    this.formularioRegistro = this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'confirmarPassword': new FormControl("",Validators.required),
      'nombre': new FormControl("",Validators.required),
      'apellido': new FormControl("",Validators.required),
      'rut': new FormControl("",Validators.required)
    });
   }

  ngOnInit() {
    this.cargarRegion();
  }

  async cargarRegion(){
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
  }

  async cargarComuna(){
    this.seleccionComuna = false;
    const req = await this.locationService.getComuna(this.regionSel);
    this.comunas = req.data;
  }

   async guardar(){
    var f = this.formularioRegistro.value;
    const passwordControl = this.formularioRegistro.get('password');
    const confirmarPasswordControl = this.formularioRegistro.get('confirmarPassword');

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message: 'Rellene todos los datos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }else if(passwordControl && confirmarPasswordControl){
      if (passwordControl.value !== confirmarPasswordControl.value){
        const alert = await this.alertController.create({
          header: 'Contraseñas no Coinciden',
          message: 'Contranseña y confirmar contraseña deben ser iguales',
          buttons: ['Aceptar']
        });
  
        await alert.present();
        return;
      }
    }
    const comunaSeleccionada = this.comunas.find((comuna) => comuna.id === this.regionSel);
    const nombreComuna = comunaSeleccionada ? comunaSeleccionada.nombre : null;
    

    var usuario = {
      usuario: f.usuario,
      password: f.password,
      nombre: f.nombre +' '+ f.apellido,
      rut: f.rut,
      comuna: nombreComuna

    }

    localStorage.setItem('usuario',JSON.stringify(usuario));

    this.navCtrl.navigateRoot('login');

  }

}
