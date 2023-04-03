import {Component, Input} from '@angular/core';
import {Mission} from "../models/mission.model";

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent {
  @Input() selectedMission!: Mission;
}
