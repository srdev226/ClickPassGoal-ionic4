import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { PageStatusService } from './_services/page-status';
import { FilterStatusService } from './_services/filter-status';

import { FilterForm } from './_json/filter';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    trigger('Animation1', [
      transition('* => *', group([

        query(
          ':leave',
          [style({ 'margin-top': '0%' }), animate('0.3s', style({ 'margin-top': '100%' }))],
          { optional: true }
        ),
        query(
          ':enter',
          [style({ 'margin-top': '-100%' }), animate('0.3s', style({ 'margin-top': '0%' }))],
          { optional: true }
        ),
      ])),
    ]),
    trigger('Animation2', [
      transition('* => *', group([

        query(
          ':leave',
          [style({ 'opacity': '1' }), animate('0.3s', style({ 'opacity': '0' }))],
          { optional: true }
        ),
        query(
          ':enter',
          [style({ 'opacity': '0' }), animate('0.3s', style({ 'opacity': '1' }))],
          { optional: true }
        ),
      ])),
    ]),
  ]
})
export class AppComponent {
  title = 'cpg';
  search: string = null;
  isUserList = false;
  filterData: FilterForm;
  filterForm = new FormGroup({
    search: new FormControl(''),
    fromAge: new FormControl(''),
    toAge: new FormControl(''),
    position: new FormControl('0'),
    fromHeight: new FormControl(''),
    toHeight: new FormControl(''),
    fromWeight: new FormControl(''),
    toWeight: new FormControl(''),
    video: new FormControl(false),
  });

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private pageStatusService: PageStatusService,
    private filterStatusService: FilterStatusService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.filterStatusService.getFilterData().subscribe((filterData) => {
      distinctUntilChanged();
      this.filterData = filterData;
    });
    this.filterData = new FilterForm;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  onSubmit() {
    if (this.search != null) {
      this.filterData.search = this.search;
      this.filterStatusService.filterForm().next(this.filterData);
    }
  }
}
