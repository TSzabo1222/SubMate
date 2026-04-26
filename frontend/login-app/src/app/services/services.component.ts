import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { UpdatepoopupservicesComponent } from '../updatepoopupservices/updatepoopupservices.component';
import { EditServiceDialogComponent } from '../edit-service-dialog/edit-service-dialog.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services: any[] = [];
  filteredServices: any[] = [];

  categories = [
    { value: '0', viewValue: 'Szórakozás' },
    { value: '1', viewValue: 'Szoftver' },
    { value: '2', viewValue: 'Egészség' },
    { value: '3', viewValue: 'Összes' }
  ];

  constructor(
    private dialog: MatDialog,
    private service: AuthService
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.service.getAllCat().subscribe((data: any) => {
      this.services = data ?? [];
      this.filteredServices = [...this.services];
    });
  }

  filterByCategory(catValue: string) {

  const selectedCategory = this.categories.find(c => c.value === catValue)?.viewValue;

  if (!selectedCategory || selectedCategory === 'Összes') {
    this.filteredServices = [...this.services];
    return;
  }

  this.filteredServices = this.services.filter(s =>
    s.cat_name === selectedCategory
  );

  }

  add() {
    this.dialog.open(UpdatepoopupservicesComponent, {
      width: '50%',
      data: {}
    }).afterClosed().subscribe(res => {
      if (res) this.loadServices();
    });
  }

  edit(serv: any) {
    this.dialog.open(EditServiceDialogComponent, {
      width: '50%',
      data: serv
    }).afterClosed().subscribe(res => {
      if (res) this.loadServices();
    });
  }

  delete(serv: any) {
    if (!serv?.serv_id) return;

    if (confirm('Biztos törölni akarod?')) {
      this.service.deleteService(serv.serv_id)
        .subscribe(() => {
          this.loadServices();
        });
    }
  }
}