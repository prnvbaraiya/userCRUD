import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/core/enums/User.enum';

import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'age',
    'email',
    'actions',
  ];
  dataSource: User[] = [];
  subscription!: Subscription;

  constructor(
    private _http: HttpClient,
    private _apiservice: ApiserviceService,
    private _router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.subscription = this._apiservice
      .getUsers()
      .subscribe((res) => (this.dataSource = res as User[]));
  }

  deleteUser(id: number) {
    this._apiservice.deleteUser(id).subscribe({
      next: () => this._router.navigate(['/users']),
      error: (err) => console.log(err),
    });
    this.dataSource = this.dataSource.filter((item) => item.id !== id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
