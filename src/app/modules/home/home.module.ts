import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeRoutingModule } from './home-routing.module';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    AuthGuard,
    NgbActiveModal
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
