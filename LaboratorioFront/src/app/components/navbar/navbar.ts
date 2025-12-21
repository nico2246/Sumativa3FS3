import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, Session } from '../../services/auth.services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  session: Session | null = null;

  constructor(private router: Router, private auth: AuthService) {
    this.session = this.auth.getSession();
  }

  logout() {
    this.auth.logout();
    this.session = null;
    this.router.navigate(['/login']);
  }
}
