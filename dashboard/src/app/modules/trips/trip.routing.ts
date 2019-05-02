import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripListPageComponent } from './pages/list/component';

const routes: Routes = [
  {
    path: '',
    component: TripListPageComponent,
    data: { groups: ['aom', 'registry'] },
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class TripRoutingModule { }
