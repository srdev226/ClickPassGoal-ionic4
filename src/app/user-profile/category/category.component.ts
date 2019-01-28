import { Component, OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { UserProfile } from '../../user-profile/user-profile';
import { CloseButtonComponent } from './close-button/close-button.component';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnChanges {

  @Input() jugador: UserProfile;
  @Input() category_index: number;
  @Input() selected_index: number;
  @Input() eventUp: any;
  @Input() eventDown: any;
  @Output() categoryClosed = new EventEmitter<boolean>();
  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor() { }

  ngOnChanges() {
    setTimeout(() => {
      if (this.eventUp && this.closeBtn && this.closeBtn.nativeElement && this.closeBtn.nativeElement.contains(this.eventUp.target)) {
        console.log(this.selected_index);
        this.categoryClosed.emit(true);
      }
    }, 100);

  }

  getUbicacion(provincia, code) {
    if (provincia && code) {
      return provincia + ' ' + code;
    }
    return '';
  }

  formatHeight(num) {
    const str: string = num.toString();
    let retval = '';
    for (let i = str.length - 1; i >= 0; i --) {
      if ((str.length - i) === 3) {
        retval = ',' + retval;
      }
      retval = str[i] + retval;
    }
    return retval;
  }
}
