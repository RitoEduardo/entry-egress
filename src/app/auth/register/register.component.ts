import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  uiStore$: Subscription;
  loading: boolean;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [ '', Validators.required ],
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', Validators.required ],
    });
    this.uiStore$ = this.store.select('ui').subscribe( resp => {
      this.loading = resp.isLoading;
    });
  }

  ngOnDestroy() {
    this.uiStore$.unsubscribe();
  }

  onCreateUser() {
    if ( this.registerForm.invalid ) { return; }
    // this.loader();
    this.store.dispatch( ui.isLoading() );
    const { name, email, password } = this.registerForm.value;
    this.authService.createUser( name, email, password ).then( credentials => {
      console.log(credentials);
      // Swal.close();
      this.store.dispatch( ui.stopLoading() );
      this.router.navigate(['/']);
    }).catch( err => {
      console.log('Error', err );
      this.store.dispatch( ui.stopLoading() );
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
