import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment as env } from 'src/environments/environment';
import { SharedService } from '../service/shared.service';
import { WebOrder } from '../model/web-order';

const GET_ALL_WEBORDERS_API = env.SERVER_URL + env.GET_ORDERS_API;
const CREATE_WEBORDER_API = env.SERVER_URL + env.CREATE_ORDER_API;

@Injectable({
  providedIn: 'root'
})
export class WeborderClientService {

  constructor(private api: ApiService, private shared: SharedService) {
    this.loadWebOrders();
  }

  private loadWebOrders() {
    this.api.get(GET_ALL_WEBORDERS_API, {}).subscribe(
      resp => this.shared.allOrders = resp,
      err => {
        console.log(err);
        alert("Failed to load web orders from api: " + GET_ALL_WEBORDERS_API);
      }
    );
  }

  createWebOrder(_webOrder: WebOrder) {
    this.api.post(CREATE_WEBORDER_API, _webOrder).subscribe(
      createdOrder => {
        this.shared.createdOrder = createdOrder;
        alert('Created Web order successfully!!');
      },
      err => {
        console.log(err),
        alert('Failed to create web order from api: ' + CREATE_WEBORDER_API);
      }
    );
  }
}
