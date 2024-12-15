import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUser: User | null = {
    id: "1",
    name: 'JohnDoe',
    email: 'john.doe@example.com',
    password: 'securepassword',
    phone: '1234567890',
  };
  
private readonly users: User[] = [
    {
        id: "1",
        name: 'Ammar',
        email: 'ammar@gmail.com',
        password: 'ammar',
        phone: '1234567890',
      },
      {
        id: "2",
        name: 'JohnDoe',
        email: 'john.doe@example.com',
        password: 'john',
        phone: '1234567890',
      },
      {
        id: "3",
        name: 'JohnDoe',
        email: 'john.doe@example.com',
        password: 'securepassword',
        phone: '1234567890',
      }
];
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private readonly router: Router) { }

  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }


   getCurrentUserSubject(): BehaviorSubject<User | null>{
        return this.currentUserSubject;
    }
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getUserId(): string | undefined {
    return this.currentUser?.id;
  }


   registerUser(user: User): Observable<{ success: boolean; message: string }> {
    const existingUser = this.users.find(u => u.email === user.email);
    if (existingUser) {
      return of({ success: false, message: 'User already exists!' });
    }
    this.users.push({ ...user, id: this.generateId() });
    return of({ success: true, message: 'Registration successful!' });
  }

  loginUser(email: string, password: string): Observable<{ success: boolean; message: string }> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
        this.currentUser = user;
      this.currentUserSubject.next(user);
      this.isAuthenticated.next(true);
      localStorage.setItem('user', JSON.stringify(user));
      return of({ success: true, message: 'Login successful!' });
    }
    return of({ success: false, message: 'Invalid email or password!' });
  }


  logoutUser() {
    this.currentUser = null;
      this.currentUserSubject.next(null);
    this.isAuthenticated.next(false);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      this.currentUserSubject.next(this.currentUser);
      this.isAuthenticated.next(true);
    }
  }
  private generateId(): string {
    return crypto.randomUUID();
  }
}