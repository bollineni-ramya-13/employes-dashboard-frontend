import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ForgetPasswordPageComponent } from './forget-password-page/forget-password-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    HomePageComponent,
    ForgetPasswordPageComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
