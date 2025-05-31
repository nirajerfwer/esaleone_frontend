import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpclient:HttpClient) { }

  getorderdetails(orderId:any){
    return this.httpclient.get(environment.backendUrl + "/order" + "/" + orderId);
  }

}
