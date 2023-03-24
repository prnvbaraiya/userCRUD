import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../core/enums/User.enum';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  private _serverApi = 'https://localhost:7065/api';

  constructor(private _http: HttpClient) {}

  getUsers() {
    return this._http.get(this._serverApi + '/users');
  }

  getUser(id: number) {
    return this._http.get(this._serverApi + '/users/' + id);
  }

  addUser(data: User) {
    return this._http.post(this._serverApi + '/users', data);
  }

  updateUser(id: number, data: User) {
    return this._http.put(this._serverApi + '/users/' + id, data);
  }

  deleteUser(id: number) {
    return this._http.delete(this._serverApi + '/users/' + id);
  }
}
