import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { UpdatepoopupservicesComponent } from '../updatepoopupservices/updatepoopupservices.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services: any[] = [];

  categories = [
    { value: 0, viewValue: 'Szórakozás' },
    { value: 1, viewValue: 'Szoftver' },
    { value: 2, viewValue: 'Egészség' },
    { value: 3, viewValue: 'Összes' }
  ];

  constructor(
    private dialog: MatDialog,
    private service: AuthService
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.service.getAllCat().subscribe((data: any) => {
      this.services = data;
    });
  }

  Teszt() {
    const popup = this.dialog.open(UpdatepoopupservicesComponent, {
      width: '50%',
      data: null   // <-- CREATE
    });

    popup.afterClosed().subscribe(res => {
      if (res) this.loadServices();
    });
  }

  editDialog(serv: any) {
    const popup = this.dialog.open(UpdatepoopupservicesComponent, {
      width: '50%',
      data: serv   // <-- EDIT
    });

    popup.afterClosed().subscribe(res => {
      if (res) this.loadServices();
    });
  }
}