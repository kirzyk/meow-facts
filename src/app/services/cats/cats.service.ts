import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  private readonly apiUrl = 'https://meowfacts.herokuapp.com';

  constructor(private readonly httpClient: HttpClient) {}

  public getFact(): Observable<{ id: string; fact: string }> {
    return this.httpClient.get<{ data: string[] }>(this.apiUrl).pipe(
      map((res) => {
        const fact = res.data[0];
        return { id: uuidv4(), fact };
      })
    );
  }
}
