import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';

import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth.guard';
import { UserModule } from './user/user.module';
import { CalendarModule } from './calendar/calendar.module';
import { BudgetingModule } from './budgeting/budgeting.module';
import { LinkModule } from './link/link.module';
import { NotAuthGuard } from './not-auth.guard';
import { pathInterceptorProvider } from './path-interceptor.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    CalendarModule,
    BudgetingModule,
    LinkModule,
    FormsModule,
  ],
  providers: [
    AuthGuard,
    NotAuthGuard,
    pathInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
