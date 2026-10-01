import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarComponent } from './star/star.component';

const routes: Routes = [
  {
    path: '',
    component: StarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }