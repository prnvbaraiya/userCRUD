import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/core/enums/User.enum';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';

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
  searchTerm: String = '';

  constructor(
    private _apiservice: ApiserviceService,
    private _router: Router,
    public dialog: MatDialog
  ) {}

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Delete',
        data: 'Are you sure you want to delete user ?',
        name: 'prnv',
        userId: id,
        onSubmit: (userId: number) => this.deleteUser(userId),
      },
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.subscription = this._apiservice
      .getUsers()
      .subscribe((res: any) => (this.dataSource = res as User[]));
  }

  deleteUser(id: number) {
    this._apiservice.deleteUser(id).subscribe({
      next: () => this._router.navigate(['/users']),
      error: (err: any) => console.log(err),
    });
    this.dataSource = this.dataSource.filter((item) => item.id !== id);
  }

  get filteredUsers() {
    if (this.dataSource) {
      return this.dataSource.filter(
        (user) =>
          user.firstName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.age
            .toString()
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    return [];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
