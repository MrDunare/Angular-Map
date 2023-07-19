import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client.interface';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  urlClient: string = 'https://innate-boatneck-aunt.glitch.me/clients';

  constructor(private https: HttpClient) {}

  //GET
  getData() {
    return this.https.get<Client[]>(this.urlClient);
  }
  //GET:ID
  getUser(user: string, index: number) {
    return this.https.get<Client>(`${this.urlClient}/${index}`);
  }

  //POST
  sendData(client: Client) {
    return this.https.post(this.urlClient, client);
  }

  //DELETE
  deleteDataById(index: number) {
    return this.https.delete<Client>(`${this.urlClient}/${index}`);
  }

  //UPDATE
  updateClient(index: number, client: Client) {
    return this.https.put<Client>(`${this.urlClient}/${index}`, client);
  }
}
