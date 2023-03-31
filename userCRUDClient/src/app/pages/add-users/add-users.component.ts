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
  profilePhoto: any;
  url: any;

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
      profilePhoto: [''],
      fileAsBase64: [''],
      FileAsByteArray: [''],
      firstName: [''],
      lastName: [''],
      age: [''],
      email: [''],
    });
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result?.toString();
        this.userForm.controls['fileAsBase64'].setValue(this.url);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  handleSubmit() {
    this.userForm.removeControl('profilePhoto');
    const res = this._apiService.addUser(this.userForm.value).subscribe({
      next: () => this._router.navigate(['/users', { foo: 'foo' }]),
      error: (err) => console.log('Error:', err),
    });
  }
}
