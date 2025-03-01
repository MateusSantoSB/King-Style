import { CanActivateFn } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


export const authenticationGuard: CanActivateFn = (route, state) => {
    

    const token=localStorage.getItem('token')
    const decoderJWT:any=jwtDecode(token)
    const router=inject(Router)
    if(decoderJWT.role==="ADMIN"){
      
      return true
    }else{
      router.navigate(["/login"])
      return false
    }
  
 

};
