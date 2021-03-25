import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebOrder } from '../model/web-order';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _selectedOrder$ = new BehaviorSubject(undefined);
  private _allOrders$ = new BehaviorSubject<any>({});
  private _createdOrder$ = new BehaviorSubject<WebOrder>(null);

  constructor() { }

  get selectedOrder$() {
    return this._selectedOrder$.asObservable();
  }

  get allOrders$() {
    return this._allOrders$.asObservable();
  }

  get createdOrder$() {
    return this._createdOrder$.asObservable();
  }

  set selectedOrder(selected: any) {
    this._selectedOrder$.next(selected);
  }

  set allOrders(allOrders: any) {
    this._allOrders$.next(allOrders);
  }

  set createdOrder(_webOrder: WebOrder) {
    this._createdOrder$.next(_webOrder);
  }
}
