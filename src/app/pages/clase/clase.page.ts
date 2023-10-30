import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Geolocation } from '@capacitor/geolocation';



@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {
  public latitude: number = 0;
  public longitude: number = 0;
  infoClase:any='';
  nombreAlumno:any;
  rutAlumno:any;
  comunaAlumno:any;
  imageUrl: any;
  

  constructor(public navCtrl: NavController,private geolocationService: GeolocationService ) { }

  async ngOnInit() {
    Geolocation.requestPermissions();
    this.latitude = this.geolocationService.latitude;
    this.longitude = this.geolocationService.longitude;

    Camera.requestPermissions();

    var clase = JSON.parse(localStorage.getItem('clase')!);
    this.infoClase = clase;

    var alumno = JSON.parse(localStorage.getItem('usuario')!);
    this.nombreAlumno = alumno.nombre;
    this.rutAlumno = alumno.rut;
    this.comunaAlumno = alumno.comuna;

    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    
    
  }

  async tomarFoto(){
      
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
    
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      const imageUrl = image.webPath;
    
      // Can be set to the src of an image now
      //imageElement.src = imageUrl;
      this.imageUrl = imageUrl
      console.log(this.imageUrl)
      
    
  }

  async guardarAsistencia(){

    await Preferences.set({
      key: 'infoClase',
      value: this.infoClase,
    });

    const alumno = JSON.stringify({
      nombre: this.nombreAlumno,
      rut: this.rutAlumno,
      comunaAlumno: this.comunaAlumno,
      img: this.imageUrl,
      geolocation:this.latitude+' '+this.longitude
    })

    await Preferences.set({
      key:'alumno',
      value:alumno
    })

  
      const alumnoRet = await Preferences.get({ key: 'alumno' });
      console.log(alumnoRet);
      const claseRet = await Preferences.get({ key: 'infoClase' });
      console.log(claseRet);
    
      

    
  }
  
  
  

  cerrarSesion(){
    localStorage.removeItem('ingresado');
    this.navCtrl.navigateRoot('login');

  }



}
