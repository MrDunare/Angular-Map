import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/models/client.interface';
import { FormService } from 'src/app/services/form.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  //reactiveForm prova
  mainForm!: FormGroup;
  reactiveFormClient!: object

  clients!: Client[];
  isFormOpened: boolean = false;
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    //sempre prova reactive forms
    this.mainForm = new FormGroup({
      name: new FormControl('tonino'),
      surname: new FormControl(),
      fiscalCode: new FormControl(),
      dateOfBirth: new FormControl(),
      email: new FormControl(),
      username: new FormControl(),
      networth: new FormControl(),
    });

    this.formService.getData().subscribe((data) => {
      console.log(data);
      this.clients = data;
      console.log(this.clients);
    });
  }
  onSubmit() {
    this.reactiveFormClient = this.mainForm.value
    console.log(this.reactiveFormClient)
  }

  openForm(): boolean {
    return (this.isFormOpened = !this.isFormOpened);
  }
}
