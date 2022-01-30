import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoldingsComponent } from './holdings.component';

const routes: Routes = [{ path: '', component: HoldingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HoldingsRoutingModule {}
