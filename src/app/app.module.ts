import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './navigation/filter/filter.component';
import { UserListsComponent } from './user-lists/user-lists.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

// services
import { UserListsService } from './user-lists/user-lists.service';
import { FilterService } from './navigation/filter/filter.service';
import { UserProfileService } from './user-profile/user-profile.service';
import { AppHttpClient } from './_services/http-client';
import { PageStatusService } from './_services/page-status';
import { FilterStatusService } from './_services/filter-status';
import { Ng2CarouselamosModule } from './ng2-carouselamos';
import { CategoryComponent } from './user-profile/category/category.component';
import { CloseButtonComponent } from './user-profile/category/close-button/close-button.component';

import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    FilterComponent,
    UserListsComponent,
    UserProfileComponent,
    CategoryComponent,
    CloseButtonComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2CarouselamosModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
    AppHttpClient,
    UserListsService,
    FilterService,
    UserProfileService,
    PageStatusService,
    FilterStatusService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
