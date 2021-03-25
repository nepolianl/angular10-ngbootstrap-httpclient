import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  closeResult = '';
  
  constructor(public shared: SharedService, public modalService: ModalService) { }

  ngOnInit(): void {
  }
}
