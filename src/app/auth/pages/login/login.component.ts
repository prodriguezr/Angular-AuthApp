import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  myForm:FormGroup = this.formBuilder.group({
    email   : [ 'test1@test.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', [ Validators.required, Validators.minLength(6) ] ],
  });

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private authService:AuthService
  ) { }

  public login():void {
    const { email, password } = this.myForm.value;

    this.authService.login(email, password)
      .subscribe(resp => {
        if (resp === true) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', resp, 'error');
        }
      });
  }
}
