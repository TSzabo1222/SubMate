import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-edit-service-dialog',
  templateUrl: './edit-service-dialog.component.html'
})
export class EditServiceDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditServiceDialogComponent>,
    private service: AuthService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      cat_name: new FormControl(this.data?.cat_name),
      user_name: new FormControl(this.data?.user_name), // EZ MÁR MŰKÖDIK JOIN UTÁN
      cost: new FormControl(this.data?.cost),
      serv_start: new FormControl(this.data?.serv_start),
      serv_end: new FormControl(this.data?.serv_end),
      valid: new FormControl(this.data?.valid)
    });
  }

  save() {
    const payload = {
      serv_name: this.data?.serv_name,
      cat_id: this.data?.cat_id,
      serv_start: this.form.value.serv_start,
      serv_end: this.form.value.serv_end,
      cost: this.form.value.cost,
      user_id: this.data?.user_id
    };

    if (this.data?.serv_id) {
      this.service.updateService(this.data.serv_id, payload)
        .subscribe(() => this.dialogRef.close(true));
    } else {
      this.service.addService(payload)
        .subscribe(() => this.dialogRef.close(true));
    }
  }
}