import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordPageComponent } from './forget-password-page/forget-password-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

const routes: Routes = [
  {
    path:"",
    component:LoginPageComponent
  },
  {
    path:"login-page",
    component:LoginPageComponent
  },
  {
    path:"registration-page",
    component:RegistrationPageComponent
  },
  {
    path:"home-page",
    component:HomePageComponent
  },
  {
    path:"profile-page",
    component:ProfilePageComponent
  },
  {
    path:"forget-password-page",
    component:ForgetPasswordPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
