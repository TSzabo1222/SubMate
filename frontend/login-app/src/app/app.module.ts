import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import{MatInputModule} from '@angular/material/input';
import{MatSelectModule} from '@angular/material/select';
import{MatCardModule} from '@angular/material/card';
import{MatRadioModule} from '@angular/material/radio';
import{MatCheckboxModule} from '@angular/material/checkbox';
import{MatTableModule} from '@angular/material/table';
import{MatPaginatorModule} from '@angular/material/paginator';
import{MatSortModule} from '@angular/material/sort';
import{MatDialogModule} from '@angular/material/dialog';
import{ReactiveFormsModule} from '@angular/forms';
import{provideHttpClient} from '@angular/common/http';
import{ToastrModule} from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { MatButtonModule } from '@angular/material/button'; 
import{MatIconModule} from '@angular/material/icon';
import { ServicesComponent } from './services/services.component';
import { UpdatepoopupservicesComponent } from './updatepoopupservices/updatepoopupservices.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ServicecardsComponent } from './servicecards/servicecards.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserlistingComponent,
    UpdatepopupComponent,
    ServicesComponent,
    UpdatepoopupservicesComponent,
    ServicecardsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatInput,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
