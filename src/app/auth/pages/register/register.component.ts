import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {
  public myForm:FormGroup = this.formBuilder.group({
    name    : [ 'Test 1', [ Validators.required ] ],
    email   : [ 'test1@test.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', [ Validators.required, Validators.minLength(6) ] ],
  });

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private authService:AuthService
  ) { }

  public register(): void {
    const { name, email, password } = this.myForm.value;

    this.authService.register(name, email, password)
      .subscribe(resp => {
        if (resp === true) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', resp, 'error');
        }
      });

    this.router.navigateByUrl('/dashboard');
  }
}
