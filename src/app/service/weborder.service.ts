import { Injectable, PipeTransform } from '@angular/core';
import { ApiService } from '../client/api.service';

import { SharedService } from './shared.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { WebOrder } from '../model/web-order';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

interface SearchResult {
  orders: WebOrder[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  searchDate: Date;
}

function contains(order: WebOrder, term: string, pipe: PipeTransform) {
  return order.orderId != null && pipe.transform(order.orderId).includes(term)
    || order.webOrderNumber != null && order.webOrderNumber.toLowerCase().includes(term.toLowerCase())
    || order.accountId != null && order.accountId.toLowerCase().includes(term.toLowerCase())
    || order.storeAlias != null && order.storeAlias.toLowerCase().includes(term.toLowerCase())
    || order.country != null && order.country.toLowerCase().includes(term.toLowerCase())
    || order.inductionStatus != null && order.inductionStatus.toLowerCase().includes(term.toLowerCase())
    || order.orderStatus != null && order.orderStatus.toLowerCase().includes(term.toLowerCase())
    || order.orderType != null && order.orderType.toLowerCase().includes(term.toLowerCase())
    || order.parts != null && order.parts.toLowerCase().includes(term.toLowerCase())
    || order.carrier != null && order.carrier.toLowerCase().includes(term.toLowerCase())
    || order.paymentType != null && order.paymentType.toLowerCase().includes(term.toLowerCase())
    || order.keywords != null && order.keywords.toLowerCase().includes(term.toLowerCase());
}

function equals(order: WebOrder, searchDate: Date, datePipe: DatePipe) {
  return searchDate != null && order.created != null && datePipe.transform(searchDate, "yyyy-MM-dd") == datePipe.transform(order.created, "yyyy-MM-dd");
}


@Injectable({
  providedIn: 'root'
})
export class WeborderService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _searchDate$ = new Subject<void>();
  private _orders$ = new BehaviorSubject<WebOrder[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _webOrders: WebOrder[] = [];
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    searchDate: new Date()
  };

  constructor(private api: ApiService, private shared: SharedService, private pipe: DecimalPipe, private datePipe: DatePipe) { 
    this.shared.allOrders$.subscribe(resp => {this._webOrders = resp; this._search$.next()}, err => alert('Could you load web orders from server'));
    this.shared.createdOrder$.subscribe(order => { if(order != null) this._webOrders.push(order) }, err=> alert('Could not create web order from server')  )
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._orders$.next(result.orders);
      this._total$.next(result.total);
    });

    // Search by date
    this._searchDate$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._orders$.next(result.orders);
      this._total$.next(result.total);
    });
  }

  get orders$() {
    return this._orders$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get page() {
    return this._state.page;
  }

  get pageSize() {
    return this._state.pageSize;
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  get searchDate() {
    return this._state.searchDate;
  }

  set page(page: number) {
    this._set({page});
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  set searchTerm(searchTerm: string) {
    this._set({searchTerm});
  }

  set searchDate(searchDate: Date) {
    this._setDate({searchDate})
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _setDate(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._searchDate$.next();
  }

  private _search(): Observable<SearchResult> {
    // 1. filter
    let orders = this._webOrders.filter(order => contains(order, this.searchTerm, this.pipe));
    const total = orders.length;

    // 2. paginate
    orders = orders.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

    // set first element
    if(orders.length > 0) this.shared.selectedOrder = orders[0];

    return of({orders, total});
  }

  private _searchDate(): Observable<SearchResult> {
    // 1. filter
    let orders = this._webOrders.filter(order => equals(order, this.searchDate, this.datePipe));
    const total = orders.length;

    // 2. paginate
    orders = orders.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

    // set first element
    if(orders.length > 0) this.shared.selectedOrder = orders[0];

    return of({orders, total});
  }

}
