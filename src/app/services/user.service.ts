import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {


    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getUserByEmail() {
        return this.http.get(`${this.apiServerUrl}/user/get-user/${localStorage.getItem('currentUser')}`)
    }
}