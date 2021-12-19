import { MatButtonModule } from '@angular/material/button';
import { ManageHoldingsComponent } from './components/manage-holdings/manage-holdings.component';
import { HoldingsTableComponent } from './components/holdings-table/holdings-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HoldingsRoutingModule } from './holdings-routing.module';
import { HoldingsComponent } from './holdings.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HoldingsComponent,
    HoldingsTableComponent,
    ManageHoldingsComponent
  ],
  imports: [
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    CommonModule,
    HoldingsRoutingModule
  ]
})
export class HoldingsModule { }
