import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrl: './userlisting.component.css'
})
export class UserlistingComponent {
  constructor(private service:AuthService, private dialog:MatDialog){
    
    this.loadUser();
  }
  displayedColumns: string[] = ['id', 'u_name', 'email','u_role', 'status','action'];
  userlist:any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  loadUser(){
    this.service.getAll().subscribe({
      next: (res)=>{
        console.log("UserList",res);
        this.userlist=res;
        this.dataSource=new MatTableDataSource(this.userlist);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }
  UpdateUser(code:any){
     console.log("usercode",code);
    const popup=this.dialog.open(UpdatepopupComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'500ms',
      width:'50%',
      data:{
        usercode:code
      }
    })
    popup.afterClosed().subscribe({
      next:(res)=>{
        this.loadUser();
      }
    })
  }
  opendialog(){
    //this.loadUser();
  }
}
