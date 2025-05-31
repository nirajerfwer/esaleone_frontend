import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsServicesTsService {
  constructor(private httpclient:HttpClient) { }

  getproduct() {
   return this.httpclient.get(environment.backendUrl+"/product");
  }
  getproductid(id:any){
    return this.httpclient.get(environment.backendUrl+"/product"+"/"+id);
  }
  // updateproductQuantityid(product:any){
  //   const id = product.ProductId;
  //   const quantity = product.quantity;
  //   const formdata = new FormData;
  //   formdata.append("quantitys",quantity);
  //   return this.httpclient.patch(environment.backendUrl+"/product"+"/"+id,formdata);
  // }


}
