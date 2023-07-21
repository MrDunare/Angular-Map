import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.interface';
import { FormService } from 'src/app/services/form.service';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  /*
   *  Booleans Variables used as Params. for *ngIf from template.
   */
  isFormOpened: boolean = false;
  isFormPutOpened: boolean = false;
  isTableUpdated: boolean = false;
  isFiscalToggled: boolean = false;

  /**
   * variable to store Data from backend and form for POST request
   */
  mainForm!: FormGroup;
  reactiveFormClient!: Client;

  /**
   * Form and variable for fiscalCode
   */
  fiscalForm!: FormGroup;
  fiscalCode!: string;

  /**
   *  Variable to store ID from table
   */
  idClient!: number;

  constructor(
    private formService: FormService,
    private _snackBar: MatSnackBar
  ) {}

  /**
   *
   * ------------------------------------------------------------------------------Validators:   ---------------------------------------------------------------------------------------------------------
   *
   */

  // ------------------------------------Number Validator --------------------------
  customNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (isNaN(value) || value < 0 || value > 100000000000000) {
      return { customNumber: true };
    }
    return null;
  }

  //- -------------------Date Validation, format DD/MM/YYYY-------------------------
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

    //------------------------------------Fiscal Code Validator-------------------------

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

  /**
   *  Submit the data coming from the fiscal code generator Form
   */
  onSubmitFiscalForm() {
    console.log(this.calculateCodiceFiscale(this.fiscalForm.value));
    this.mainForm
      .get('fiscalCode')
      ?.setValue(this.calculateCodiceFiscale(this.fiscalForm.value));
    this.isFiscalOpened();
  }

  /**
   * Function to toggle off and on the fiscal code Form usign the boolean value of isFiscalToggled
   */
  isFiscalOpened() {
    this.isFiscalToggled = !this.isFiscalToggled;
  }

  /**
   * This commando from the POST form serves the function to create an Object to send to Backend usign the form values.
   * if the form user inputs are invalid, the code in the else block takes place and produce a message for the user.
   */
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
  /**
   *
   * snackbar Function
   */
  openSnackBar(message: string) {
    this._snackBar.open('The form is not Valid!!!');
  }

  /**
   * Function to toggle off and on POST Form usign the boolean value of isFormOpened
   */
  openForm(): boolean {
    return (this.isFormOpened = !this.isFormOpened);
  }

  //Snackbar

  /**
 * 
    Viene definita una lista di caratteri accentati accentedChars e una lista di caratteri non accentati corrispondenti plainChars.
    Il nome e il cognome forniti come input vengono convertiti in lettere minuscole e gli accenti vengono sostituiti con i caratteri non accentati corrispondenti. Questo viene fatto per evitare problemi di confronto con i caratteri accentati durante la creazione del Codice Fiscale.
    Vengono estratte le prime tre consonanti dal nome e dal cognome (consonantsName e consonantsSurname) dopo aver rimosso le vocali. Queste saranno utilizzate per formare una parte del Codice Fiscale.
    Viene estratto l'anno di nascita (yearOfBirth) dalle informazioni fornite sulla data di nascita.
    Viene mappato il mese di nascita (monthOfBirth) in una lettera corrispondente utilizzando la seguente corrispondenza: A = gennaio, B = febbraio, C = marzo, D = aprile, E = maggio, H = giugno, L = luglio, M = agosto, P = settembre, R = ottobre, S = novembre, T = dicembre.
    Viene estratto il giorno di nascita (dayOfBirth) dalle informazioni fornite sulla data di nascita.
    Viene assegnato un codice fiscale fisso (comuneOfBirth) per il comune di nascita. In questo caso, è utilizzato il codice fiscale per il comune di Roma (H501).
    Viene calcolato il carattere di controllo (controlChar) che varia in base al giorno di nascita e al genere. Se il giorno di nascita è dispari, viene utilizzato un carattere specifico. Se il giorno di nascita è pari e il genere è femminile, viene utilizzato un altro carattere.
    Il codice fiscale completo viene creato concatenando le diverse parti nel seguente ordine: consonantsSurname + consonantsName + yearOfBirth + monthOfBirth + dayOfBirth + comuneOfBirth + controlChar.
    Infine, il codice fiscale completo viene convertito in maiuscolo (toUpperCase()) e restituito come risultato della funzione.
 */
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

  /**
   * INIT COMPONENTE
   */
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
      netWorth: new FormControl(null, [
        Validators.required,
        this.customNumberValidator,
      ]),
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
}
