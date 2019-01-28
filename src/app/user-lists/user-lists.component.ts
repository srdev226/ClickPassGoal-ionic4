import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';
import { UserList } from '../_json/user-lists';
import { FilterForm } from '../_json/filter';

import { PageStatusService } from '../_services/page-status';
import { FilterStatusService } from '../_services/filter-status';
import { UserListsService } from './user-lists.service';

import { distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.css']
})
export class UserListsComponent implements OnInit {
  filterForm: FilterForm;
  user_lists: UserList[];
  is_closed = false;
  selected_index = -1;
  is_details_loaded = false;

  constructor(
    private userListsService: UserListsService,
    private router: Router,
    private route: ActivatedRoute,
    private pageStatusService: PageStatusService,
    private filterStatusService: FilterStatusService,
  ) {
    route.params.subscribe(val => {
      this.pageStatusService.setStatus('user-lists');
    });
  }

  ngOnInit() {
    this.filterStatusService.getFilterData().subscribe((filterData) => {
      distinctUntilChanged();
      this.format(filterData);
    });
  }

  format(filterData) {
    this.is_details_loaded = false;
    this.filterForm = filterData;
    this.userListsService.getUserLists(this.filterForm).subscribe(user_lists => {
      this.user_lists = user_lists;
      this.is_details_loaded = true;
      console.log(user_lists);
    });
  }

  gotoUserProfile(jugador: UserList, i) {
    this.is_closed = true;
    this.selected_index = i;
    setTimeout(() => this.router.navigate(['/user-profile/', jugador.slug]), 1000);
  }

  getUbicacion(provincia, code) {
    if (provincia && code) {
      return provincia + ' ' + code;
    }
    return '';
  }
}
