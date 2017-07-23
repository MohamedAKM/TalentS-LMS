import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    BASE_URL = 'http://localhost:1234/auth';
    NAME_KEY = 'name';
    TOKEN_KEY = 'token'

    constructor(private http: Http, private router: Router) { }

    get role() {
        return localStorage.getItem(this.NAME_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    get tokenHeader() {
        var header = new Headers({'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)});
        return new RequestOptions({ headers: header});
    }

    login(loginData): Observable<string> {
        return this.http.post(this.BASE_URL + '/login', loginData)
        .map(res => res.json())
        .do(res => {
             var authResponse = res;

        if (!authResponse.token)
            return;

        localStorage.setItem(this.TOKEN_KEY, authResponse.token)
        localStorage.setItem(this.NAME_KEY, authResponse.role)
        this.router.navigate(['/']);
        });
    }

    register(user) {
        delete user.confirmPassword;
        if (user.password == "") {
            delete user.password;
        }
        this.http.post(this.BASE_URL + '/register', user).subscribe(res => {
            
            res = res.json();

            this.router.navigate(['/assign-course/']);
        });
    }

    logout() {
        localStorage.removeItem(this.NAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
        this.router.navigate(['/login']);
    }

    authenticate(res) {
        var authResponse = res.json();

        if (!authResponse.token)
            return;

        localStorage.setItem(this.TOKEN_KEY, authResponse.token)
        localStorage.setItem(this.NAME_KEY, authResponse.role)
        this.router.navigate(['/']);
    }

    
  /**
   * Handle any errors from the API
   */
  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body   = err.json() || '';
      let error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText} || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }

}