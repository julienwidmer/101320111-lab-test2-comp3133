import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Mission} from "../models/mission.model";

@Injectable({
  providedIn: 'root'
})
export class SpacexapiService {

  constructor(private http: HttpClient) { }

  fetchMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>("https://api.spacexdata.com/v3/launches");
  }

  fetchSpecificMissions(year: number): Observable<Mission[]> {
    return this.http.get<Mission[]>("https://api.spacexdata.com/v3/launches?launch_year=" + year);
  }
}
