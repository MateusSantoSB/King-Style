import { CanActivateFn } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const userguardGuard: CanActivateFn = (route, state) => {
  
  const token=localStorage.getItem('token')
  const router=inject(Router) 

  if(token!=null){
    const decoderJWT:any=jwtDecode(token)

  
  if(decoderJWT.role==="USER" || decoderJWT.role==="ADMIN"){
      return true
  }else{
    router.navigate(['/login'])
    return false
  }


}
  router.navigate(["/login"])
  return false


};
