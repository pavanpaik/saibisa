import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { FirebaseHomeComponent } from './firebase-home/firebase-home.component';
import { FirebaseLoginComponent } from './firebase-login/firebase-login.component';
import { FirebaseSignUpComponent } from './firebase-sign-up/firebase-sign-up.component';
import { FirebaseResetPasswordComponent } from './firebase-reset-password/firebase-reset-password.component';

@NgModule({
  declarations: [
    FirebaseHomeComponent,
    FirebaseLoginComponent,
    FirebaseSignUpComponent,
    FirebaseResetPasswordComponent
  ],
  imports: [
  	CommonModule,
  	SharedModule,
  ],
  exports: [
    FirebaseHomeComponent,
    FirebaseLoginComponent,
    FirebaseSignUpComponent,
    FirebaseResetPasswordComponent
  ],
  entryComponents:[
    FirebaseHomeComponent,
    FirebaseLoginComponent,
    FirebaseSignUpComponent,
    FirebaseResetPasswordComponent
  ]
})
export class FirebaseModule {}
