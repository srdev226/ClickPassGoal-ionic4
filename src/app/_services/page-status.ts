
import { Injectable } from '@angular/core';
@Injectable()
export class PageStatusService {

  status:string  = '';

  constructor() {
    this.status = 'user-lists';
  }

  setStatus(status:string){
    this.status = status;
  }

  getStatus(): string{
    return this.status;
  }
}
