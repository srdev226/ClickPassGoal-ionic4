import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  menu_opened: boolean = false;
  
  @Input('search') search:string;
  @Output() filterData = new EventEmitter<FormGroup>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoHome() {
    this.router.navigate(['/']);
  }

  onFilter(filterData) {
    this.filterData.emit(filterData);
  }

  onMenuChanged(menu_opened) {
    this.menu_opened = menu_opened;
  }
}
