import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from '../models/user';
import { FormGroup } from '@angular/forms';


@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private apiServerUrl = environment.apiBaseUrl;
    public dataForm: FormGroup;

    constructor(private http: HttpClient) { }

    addUser(user: User): Observable<Object> {
        const url = `${this.apiServerUrl}/user/register`;
        // const headerss = new HttpHeaders({ 'Content-Type': 'application/json' });
        // return this.http.post(url, JSON.stringify(user), { headers: headerss });
        return this.http.post(url, user);
    }


}