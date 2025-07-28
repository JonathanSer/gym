import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AuthService } from './auth/services/auth.service';
import { SiderbarComponent } from "./components/siderbar/siderbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SiderbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gym');

  private authService = inject(AuthService);

  estaLogueado() {
    return this.authService.isLoggedIn();
  }


}
