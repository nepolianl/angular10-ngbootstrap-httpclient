import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { WebOrder } from 'src/app/model/web-order';
import { SharedService } from 'src/app/service/shared.service';
import { WeborderService } from 'src/app/service/weborder.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  orders$: Observable<WebOrder[]>;
  total$: Observable<number>;
  selectedOrder$: Observable<WebOrder>;

  constructor(public service: WeborderService, public shared: SharedService) { 
    this.orders$ = service.orders$;
    this.total$ = service.total$;
    this.selectedOrder$ = shared.selectedOrder$;
  }

  ngOnInit(): void {
  }

  onCreatedDateSelection(createdAt: NgbDate) {
    this.service.searchDate = new Date(createdAt.year, createdAt.month -1, createdAt.day);
  }

}
