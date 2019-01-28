import { Component, OnInit, Output, EventEmitter, Input, HostListener, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FilterService } from './filter.service';
import { PageStatusService } from '../../_services/page-status';
import { FilterForm } from '../../_json/filter';
import { FilterStatusService } from '../../_services/filter-status';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnChanges {
  
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

  posicion: string;
  positionDatas: string[];
  is_details_loaded: boolean = false;
  menu_opened: boolean = false;

  @Input('search') search: string;

  @Output() filterData = new EventEmitter<FormGroup>();
  @Output() menuChanged = new EventEmitter<boolean>();

  @ViewChild("filterMenu", {read: ElementRef}) filterMenu: ElementRef;

  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   if(this.filterMenu.nativeElement.contains(event.target)) {
  //     console.log(123);
  //     this.menu_opened = true;
  //     this.menuChanged.emit(this.menu_opened);
  //   } else {
  //     console.log(321);
  //     this.menu_opened = false;
  //     this.menuChanged.emit(this.menu_opened);
  //   }
  // }

  constructor(private router: Router,
              private filterService: FilterService,
              private pageStatusService: PageStatusService,
              private filterStatusService: FilterStatusService) {
    
  }

  onSubmit() {
    this.menu_opened = false;
    this.menuChanged.emit(this.menu_opened);
    // this.filterData.emit(this.filterForm.value);
    this.filterStatusService.filterForm().next(this.filterForm.value);
    // console.log(this.filterForm.controls);
    // this.router.navigate(['/user-lists/', this.filterForm.controls]);
  }

  ngOnChanges() {
    console.log(this.search);
    this.is_details_loaded = false;
    this.filterService.getPosition().subscribe(position => {
      this.positionDatas = position;
      console.log(position);
      this.is_details_loaded = true;
    })
  }

  onClickPopupButton() {
    this.menu_opened = !this.menu_opened;
    this.menuChanged.emit(this.menu_opened);
  }
}
