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

  minYear = 2006; // No launch prior 2006 for SpaceX
  maxYear = new Date().getFullYear(); // Limit search until current year
  validSearchFilter = false; // The default value is '' --> not a valid year
  @Input() launchYear!: string;

  ngOnChanges() {
    const validYear = Number(this.launchYear);

    if (validYear >= this.minYear && validYear <= this.maxYear) {
      // Valid year within range
      this.validSearchFilter = false;
      this.fetchMissionsWithYear(validYear)
    } else if (this.launchYear !== "") {
      // Invalid year or outside range --> Will display an alert in the HTML
      this.validSearchFilter = true;
    } else {
      // Default state on load or after filter reset
      this.validSearchFilter = false;
      this.fetchMissions();
    }
  }

  constructor(private http: HttpClient) { }

  fetchMissionsWithYear(year: Number) {
    this.http.get<any[]>("https://api.spacexdata.com/v3/launches?launch_year=" + year).subscribe({
      next: (missions) => this.missions = missions,
      error: (error) => console.error(error),
      complete: () => console.info("Missions retrieval complete.")
    });
  }

  fetchMissions() {
    this.http.get<any[]>("https://api.spacexdata.com/v3/launches").subscribe({
      next: (missions) => this.missions = missions,
      error: (error) => console.error(error),
      complete: () => console.info("Missions retrieval complete.")
    });
  }
}
