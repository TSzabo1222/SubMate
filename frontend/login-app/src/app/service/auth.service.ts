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


deleteService(id: number) {
  return this._http.delete(`http://localhost:3000/subscription/${id}`);
}

updateService(id: number, data: any) {
  return this._http.put(`http://localhost:3000/subscription/${id}`, data);
}

addService(data: any) {
  return this._http.post(`http://localhost:3000/subscription`, data);
}


getServices() {
  return this._http.get<any[]>('http://localhost:3000/supscriptions');
}

//EGY elem lekérése (opcionális)
getService(id: number) {
  return this._http.get('http://localhost:3000/subscriptions/' + id);
}





// getAllCat(){
//   return this._http.get('http://localhost:3000/subscriptions');
// }

  getAllRole(){
    return this._http.get('http://localhost:3000/roles');
  }

  
 
   
  

  
 getAllCat() {
  // visszaadja az összes szolgáltatást a backendből
  return this._http.get<any[]>('http://localhost:3000/subscriptions-with-category');
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
