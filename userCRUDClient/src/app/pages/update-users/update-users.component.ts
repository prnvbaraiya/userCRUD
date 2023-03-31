import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/enums/User.enum';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.scss'],
})
export class UpdateUsersComponent implements OnInit {
  user_id: number;
  userForm!: FormGroup;
  subscription: Subscription[] = [];
  url: any;

  constructor(
    private _route: ActivatedRoute,
    private _apiService: ApiserviceService,
    public fb: FormBuilder,
    private _router: Router
  ) {
    this.user_id = -1;
    this.reactiveForm();
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const param_user_id = params.get('user_id');
      if (param_user_id !== null) {
        this.user_id = +param_user_id;
        const sub = this._apiService.getUser(+param_user_id).subscribe({
          next: (res: any) => {
            this.url = 'data:image/jpeg;base64,' + res.fileAsByteArray;
            this.userForm.setValue({
              profilePhoto: '',
              fileAsBase64: this.url,
              FileAsByteArray: res.fileAsByteArray,
              id: res.id,
              firstName: res.firstName,
              lastName: res.lastName,
              age: res.age,
              email: res.email,
            });
          },
          error: (err) => console.log('Error:', err),
        });
        this.subscription.push(sub);
      }
    });
  }

  reactiveForm() {
    this.userForm = this.fb.group({
      profilePhoto: [''],
      fileAsBase64: [''],
      FileAsByteArray: [''],
      id: [''],
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

  handleUpdate() {
    this.userForm.removeControl('profilePhoto');
    this._apiService.updateUser(this.user_id, this.userForm.value).subscribe({
      next: (res) => this._router.navigate(['/users']),
      error: (err) => console.log('Error:', err),
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((item) => item.unsubscribe());
  }
}
