import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private apiServerUrl = environment.apiBaseUrl;

    private loginStatus = new BehaviorSubject<boolean>(this.checkLogin());


    constructor(private http: HttpClient) { }

    sendUser(user) {
        const url = `${this.apiServerUrl}/user/login`;
        return this.http.post<any>(url, user).pipe(
            map(result => {
                this.loginStatus.next(result);
            })
        );
    }

    logout(): void {
        this.loginStatus.next(false);
        localStorage.setItem("currentUser", "");

    }

    checkLogin(): boolean {
        if (localStorage.getItem('currentUser') != null
            && localStorage.getItem('currentUser') !== '') {
            return true;
        } else {
            return false;
        }
    }

    get isLoggedIn() {
        return this.loginStatus.asObservable();
    }


}