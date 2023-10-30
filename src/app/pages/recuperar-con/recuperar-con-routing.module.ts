import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarConPage } from './recuperar-con.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarConPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarConPageRoutingModule {}
