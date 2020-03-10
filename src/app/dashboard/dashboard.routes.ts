import { Routes } from '@angular/router';
import { StadisticsComponent } from '../entry-egress/stadistics/stadistics.component';
import { EntryEgressComponent } from '../entry-egress/entry-egress.component';
import { DetailComponent } from '../entry-egress/detail/detail.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: StadisticsComponent,
  },
  {
    path: 'entry-egress',
    component: EntryEgressComponent
  },
  {
    path: 'detail',
    component: DetailComponent
  }
];
