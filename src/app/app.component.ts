import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { GeolocationService } from 'src/app/services/geolocation.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    protected platform: Platform,
    private geolocation: Geolocation,
    private geolocationService: GeolocationService
  ) {
    this.platform.ready().then(async () => {
      this.getGeolocation();
    });
  }
  
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geolocationService.latitude = resp.coords.latitude;
      this.geolocationService.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // Puedes actualizar los datos en tiempo real si es necesario
    });
  }
}
