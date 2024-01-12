import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProspectsRoutingModule } from './prospects-routing.module';
import { SearchProspectComponent } from './pages/search-prospect/search-prospect.component';
import { AddProspectComponent } from './pages/add-prospect/add-prospect.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SearchProspectComponent,
    AddProspectComponent
  ],
  imports: [
    CommonModule,
    ProspectsRoutingModule,
    SharedModule
  ]
})
export class ProspectsModule { }
