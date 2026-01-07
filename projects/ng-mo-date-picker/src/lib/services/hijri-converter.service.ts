import { Injectable } from "@angular/core";
import moment from 'moment-hijri';

@Injectable({
  providedIn: 'root'
})
export class HijriConverterService {

  gregorianToHijri(date: Date) {
    const m = moment(date);

    return {
      year: m.iYear(),
      month: m.iMonth() + 1,
      day: m.iDate()
    };
  }

  hijriToGregorian(year: number, month: number, day: number): Date {
    const m = moment(`${year}/${month}/${day}`, 'iYYYY/iM/iD');
    return m.toDate();
  }


  getMonthName(month: number): string {
    const months = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر',
      'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
      'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    return months[month - 1];
  }
}