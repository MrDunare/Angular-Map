import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.interface';
import { FormService } from 'src/app/services/form.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  isFormOpened: boolean = false;
  isTableUpdated : boolean = false

  //reactiveForm prova
  mainForm!: FormGroup;
  reactiveFormClient!: Client;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    // reactive form init

    this.mainForm = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      fiscalCode: new FormControl(),
      dateOfBirth: new FormControl(),
      email: new FormControl(),
      username: new FormControl(),
      netWorth: new FormControl(),
    });

    this.formService.getData().subscribe((data) => {
      console.log(data);
    });
  }

  // form method that store the content from the form into an object
  onSubmit() {
    this.isTableUpdated = false
    this.reactiveFormClient = this.mainForm.value;
    this.formService
      .sendData(this.reactiveFormClient)
      .subscribe((res) => {
        console.log(this.reactiveFormClient);
        this.isTableUpdated = true
      });
  }

  //linked to *ngIf to toggle the form
  openForm(): boolean {
    return (this.isFormOpened = !this.isFormOpened);
  }
}
