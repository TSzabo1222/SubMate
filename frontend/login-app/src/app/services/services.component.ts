import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepoopupservicesComponent } from '../updatepoopupservices/updatepoopupservices.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {

  title = 'kartya-app';
  // category: any;
 
  services: any[] = [];

  constructor(private dialog:MatDialog, private http:HttpClient, private service:AuthService){}

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


    

     
      // ngOnInit(): void {
        
      //   this.service.getAllCat().subscribe({
          
      //      next:(data)=>{
      //       this.category=data;
      //       console.log(data);
            
      //      }
      //   })

        ngOnInit(): void {
    this.service.getAllCat().subscribe({
      next: (data: any[]) => {
        this.services = data; // ide kerül a backendből jövő összes adat
        console.log(this.services);
      },
      error: (err) => console.error(err)
    });

    }
}


