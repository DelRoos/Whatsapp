import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MbscModule } from '@mobiscroll/angular-lite';

import { GroupPage } from './group.page';

const routes: Routes = [
  {
    path: '',
    component: GroupPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MbscModule
  ],
  exports: [RouterModule],
})
export class GroupPageRoutingModule {}
