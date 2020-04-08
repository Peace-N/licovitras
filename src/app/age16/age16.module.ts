import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Age16PageRoutingModule } from './age16-routing.module';

import { Age16Page } from './age16.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Age16PageRoutingModule
  ],
  declarations: [Age16Page]
})
export class Age16PageModule {}
