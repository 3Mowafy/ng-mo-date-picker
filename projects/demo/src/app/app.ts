import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { DatePickerOutput, NgMoDatePicker } from '../../../ng-mo-date-picker/src/public-api';

@Component({
  selector: 'app-root',
  imports: [NgMoDatePicker, JsonPipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  selectedDate = signal<Date | null>(new Date());
  selectedDateInfo = signal<DatePickerOutput | null>(null);

  example1 = `<ng-mo-date-picker [locale]="'ar'" />`;
  example2 = `<ng-mo-date-picker [locale]="'en'" 
  [placeholder]="'Select a date'" />`;
  example3 = `<ng-mo-date-picker [calendarType]="'hijri'" />`;
  example4 = `<ng-mo-date-picker [customIcon]="'🗓️'" />
<ng-mo-date-picker [showIcon]="false" />`;
  example5 = `<ng-mo-date-picker [disabled]="true" />`;

  onDateChange(output: DatePickerOutput | null) {
    console.log('Date changed:', output);
    if (output) {
      this.selectedDateInfo.set(output);
      console.log(output.hijriFormatted);
      console.log(output.hijriDate.monthName);
      console.log(output.gregorianFormatted);
    } else {
      this.selectedDateInfo.set(null);
    }
  }


}