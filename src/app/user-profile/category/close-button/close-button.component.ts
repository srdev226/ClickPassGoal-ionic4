import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss']
})
export class CloseButtonComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  public contains(e) {
    if (this.closeBtn.nativeElement.contains(e.target)) return true;
    return false;
  }
}
