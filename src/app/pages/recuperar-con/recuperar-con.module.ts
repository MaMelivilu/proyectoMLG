import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarConPageRoutingModule } from './recuperar-con-routing.module';

import { RecuperarConPage } from './recuperar-con.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RecuperarConPageRoutingModule
  ],
  declarations: [RecuperarConPage]
})
export class RecuperarConPageModule {}
