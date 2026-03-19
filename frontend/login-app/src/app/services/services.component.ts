import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepoopupservicesComponent } from '../updatepoopupservices/updatepoopupservices.component';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  constructor(private dialog:MatDialog){}

  categories: Food[] = [
    {value: '0', viewValue: 'Szórakozás'},
    {value: '1', viewValue: 'Szoftver'},
    {value: '2', viewValue: 'Egészség'},
    {value: '3', viewValue: 'Ősszes'}
  ];

    Teszt(){
        const popup=this.dialog.open(UpdatepoopupservicesComponent,{
          enterAnimationDuration:'1000ms',
          exitAnimationDuration:'500ms',
          width:'50%',
          data:{
            //usercode:code
          }
        })
        popup.afterClosed().subscribe({
          next:(res)=>{
            //this.loadUser();
          }
        })
      }
      opendialog(){
        //this.loadUser();
      }
}
