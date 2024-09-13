import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:5251/Users'; // URL base para obtener usuarios
    private currentUserKey = 'currentUser';

    constructor(private http: HttpClient, private router: Router) { }

    // Método para registrar un usuario
    registerUser(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData);
    }

    // Método para logear un usuario
    loginUser(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, userData).pipe(
            tap((response: any) => {
                if (response && response.token) {
                    localStorage.setItem(this.currentUserKey, JSON.stringify({
                        username: response.username,
                        role: response.role,
                        token: response.token
                    }));
                }
            })
        );
    }

    // Método para obtener todos los usuarios
    getUsers(page: number, itemsPerPage: number): Observable<any> {
        const params = { page: page.toString(), pageSize: itemsPerPage.toString() };
        return this.http.get<any>(`${this.apiUrl}/users`, { params });
      }
      

    // Método para obtener el rol del usuario
    getUserRole(): string | null {
        const user = this.getCurrentUser();
        return user ? user.role : null;
    }

    // Método para obtener el nombre del usuario
    getUsername(): string | null {
        const user = this.getCurrentUser();
        return user ? user.username : null;
    }

    // Método para cerrar sesión
    logout(): any {
        localStorage.removeItem(this.currentUserKey);
        return this.router.navigate(['/login']);
    }

    // Método para verificar si el usuario está autenticado
    isAuthenticated(): boolean {
        return !!this.getCurrentUser();
    }

    // Obtener el token del usuario actual
    getToken(): string | null {
        const user = this.getCurrentUser();
        return user ? user.token : null;
    }

    // Método para obtener los detalles del usuario almacenados en localStorage
    private getCurrentUser(): any {
        const userJson = localStorage.getItem(this.currentUserKey);
        return userJson ? JSON.parse(userJson) : null;
    }

    // Método para realizar solicitudes protegidas (adjuntando el token en los headers)
    getProtectedData(): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get('http://localhost:5251/protected-endpoint', { headers });
    }
    updateUser(userId: number, user: User): Observable<any> {
        return this.http.put(`${this.apiUrl}/${userId}`, user);
    }
    deleteUser(userId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${userId}`);
    }
}
