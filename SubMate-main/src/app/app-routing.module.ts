import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { authGuard } from './guard/auth.guard';
import { ServicesComponent } from './services/services.component';
import { ServicecardsComponent } from './servicecards/servicecards.component';
import { AboutComponent } from './about/about.component';
import { EditServiceDialogComponent } from './edit-service-dialog/edit-service-dialog.component';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[authGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'user',component:UserlistingComponent},
  {path:'services',component:ServicesComponent},
  {path: 'servicecards', component:ServicecardsComponent},
  {path:'about',component:AboutComponent},
  {path:'servupdate',component:EditServiceDialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
