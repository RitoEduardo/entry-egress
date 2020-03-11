import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [ '', Validators.required ],
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', Validators.required ],
    });
  }

  onCreateUser() {
    if ( this.registerForm.invalid ) { return; }
    this.loader();
    const { name, email, password } = this.registerForm.value;
    this.authService.createUser( name, email, password ).then( credentials => {
      console.log(credentials);
      Swal.close();
      this.router.navigate(['/']);
    }).catch( err => {
      console.log('Error', err );
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
        footer: '<a href>Why do I have this issue?</a>'
      });
    });
    // console.log( this.registerForm );
    // console.log( this.registerForm.valid);
    // console.log( this.registerForm.value );
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
