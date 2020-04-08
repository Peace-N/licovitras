import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Age16Page } from './age16.page';

const routes: Routes = [
  {
    path: '',
    component: Age16Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Age16PageRoutingModule {}
