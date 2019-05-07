import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesMessages } from './services/service-mensagem';
import { NotificationsService } from './services/notificacao-mensagem';
import { LoadingService } from './services/loading-service';
import { ConfirmationService, CalendarModule, AutoCompleteModule, DropdownModule, DialogModule, ConfirmDialogModule, GrowlModule } from 'primeng/primeng';
import { NotificationsComponent } from './services/notifications-component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    AppComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    HttpClientModule,
    GrowlModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    AutoCompleteModule,
    CalendarModule
  ],
  providers: [
    ServicesMessages,
    ConfirmationService,
    NotificationsService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
