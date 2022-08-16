import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AuthService } from './core/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { ErrorDialogService } from './core/services/error-dialog.service';
import { ErrorDialogComponent } from './shared/components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [AppComponent, ErrorDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ErrorDialogService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
