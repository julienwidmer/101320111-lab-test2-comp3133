import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-missionfilter',
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css']
})
export class MissionfilterComponent {
  minYear = 2006; // No launch prior 2006 for SpaceX
  maxYear = new Date().getFullYear(); // Limit search until current year
  launchYear: string = "";
  @Output() launchYearChange: EventEmitter<string> = new EventEmitter();

  onFilterChange() {
    this.launchYearChange.emit(this.launchYear);
  }
}
