import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike } from './bike/bike.component';
import { Globals } from './globals/globals';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http: HttpClient, private globals: Globals) { }

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>("http://localhost:3000/bike", this.header());
  }

  getBike(bikeId: number): Observable<Bike> {
    return this.http.get<Bike>("http://localhost:3000/bike/" + bikeId, this.header());
  }

  adicionar(bike: Bike): Observable<any> {
    return this.http.post("http://localhost:3000/bike", bike, this.header());
  }

  editar(bike: Bike): Observable<any> {
    return this.http.put("http://localhost:3000/bike/" + bike.id, bike, this.header());
  }

  remover(bikeId: number): Observable<any> {
    return this.http.delete("http://localhost:3000/bike/" + bikeId, this.header());
  }

  header() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'x-access-token': this.globals.loginData.token
      })
    };
  }
}
