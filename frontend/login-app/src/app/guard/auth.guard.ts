import { CanActivateFn, Router, RouterState} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route,state) => {
  const router = inject(Router);
  const service=inject(AuthService);
  const toast=inject(ToastrService);

  if(service.isLoggedIn()){
    if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu == 'user') {
          if (service.getUserRole() == 'admin') {
            return true;
          } else {
            router.navigate(['']);
              toast.warning('You dont have access.')
            return false;
          }
        }else{
          return true;
        }
      } else {
        return true;
      }
  } else {
    router.navigate(['login']);
    return false;
    //
  }
  
};
