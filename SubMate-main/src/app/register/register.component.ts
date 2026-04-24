import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  
  registerForm:FormGroup;
  hidePassword: boolean = true; 
  constructor(
    private _fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService) {

      this.registerForm = this._fb.group({
        id: ['', [Validators.required, Validators.minLength(5)]],
        u_name: [''],
        pw: ['', 
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,}$'
          ),
        ],
        ],
        email: ['', [Validators.required, Validators.email]],
        gender: ['male'],
        isactive: [false],
        u_role: ['']
        
      });
  }

  proceedRegistration() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.service.proceedRegister(this.registerForm.value).subscribe({
        next:() => {
        this.toastr.success('Please contact admin for enable access.','Registered successfully');
        this.router.navigate(['login']);
      },
      error: ()=> {
      this.toastr.warning('Please enter valid data.')
      }
    });
  }
  }



}
