import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BirthStarRequest {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}

export interface BirthStarResponse {
  sourceId: string;
  designation: string;
  name: string | null;
  rightAscension: number;
  declination: number;
  magnitude: number;
  altitude: number;
  azimuth: number;
  zenithDistance: number;
}

@Injectable({
  providedIn: 'root'
})
export class StarService {

  private apiUrl = 'https://star-engine01-latest.onrender.com/api/star';

  constructor(private http: HttpClient) {}

  getBirthStar(
    request: BirthStarRequest
  ): Observable<BirthStarResponse> {

    return this.http.post<BirthStarResponse>(
      `${this.apiUrl}/getStar`,
      request
    );
  }
}