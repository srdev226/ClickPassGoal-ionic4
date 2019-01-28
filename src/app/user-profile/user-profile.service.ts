import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { AppHttpClient } from '../_services/http-client';

import {HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserProfileService extends AppHttpClient {

  private userlistsUrl = environment.serverUrl + '/dashboard';

  getUserProfile (slug: string, type: number): Observable<any> {
    const url = this.userlistsUrl + '/getUserProfile';
    return this.post(url, {'slug': slug, 'type': type});
  }
}