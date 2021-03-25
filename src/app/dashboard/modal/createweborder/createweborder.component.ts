import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-createweborder',
  templateUrl: './createweborder.component.html',
  styleUrls: ['./createweborder.component.scss']
})
export class CreateweborderComponent implements OnInit {

  createOrderForm: FormGroup;

  constructor(public modal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createOrderForm = this.fb.group({
      webOrderNumber: ['', Validators.required],
      accountId: ['', Validators.required],
      country: ['', Validators.required],
      storeFrontAlias: ['', Validators.required],
      parts: ['', Validators.required],
      carrier: ['', Validators.required],
      deliveryMethod: ['', Validators.required],
      inductionStatus: ['', Validators.required],
      orderStatus: ['', Validators.required],
      orderType: ['', Validators.required],
      paymentType: ['', Validators.required],
      keywords: ['', Validators.required]
     });
     
    this.createOrderForm.patchValue({
      webOrderNumber: 'W108390232',
      accountId: 'nepolian@apple.com',
      country: 'India',
      storeFrontAlias: 'IN',
      parts: 'MSXAPA/B',
      carrier: 'ICARUS',
      deliveryMethod: 'STH',
      inductionStatus: 'INDUCTED',
      orderStatus: 'PROCESSING',
      orderType: 'STH',
      paymentType: 'VISA',
      keywords: 'WEBORDER2'
    });
  }

  onSubmit() {
    this.modal.close(this.createOrderForm.getRawValue());
    console.log("res:", this.createOrderForm.getRawValue());
  }
}
