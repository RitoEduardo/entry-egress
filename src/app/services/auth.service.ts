import { Injectable } from '@angular/core';
// import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { User, DBUser } from '../models/user.model';
// import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore'; import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as userAuth from '../auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userFSub$;

  constructor(
    private authFirebase: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {

  }

  initAuthListener() {
    this.authFirebase.authState.subscribe( fUser => {
      console.log( fUser?.uid );
      if ( fUser ) {
        this.userFSub$ = this.firestore.doc(`${ fUser.uid }/user`).valueChanges()
          .subscribe( (fDBUser: DBUser ) => {
            console.log( fDBUser );
            // const user = new User( fUser.uid, fDBUser['name'], fUser.email );
            this.store.dispatch( userAuth.setUser({
              user: User.fromFirebase( fDBUser )
            }) );
          });
      } else {
        this.store.dispatch( userAuth.unsetUser() );
      }

    });
  }

  createUser( name: string, email: string, password: string ){
    console.log( name, email, password );
    // return new Promise( (resolve, reject) => {
    return this.authFirebase.createUserWithEmailAndPassword( email, password )
          .then( ({ user }) => {
            const newUser = new User( user.uid, name, email );
            // this.firestore.doc('user/david');
            return this.firestore.doc(`${ user.uid }/user`).set( { ...newUser} );
              // .then( l => resolve(user) )
              // .catch( e => reject(e) );
          }); // .catch( e => reject(e) );
    // });
  }

  loginUser( email: string, password: string ) {
    console.log( email );
    return this.authFirebase.signInWithEmailAndPassword( email, password );
  }

  logout() {
    return this.authFirebase.signOut();
  }

  isAuth() {
    return this.authFirebase.authState.pipe(
      map( fUser => fUser != null )
    );
  }

}
