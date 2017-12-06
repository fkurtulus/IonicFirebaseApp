import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordRestartPage } from './password-restart';

@NgModule({
  declarations: [
    PasswordRestartPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordRestartPage),
  ],
})
export class PasswordRestartPageModule {}
