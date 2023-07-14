import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client.interface';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  urlClient: string = 'https://innate-boatneck-aunt.glitch.me/clients';

  constructor(private https: HttpClient) {}

  getData() {
    return this.https.get<Client[]>(this.urlClient);
  }
}
