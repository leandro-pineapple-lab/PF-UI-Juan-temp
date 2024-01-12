import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { UserService } from './services/user/user.service';
import { DatePipe } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { CanSaveSettingsDirective } from './directives/user/can-save-settings.directive';
import { OrderByDirective } from './directives/paging/order-by.directive';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './modules/auth/pages/login-page/login-page.component';
import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    CanSaveSettingsDirective,
    OrderByDirective,
    LoginPageComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    DatePipe,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
