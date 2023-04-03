import { Component, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent {
  title = "SpaceX Mission Launch";
  missions: any[] = [];

  @Input() launchYear: string = "All";

  constructor(private http: HttpClient) { }

  // Called once Angular has initialized all
  // data-bound properties
  ngOnInit() {
    this.http.get<any[]>("https://api.spacexdata.com/v3/launches").subscribe({
      next: (missions) => this.missions = missions,
      error: (error) => console.error(error),
      complete: () => console.info("Missions retrieval complete.")
    });
  }

  ngOnChanges() {
    this.http.get<any[]>("https://api.spacexdata.com/v3/launches?launch_year=" + this.launchYear).subscribe({
      next: (missions) => this.missions = missions,
      error: (error) => console.error(error),
      complete: () => console.info("Missions retrieval complete.")
    });
  }
}
