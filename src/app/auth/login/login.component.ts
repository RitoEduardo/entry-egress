import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  uiStore$: Subscription;
  loading: boolean;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [ '', [Validators.required, Validators.email] ],
      password: ['', Validators.required ]
    });
    this.uiStore$ = this.store.select('ui').subscribe( resp => {
      console.log('? Loading subs');
      this.loading = resp.isLoading;
    });
  }

  ngOnDestroy() {
    this.uiStore$.unsubscribe();
  }

  onLoginForm() {
    if ( this.loginForm.invalid ) { return; }
    this.store.dispatch( ui.isLoading() );
    const { email, password } = this.loginForm.value;
    this.authService.loginUser( email, password ).then( resp => {
      console.log( resp );
      this.store.dispatch( ui.stopLoading() );
      this.router.navigate(['/']);
    }).catch( err => {
      console.log( err );
      this.store.dispatch( ui.stopLoading() );
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      });
    });

  }

}
