import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { DashboardModule } from './dashboard/dashboard.module';
import { CommonItemModule } from './common-item/common-item.module';
import { RouterModule } from '@angular/router';
import { HttpinterceptorService } from './tokens/httpinterceptor.service';
// import { CookieModule } from 'ngx-cookie';
import { NgxCaptchaModule } from 'ngx-captcha';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LegalDocsModule } from './legal-docs/legal-docs.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    DashboardModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule,
    CommonItemModule,
    HttpClientModule,
    NgxCaptchaModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot(),
    LegalDocsModule,
    // CookieModule.forRoot(),
  ],
  providers: [
    BsModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorService,
      multi: true,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
