import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  public latitude: number = 0; // Inicializa en algún valor predeterminado si es necesario
  public longitude: number = 0; // Inicializa en algún valor predeterminado si es necesario
}
