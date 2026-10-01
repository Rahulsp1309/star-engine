import { Component } from '@angular/core';

import {
  StarService,
  BirthStarRequest,
  BirthStarResponse
} from '../services/star.service';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent {

  isTimeTraveling = false;

  timeTravelYear = 2026;
  timeTravelPhase = '';

  // Used only to stop the animation when the real result arrives
  private timeTravelTimer: any;
  birthDate = '';
  birthTime = '';
  birthPlace = '';

  result: BirthStarResponse | null = null;

  loading = false;
  error = '';

  showJourney = false;

  constructor(
    private starService: StarService
  ) { }

  startJourney(): void {
    this.showJourney = true;
  }

  findStar(): void {

    this.loading = true;
    this.error = '';
    this.result = null;

    this.startTimeTravel();

    const request: BirthStarRequest = {
      birthDate: this.birthDate,
      birthTime: this.birthTime,
      birthPlace: this.birthPlace
    };

    this.starService.getBirthStar(request).subscribe({
      next: (response: BirthStarResponse) => {

        this.stopTimeTravel();

        this.result = response;
        this.loading = false;
      },

      error: (err: any) => {

        console.error(err);

        this.stopTimeTravel();

        this.error = 'Unable to calculate your star.';
        this.loading = false;
      }
    });
  }
 private startTimeTravel(): void {

  this.isTimeTraveling = true;

  const targetYear = this.birthDate
    ? new Date(this.birthDate).getFullYear()
    : 1999;

  this.timeTravelYear = new Date().getFullYear();

  this.timeTravelPhase = 'TRAVELLING THROUGH TIME';

  this.timeTravelTimer = setInterval(() => {

    if (this.timeTravelYear > targetYear) {

      this.timeTravelYear -= 1;

    } else {

      this.timeTravelPhase = 'RECONSTRUCTING THE SKY';

    }

  }, 7000);
}


  private stopTimeTravel(): void {

    this.isTimeTraveling = false;

    if (this.timeTravelTimer) {
      clearInterval(this.timeTravelTimer);
      this.timeTravelTimer = null;
    }
  }
}