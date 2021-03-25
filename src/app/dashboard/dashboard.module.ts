import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateweborderComponent } from './modal/createweborder/createweborder.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, ListComponent, DetailComponent, CreateweborderComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule, NgbModule, FormsModule, ReactiveFormsModule
  ]
})
export class DashboardModule { }
