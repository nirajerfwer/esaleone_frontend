import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { checkoutGuardTsGuard } from './services/guard/checkout-guard.ts.guard';
import { thankyouGuardTsGuard } from './services/guard/thankyou-guard.ts.guard';

export const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
  },
  { path: 'checkout', component: CheckoutComponent,canActivate:[checkoutGuardTsGuard]},
  { path: 'thankyou', component: ThankyouComponent,canActivate:[thankyouGuardTsGuard] },
];
