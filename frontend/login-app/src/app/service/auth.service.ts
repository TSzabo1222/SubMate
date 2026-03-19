import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  apiUrl='http://localhost:3000/users';

  getAll(){
    return this._http.get(this.apiUrl);
  }
  
   getById(id:any){
     return this._http.get(this.apiUrl+'/'+id);
   }

  //getById(id: number) {
  //return this._http.get(`${this.apiUrl}/${id}`);
//}


  getAllRole(){
    return this._http.get('http://localhost:3000/roles');
  }

  proceedRegister(inputData:any){
    return this._http.post(this.apiUrl, inputData);
  }
  
  updateUser(id:any, inputData:any){
    return this._http.put(this.apiUrl+'/'+id, inputData);
  }

  isLoggedIn(){
    return sessionStorage.getItem('userName')!=null;
  }

  getUserRole(){
    return sessionStorage.getItem('userRole')!=null?sessionStorage.getItem('userRole')?.toString():'';
  }
}
