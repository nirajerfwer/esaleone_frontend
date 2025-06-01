import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';

export const thankyouGuardTsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isOrder = localStorage.getItem("OrderId");
  console.log("order is there",isOrder);
  if(isOrder){
    return true;
  }
  else{
    router.navigate(['/']);
    return false;
  }
};
