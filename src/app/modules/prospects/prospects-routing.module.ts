import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProspectComponent } from './pages/add-prospect/add-prospect.component';
import { SearchProspectComponent } from './pages/search-prospect/search-prospect.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: 'search-prospect',
        component: SearchProspectComponent
      },
      {
        path: 'search-prospect/:last_name',
        component: SearchProspectComponent
      },
      {
        path: 'search-prospect/:ins/:group_number',
        component: SearchProspectComponent
      },
      {
        path: 'add-prospect',
        component: AddProspectComponent
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProspectsRoutingModule { }
