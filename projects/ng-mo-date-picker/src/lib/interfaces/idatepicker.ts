export interface DatePickerOutput {
  gregorianDate: Date;
  gregorianFormatted: string;
  
  hijriDate: {
    year: number;
    month: number;
    monthName: string; 
    day: number;
  };
  hijriFormatted: string;
  
  calendarType: 'gregorian' | 'hijri';
  locale: 'ar' | 'en';
}