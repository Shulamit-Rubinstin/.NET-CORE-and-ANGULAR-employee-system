import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Role } from './models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = 'https://localhost:7090/api/Role';

  constructor(private http: HttpClient) { }


  get(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl);
  }
}
