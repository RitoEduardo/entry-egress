import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authSerice: AuthService,
    private router: Router
  ) { }

  ngOnInit( ): void {
  }

  onLogin() {
    // routerLink="/login"
    this.authSerice.logout().then( r => {
      console.log('Bye user', r );
      this.router.navigate(['/login']);
    });
  }

}
