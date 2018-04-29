import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../../../core/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title: string;
  form: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private registerService: RegisterService) { }

  ngOnInit() {
    this.title = 'New User Registration';

    // initialize the form
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      Username: ['', Validators.required],
      Email: ['',
        [Validators.required,
        Validators.email]
      ],
      Password: ['', Validators.required],
      PasswordConfirm: ['', Validators.required],
      DisplayName: ['', Validators.required]
    }, {
        validator: this.passwordConfirmValidator
      });
  }

  onSubmit() {
    // build a temporary user object from form values
    const tempUser = <User>{};
    tempUser.Username = this.form.value.Username;
    tempUser.Email = this.form.value.Email;
    tempUser.Password = this.form.value.Password;
    tempUser.DisplayName = this.form.value.DisplayName;

    this.registerService.addUser(tempUser).subscribe(user => {
      if (user) {
        console.log(user);
        // console.log('User ' + user.Username + ' has been created.');
        // redirect to login page
        this.router.navigate(['user/login']);
      } else {
        // registration failed
        this.form.setErrors({
          'register': 'User registration failed.'
        });
      }
      // console.log('User ' + user.Username + ' has been created.');
      // // redirect to login page
      // this.router.navigate(['user/login']);
    }, error => console.log(error));
  }

  onBack() {
    this.router.navigate(['dashboard']);
  }

  // custom validator to compare
  // the Password and passwordConfirm values.
  passwordConfirmValidator(control: FormControl): any {

    // retrieve the two Controls
    const p = control.root.get('Password');
    const pc = control.root.get('PasswordConfirm');

    if (p && pc) {
      if (p.value !== pc.value) {
        pc.setErrors(
          { 'PasswordMismatch': true }
        );
      } else {
        pc.setErrors(null);
      }
    }
    return null;
  }

  // retrieve a FormControl
  getFormControl(name: string) {
    return this.form.get(name);
  }

  // returns TRUE if the FormControl is valid
  isValid(name: string) {
    const e = this.getFormControl(name);
    return e && e.valid;
  }

  // returns TRUE if the FormControl has been changed
  isChanged(name: string) {
    const e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }

  // returns TRUE if the FormControl is invalid after user changes
  hasError(name: string) {
    const e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }
}
