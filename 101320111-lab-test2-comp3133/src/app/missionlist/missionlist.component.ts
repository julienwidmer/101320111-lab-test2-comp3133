import { Component, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

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
  selectedMission: any;
  detailViewServiceModal: NgbModal;

  @Input() launchYear!: string;

  constructor(private http: HttpClient, modalService: NgbModal) { this.detailViewServiceModal = modalService; }

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

  fetchMissionsWithYear(year: Number) {
    this.http.get<any[]>("https://api.spacexdata.com/v3/launches?launch_year=" + year).subscribe({
      next: (missions) => this.missions = missions,
      error: (error) => console.error(error),
      complete: () => console.info(`Missions retrieval complete for ${year}.`)
    });
  }

  fetchMissions() {
    this.http.get<any[]>("https://api.spacexdata.com/v3/launches").subscribe({
      next: (missions) => this.missions = missions,
      error: (error) => console.error(error),
      complete: () => console.info("Missions retrieval complete.")
    });
  }

  selectMission(modal: any, mission: any) {
    // Set selected mission to pass to missiondetails
    this.selectedMission = mission;
    // Display Modal view which has missiondetails as body
    this.detailViewServiceModal.open(modal, { centered: true });
  }
}
