import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.interface';
import { FormService } from 'src/app/services/form.service';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  //Booleans to toggle off form for both POST and PUT https methods
  isFormOpened: boolean = false;
  isFormPutOpened: boolean = false;
  isTableUpdated: boolean = false;

  //reactiveForm data POST
  mainForm!: FormGroup;
  reactiveFormClient!: Client;

  //ReactiveForm For Fiscal Code
  fiscalForm!: FormGroup;
  isFiscalToggled: boolean = false;
  fiscalCode!: string;

  //variable for take the id
  idClient!: number;

  constructor(
    private formService: FormService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // INIT POST FORM

    this.mainForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      fiscalCode: new FormControl(this.fiscalCode, [
        Validators.required,
        Validators.pattern('^[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]$'),
      ]),
      dateOfBirth: new FormControl(null, [
        Validators.required,
        this.dateValidator,
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required),
      netWorth: new FormControl(null,[ Validators.required, this.customNumberValidator]),
    });

    this.fiscalForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, [
        Validators.required,
        this.dateValidator,
      ]),
      gender: new FormControl(null, Validators.required),
      placeOfBirth: new FormControl(null, Validators.required),
    });
  }
  // ------------------------------------Number Validator --------------------------------------------
  // Funzione del validator personalizzato
  customNumberValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (isNaN(value) || value < 0 || value > 100000000000000) {
    return { customNumber: true };
  }
  return null;
}

  //---------------------------------------------------------------------Date Validation, format DD/MM/YYYY-------------------------
  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return { invalidDate: true };
    }

    const parts = value.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return { invalidDate: true };
    }

    //---------------------------------------------------------------------Fiscal Code Validator-------------------------------------

    // Controllo per verificare la validità della data (ad esempio, non accettare il 30 febbraio)
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return { invalidDate: true };
    }

    return null;
  }

  onSubmitFiscalForm() {
    console.log(this.calculateCodiceFiscale(this.fiscalForm.value));
    this.mainForm
      .get('fiscalCode')
      ?.setValue(this.calculateCodiceFiscale(this.fiscalForm.value));
    this.isFiscalOpened();
  }

  isFiscalOpened() {
    this.isFiscalToggled = !this.isFiscalToggled;
  }

  // form method that store the content from the form into an object
  onSubmit() {
    if (this.mainForm.valid) {
      this.isTableUpdated = false;
      this.reactiveFormClient = this.mainForm.value;
      this.formService.sendData(this.reactiveFormClient).subscribe((res) => {
        console.log(this.reactiveFormClient);
        this.isTableUpdated = true;
      });
    } else {
      this.openSnackBar('The form is not Valid!!!');
      setTimeout(() => {
        this._snackBar.dismiss();
      }, 3000);
    }
  }

  //linked to *ngIf to toggle the form for POST
  openForm(): boolean {
    return (this.isFormOpened = !this.isFormOpened);
  }

  //Snackbar

  openSnackBar(message: string) {
    this._snackBar.open('The form is not Valid!!!');
  }

  calculateCodiceFiscale(data: any): string {
    const accentedChars = 'àèéìòù';
    const plainChars = 'aeiou';
    const name = data.name
      .toLowerCase()
      .replace(
        new RegExp(`[${accentedChars}]`, 'g'),
        (ch: string) => plainChars[accentedChars.indexOf(ch)]
      );
    const surname = data.surname
      .toLowerCase()
      .replace(
        new RegExp(`[${accentedChars}]`, 'g'),
        (ch: string) => plainChars[accentedChars.indexOf(ch)]
      );

    const consonantsName = name
      .split('')
      .filter((c: string) => c.match(/[a-z]/i) && !'aeiou'.includes(c))
      .slice(0, 3)
      .join('');
    const consonantsSurname = surname
      .split('')
      .filter((c: string) => c.match(/[a-z]/i) && !'aeiou'.includes(c))
      .slice(0, 3)
      .join('');

    const yearOfBirth = data.dateOfBirth.substr(data.dateOfBirth.length - 2, 2);

    const months = 'ABCDEHLMPRST';
    const monthOfBirth = months[parseInt(data.dateOfBirth.split('/')[1]) - 1];

    const dayOfBirth = data.dateOfBirth.split('/')[0];

    // Utilizziamo direttamente il codice fiscale del comune di Roma, invece di utilizzare un oggetto
    const comuneOfBirth = 'H501';

    const oddChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const evenChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const controlChar = oddChars[parseInt(dayOfBirth) - 1]
      ? data.gender === 'M'
        ? oddChars[parseInt(dayOfBirth) - 1]
        : evenChars[parseInt(dayOfBirth) + 9] // Cambio il carattere di controllo per giorni pari nel genere femminile
      : '';

    const codiceFiscale = `${consonantsSurname}${consonantsName}${yearOfBirth}${monthOfBirth}${dayOfBirth}${comuneOfBirth}${controlChar}`;

    return codiceFiscale.toUpperCase(); // Convertiamo tutto in maiuscolo
  }
}
