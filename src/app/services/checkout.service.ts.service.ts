import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceTsService {

  constructor(private httpclient:HttpClient) { }

  addCheckout(data:any,checkoutproduct:any,totalPrice:any,subtotal:any,tax:any){
      const product = {
        ProductId: checkoutproduct.ProductId,
        title: checkoutproduct.title,
        price: checkoutproduct.price,
        quantity: checkoutproduct.quantity,
        color: checkoutproduct.color,
        size: checkoutproduct.size,
      };
      // Submit to backend
      const formData = new FormData();
      formData.append('fullName', data.firstName + ' ' + data.lastName);
      formData.append('email', data.email);
      formData.append('phoneNumber', data.phone);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('zipCode', data.zipcode);
      formData.append('card', data.cardNumber);
      formData.append('cardExpiry', data.expiryDate);
      formData.append('cvvHash', data.cvv);
      formData.append('products', JSON.stringify(product));
      formData.append('totalprice', totalPrice);
      formData.append('subtotal', subtotal);
      formData.append('tax', tax);


      return this.httpclient.post(environment.backendUrl+"/checkout",formData);
  }



}
