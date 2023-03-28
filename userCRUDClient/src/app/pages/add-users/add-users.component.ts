import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
  providers: [],
})
export class AddUsersComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private _apiService: ApiserviceService,
    private _router: Router
  ) {
    this.reactiveForm();
  }
  ngOnInit(): void {}

  reactiveForm() {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      age: [''],
      email: [''],
    });
  }

  handleSubmit() {
    const res = this._apiService.addUser(this.userForm.value).subscribe({
      next: () => this._router.navigate(['/users', { foo: 'foo' }]),
      error: (err) => console.log('Error:', err),
    });
  }

  handleReset(e: any) {
    e.preventDefault();
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      age: [''],
      email: [''],
    });
  }
}
