import { Component, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {SpacexapiService} from "../network/spacexapi.service";
import {Mission} from "../models/mission.model";

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent {
  title = "SpaceX Mission Launch";
  missions: Mission[] = [];
  minYear = 2006; // No launch prior 2006 for SpaceX
  maxYear = new Date().getFullYear(); // Limit search until current year
  validSearchFilter = false; // The default value is '' --> not a valid year
  selectedMission: any;
  detailViewServiceModal: NgbModal;
  serviceAPI: SpacexapiService;

  @Input() launchYear!: string;

  constructor(private http: HttpClient, modalService: NgbModal, serviceAPI: SpacexapiService) {
    this.detailViewServiceModal = modalService;
    this.serviceAPI = serviceAPI;
  }

  ngOnChanges() {
    const validYear = Number(this.launchYear);

    if (validYear >= this.minYear && validYear <= this.maxYear) {
      // Valid year within range
      this.validSearchFilter = false;

      // Retrieve missions from API for specific year
      this.serviceAPI.fetchSpecificMissions(validYear).subscribe(data =>{
        this.missions = data;
      })
    } else if (this.launchYear !== "") {
      // Invalid year or outside range --> Will display an alert in the HTML
      this.validSearchFilter = true;
    } else {
      // Default state on load or after filter reset
      this.validSearchFilter = false;

      // Retrieve all missions from API
      this.serviceAPI.fetchMissions().subscribe(data =>{
        this.missions = data;
      })
    }
  }

  selectMission(modal: any, mission: Mission) {
    // Set selected mission to pass to missiondetails
    this.selectedMission = mission;
    // Display Modal view which has missiondetails as body
    this.detailViewServiceModal.open(modal, {
      centered: true,
      scrollable: true
    });
  }
}
