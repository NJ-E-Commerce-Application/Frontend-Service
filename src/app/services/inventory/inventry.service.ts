import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../../model/inventry';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InventryService {
  constructor(private httpClient: HttpClient) {}

  getInventry(): Observable<Array<Inventory>> {
    console.log('test');
    const result = this.httpClient.get<Array<Inventory>>(
      'http://localhost:9000/api/inventory/getAll'
    );
    return result;
  }
}
