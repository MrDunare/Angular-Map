import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/models/client.interface';
import { FormService } from 'src/app/services/form.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  clients!: Client[];
  isFormOpened: boolean = false;
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService.getData().subscribe((data) => {
      console.log(data);
      this.clients = data;
      console.log(this.clients);
    });
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  openForm(): boolean {
    return (this.isFormOpened = !this.isFormOpened);
  }
}
