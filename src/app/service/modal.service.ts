import { Injectable, Type } from '@angular/core';

import { CreateweborderComponent } from '../dashboard/modal/createweborder/createweborder.component';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WeborderClientService } from '../client/weborder-client.service';

const MODALS: {[name: string]: Type<any>} = {
  create_order_dialog : CreateweborderComponent
};

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private _modal: NgbModal, private webOrderClient: WeborderClientService) { }

  open(name: string, config?: any) {
    this._modal.open(MODALS[name], config).result.then((result) => {
      let closeResult = `Closed with: ${result}`;
      console.log(closeResult);
      this.webOrderClient.createWebOrder(result);
    }, (reason) => {
      let closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
