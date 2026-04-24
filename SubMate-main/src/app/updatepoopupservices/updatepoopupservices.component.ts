import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-updatepoopupservices',
  templateUrl: './updatepoopupservices.component.html'
})
export class UpdatepoopupservicesComponent implements OnInit {

  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdatepoopupservicesComponent>,
    private service: AuthService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      serv_name: new FormControl(this.data?.serv_name || ''),
      cat_id: new FormControl(this.data?.cat_id || ''),
      serv_start: new FormControl(this.data?.serv_start || ''),
      serv_end: new FormControl(this.data?.serv_end || ''),
      cost: new FormControl(this.data?.cost || 0),
      user_id: new FormControl(this.data?.user_id || 1)
    });
  }

 save() {
  const payload = this.form.value;

  if (this.data?.serv_id) {
    this.service.updateService(this.data.serv_id, payload)
      .subscribe(() => this.dialogRef.close(true));
  } else {
    this.service.addService(payload)
      .subscribe(() => this.dialogRef.close(true));
  }
}
  
}