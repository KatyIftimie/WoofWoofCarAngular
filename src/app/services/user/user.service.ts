import { User } from './../../models/User';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of, ReplaySubject } from "rxjs";
import { environment } from "src/environments/environment";
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class UserService {


    private apiServerUrl = environment.apiBaseUrl;
    private loginStatus = new BehaviorSubject<boolean>(this.checkLogin());


    constructor(private http: HttpClient, private router: Router) { }


    loadTokenIntoHeaders(token: string) {
        if (token == null || token == "") {
            return of(null);
        }
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.apiServerUrl}/user/${localStorage.getItem("userEmail")}`, { headers }).pipe(
            map(res => {
                if (res == true) {
                    console.log("Trueee!");
                    // localStorage.setItem("token", user.token);
                    // localStorage.setItem("userEmail", user.email);
                }
            }))


    }

    login(user) {
        return this.http.post(`${this.apiServerUrl}/user/login`, user).pipe(
            map((user: User) => {
                localStorage.setItem("token", user.token);
                localStorage.setItem("userEmail", user.email);
                this.loginStatus.next(true);
            })
        )
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        this.loginStatus.next(false);
    }

    addUser(values: User): Observable<Object> {
        const url = `${this.apiServerUrl}/user/register`;

        return this.http.post(url, values);
    }



    checkLogin(): boolean {
        if (localStorage.getItem('email') != null
            && localStorage.getItem('email') !== ''
            && localStorage.getItem('token') != null
            && localStorage.getItem('token') !== '') {
            return true;
        } else {
            return false;
        }
    }

    get isLoggedIn() {
        return this.loginStatus.asObservable();
    }


    getUserByEmail(email: string) {
        return this.http.get(`${this.apiServerUrl}/user/get-user/${email}`);
    }

}