import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    sendUser(user): Observable<any> {
        const url = `${this.apiServerUrl}/user/login`;
        return this.http.post(url, user);
    }

    logout(): void {
        localStorage.setItem("currentUser", "");
        alert("You just logged out!");
    }

    checkLogin(): boolean {
        if (localStorage.getItem('currentUserName') != null
            && localStorage.getItem('currentUserName') !== '') {
            console.log(localStorage.getItem("currentUser"));
            return true;
        } else {
            return false;
        }
    }

}