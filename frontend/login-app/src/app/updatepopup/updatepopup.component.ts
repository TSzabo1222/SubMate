import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrl: './updatepopup.component.css'
})
export class UpdatepopupComponent implements OnInit {

  registerForm:FormGroup;
  rolelist:any; 
  constructor(private _fb: FormBuilder,
              private service:AuthService,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private toastr:ToastrService,
              private dialog:MatDialogRef<UpdatepopupComponent>
  ){

          this.registerForm = this._fb.group({
                  id: [''],
                  u_name: [''],
                  pw: [''],
                  email: [''],
                  gender: ['male'],
                  isactive: [false],
                  u_role: ['', [Validators.required]]
                });
    }
  
  UpdateUser(){
    if(this.registerForm.valid){
      console.log("hiba:",this.registerForm.value.id,this.registerForm.value,);
      console.log("id",this.registerForm.value.id);
      this.service.updateUser(this.registerForm.value.id,this.registerForm.value).subscribe({
        next: (res)=>{
          this.toastr.success('Sikeres frissítés.');
          this.dialog.close();
        }
      })
    } else {
      this.toastr.warning('Kérem válasszon jogosultságot.')
    }
  }

  editdata:any;
  ngOnInit(): void {
    this.service.getAllRole().subscribe({
      
      next: (res)=>{
        console.log("rl",res);
        this.rolelist=res;
        if(this.data.usercode!=null && this.data.usercode!=''){
          this.service.getById(this.data.usercode).subscribe({
            next: (res)=>{
              this.editdata=res;
              console.log("aa1",res);
              console.log("isa",this.editdata[0].id);
              this.registerForm.setValue({
                id:this.editdata[0].id,
                u_name:this.editdata[0].u_name,
                email:this.editdata[0].email,
                pw:this.editdata[0].pw,
                u_role:this.editdata[0].u_role,
                gender:this.editdata[0].gender,
                isactive:this.editdata[0].isactive == 1 || this.editdata[0].isactive === true
                //user_id:this.editdata.user_id
              })
            }
          })
        }
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}
