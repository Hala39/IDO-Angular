import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environment.apiUrl + 'user/';
  helper = new JwtHelperService();

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(creds: {email: string, password: string}) {
    return this.httpClient.post(this.baseUrl + 'login', creds).pipe(
      map((response: any) => {
        localStorage.setItem('email', JSON.stringify(response.email));
        localStorage.setItem('access_token', JSON.stringify(response.accessToken));
        this.router.navigateByUrl("/home");
      })
    )
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  get accessToken() { 
    return localStorage.getItem('access_token');
  }

  get authenticated() {
    return this.accessToken !==  null && !this.helper.isTokenExpired(this.accessToken);
  }
 
}
 