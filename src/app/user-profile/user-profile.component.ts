import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserProfile } from '../user-profile/user-profile';
import { UserProfileService } from './user-profile.service';
import { PageStatusService } from '../_services/page-status';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  opened: boolean[] = [];
  jugador: UserProfile;
  slug: string;
  is_details_loaded = false;
  comeOutAnimation = 'fadeIn';
  ball_index = -1;
  ballName = [
    'Perfil',
    'Valuación',
    'Redes',
    'Imágenes Videos',
    'Trayectoria',
    'Biografía',
    'Perfil',
  ];

  categoryName = [
    'Perfil',
    'Valuación',
    'Redes',
    'Imágenes Videos',
    'Trayectoria',
    'Biografía',
    'Perfil',
    'last',
  ];
  mouseDown = false;
  last: any;
  eventUp: any;
  eventDown: any;
  interval;
  index;
  selected_category;

  @ViewChild('categoryList') category: ElementRef;
  @ViewChild('next') next: ElementRef;
  @ViewChild('previous') previous: ElementRef;
  @ViewChild('next_category') next_category: ElementRef;
  @ViewChild('previous_category') previous_category: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userProfileService: UserProfileService,
    private pageStatusService: PageStatusService,
  ) {
    route.params.subscribe(val => {
      clearInterval(this.interval);
      this.format();
    });
  }

  ngOnInit() {
    for (let i = 0; i < 6; i ++) {
      this.opened.push(false);
    }
  }

  format(type = 0) {
    this.selected_category = -1;
    this.ball_index = -1;
    this.index = 7;
    setTimeout(() => this.index = -1, 1450);
    this.interval = setInterval(() => {
      this.ball_index ++;
      this.index ++;
      setTimeout(() => {
        if (this.next) {
          const el: HTMLElement = this.next.nativeElement as HTMLElement;
          el.click();
        }
      }, 1450);
      if (this.ball_index === 6) {
        this.ball_index = 0;
        setTimeout(() => {
          this.index = 7; setTimeout(() => this.index = 0, 10);
        }, 1000);
      }
    }, 1500);
    this.pageStatusService.setStatus('user-profile');
    console.log(1);
    this.slug = this.route.snapshot.params['slug'];
    for (let i = 0; i < 6; i ++) {
      this.opened[i] = false;
    }
    // setInterval(() => this.opened[0] = true, 6000);
    this.is_details_loaded = false;
    this.userProfileService.getUserProfile(this.slug, type).subscribe(jugador => {
      this.jugador = jugador;
      console.log(this.jugador);
      this.is_details_loaded = true;
      this.slug = this.jugador.slug;
      setTimeout(() => this.opened[0] = true, 750);
      setTimeout(() => this.opened[4] = true, 1500);
      setTimeout(() => this.opened[5] = true, 2250);
    });
  }

  initialize(jugador) {

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

  previousProfile() {
    this.userProfileService.getUserProfile(this.slug, 1).subscribe(jugador => {
      if (jugador.slug) {
        this.router.navigate(['/user-profile/', jugador.slug]);
      }
    });
  }

  nextProfile() {
    this.userProfileService.getUserProfile(this.slug, 2).subscribe(jugador => {
      if (jugador.slug) {
        this.router.navigate(['/user-profile/', jugador.slug]);
      }
    });
  }

  gotoUserList() {
    this.router.navigate(['/']);
  }

  selectCategory(cate_index) {
    this.selected_category = cate_index;
    setTimeout(() => {
      for (let i = 0; i < this.selected_category; i ++) {
        const el: HTMLElement = this.next_category.nativeElement as HTMLElement;
        el.click();
      }
    }, 100);
  }

  onMouseUp(e) {
    this.eventUp = e;
    if (this.mouseDown) {
      if (Math.abs(e.clientX - this.last) > 50) {
        if (e.clientX - this.last < 0 && this.selected_category < 5) {
          if (Math.abs(e.clientX - this.last) < 320) {
            const el: HTMLElement = this.next_category.nativeElement as HTMLElement;
            el.click();
          }
          this.selected_category ++;
        }
      }
      if (e.clientX - this.last >= 0 && this.selected_category > 0) {
        if (e.clientX - this.last < 50) {
          const el: HTMLElement = this.next_category.nativeElement as HTMLElement;
          el.click();
        } else {
          this.selected_category --;
        }
      }

      this.mouseDown = false;
    }
  }

  onMouseDown(e) {
    this.eventDown = e;
    this.mouseDown = true;
    this.last = e.clientX;
  }

  closeCategory() {
    console.log('close');
    this.selected_category = -1;
  }
}
