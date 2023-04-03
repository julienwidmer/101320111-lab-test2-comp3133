import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-missionfilter',
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css']
})
export class MissionfilterComponent {
  currentYear = new Date().getFullYear(); // Limit search until current year

  launchYear: string = '';
  @Output() launchYearChange: EventEmitter<string> = new EventEmitter();

  onFilterChange() {
    this.launchYearChange.emit(this.launchYear);
  }

  onResetFilter() {
    this.launchYear = '';
    this.launchYearChange.emit('');
  }
}
