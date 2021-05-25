
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Injectable } from '@angular/core';
import { Ride } from "../models/ride";

@Injectable({
    providedIn: 'root'
})
export class RideService {

    private apiServerUrl = environment.apiBaseUrl;
    public dataForm: FormGroup;


    constructor(private http: HttpClient) { }

    addRide(ride: Ride): Observable<Object> {
        const url = `${this.apiServerUrl}/ride/add-ride`;
        return this.http.post(url, ride);
    }

    getAnimalTypes() {
        const url = `${this.apiServerUrl}/ride/animal-types`;
        return this.http.get(url);
    }

    getCarTypes() {
        const url = `${this.apiServerUrl}/ride/car-types`;
        return this.http.get(url);
    }


    getAllRides(): Observable<Ride[]> {
        const url = `${this.apiServerUrl}/ride/rides`
        return this.http.get<Ride[]>(url);
    }

    getRidesByUserId(userId: string) {
        const url = `${this.apiServerUrl}/ride/rides/${userId}`
        return this.http.get<Ride[]>(url);
    }
}