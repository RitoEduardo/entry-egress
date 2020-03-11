import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [ '', [Validators.required, Validators.email] ],
      password: ['', Validators.required ]
    });
  }

  ngOnInit(): void {
  }

  onLoginForm() {
    if ( this.loginForm.invalid ) { return; }
    this.loader();
    const { email, password } = this.loginForm.value;
    this.authService.loginUser( email, password ).then( resp => {
      console.log( resp );
      Swal.close();
      this.router.navigate(['/']);
    }).catch( err => {
      console.log( err );
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      });
    });

  }

  loader() {
    Swal.fire({
      title: 'Loading....',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      onClose: () => {
      }
    });
  }
}
