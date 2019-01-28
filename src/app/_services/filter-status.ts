import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FilterForm } from '../_json/filter';
@Injectable()
export class FilterStatusService {

  filterData: BehaviorSubject<FilterForm>;

  constructor() {
    this.filterData = new BehaviorSubject<FilterForm>(null);
  }

  filterForm() {
    return this.filterData;
  }

  getFilterData(): Observable<FilterForm> {
    return this.filterData.asObservable();
  }
}
