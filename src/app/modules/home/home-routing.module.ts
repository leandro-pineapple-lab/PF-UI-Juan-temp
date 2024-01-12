import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'prospects',
    loadChildren: () => import("../prospects/prospects.module").then(m => m.ProspectsModule)
  },
  {
    path: 'settings',
    loadChildren: () => import("../settings/settings.module").then(m => m.SettingsModule)
  },
  {
    path: 'reports',
    loadChildren: () => import("../reports/reports.module").then(m => m.ReportsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
