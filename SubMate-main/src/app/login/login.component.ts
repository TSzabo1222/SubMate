import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm:FormGroup;
  hidePassword: boolean = true;
  userdata:any;

  constructor(
      private _fb: FormBuilder,
      private service: AuthService,
      private router: Router,
      private toastr: ToastrService) {
        this.loginForm=this._fb.group({
           userName: ['', [Validators.required]],
           password: ['', [Validators.required]]
        })
        sessionStorage.clear();
      }

  proceedLogin() {
    /*if (this.loginForm.valid) {
      this.service.proceedRegister(this.loginForm.value).subscribe((res) => {
        this.toastr.success('Please contact admin for enable access.','Registered successfully')
        this.router.navigate(['login'])
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }*/
        
   this.service.getById(this.loginForm.value.userName).subscribe({
    
    next:(res)=>{
        this.userdata=res;
        console.log(this.userdata[0].pw);
        console.log(this.userdata[0].pw===this.loginForm.value.password);
        console.log(this.userdata[0].isactive);
        if (this.userdata[0].pw===this.loginForm.value.password){
          if(this.userdata[0].isactive){
            sessionStorage.setItem('userName',this.userdata[0].id);
            sessionStorage.setItem('userRole',this.userdata[0].u_role);
            this.router.navigate(['']);
          } else {
            this.toastr.warning('Kérjük, lépjen kapcsolatba az adminnal!', 'Inaktív felhasználó')
          }
          //console.log("ok");
        } else {
          this.toastr.error('Érvénytelen bejelentkezési adatok');
          //console.log("nem ok");
        }
    }
   })
  }
    
}
