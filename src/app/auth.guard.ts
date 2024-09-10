import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // Permite el acceso si el token está presente
      return true;
    } else {
      // Redirige al login si no hay token
      this.router.navigate(['/login']);
      return false;
    }
  }
}
