import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(): void {
    // Send login credentials to backend for authentication
    this.http.post<any>('http://localhost:3000/login', { username: this.username, password: this.password })
      .subscribe(response => {
        console.log('Login response:', response);

        // Example: Navigate to dashboard on successful login (replace with actual authentication logic)
        if (response.success) {
          localStorage.setItem('currentUser', this.username); // Store username in localStorage
          this.router.navigate(['/dashboard']);
        } else {
          // Handle login failure (e.g., display error message)
          alert('Login failed! Please check your credentials.');
        }
      }, error => {
        console.error('Login error:', error);
        // Handle error appropriately (e.g., display error message)
        alert('Login failed! Please try again later.');
      });
  }
}
