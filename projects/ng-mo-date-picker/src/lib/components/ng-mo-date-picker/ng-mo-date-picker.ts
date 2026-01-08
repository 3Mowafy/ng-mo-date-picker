import { ChangeDetectionStrategy, Component, computed, effect, forwardRef, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { HijriConverterService } from '../../services/hijri-converter.service';
import { ClickOutside } from '../../directives/click-outside';
import { DatePickerOutput } from '../../interfaces/idatepicker';
import { TRANSLATIONS } from '../../constants/translations';

@Component({
  selector: 'ng-mo-date-picker',
  imports: [CommonModule, ClickOutside],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgMoDatePicker),
      multi: true
    }
  ],
  templateUrl: './ng-mo-date-picker.html',
  styleUrls: ['./ng-mo-date-picker.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgMoDatePicker {

  // ==================== INPUTS ====================
  calendarType = input<'gregorian' | 'hijri'>('gregorian');
  locale = input<'ar' | 'en'>('ar');
  showIcon = input<boolean>(true);
  customIcon = input<string>('📅');
  inputClass = input<string>('');
  calendarClass = input<string>('');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  placeholder = input<string | undefined>(undefined);
  name = input<string | undefined>(undefined);
  id = input<string | undefined>(undefined);
  fluid = input<boolean>(false);

  // ==================== OUTPUTS ====================
  dateChange = output<DatePickerOutput | null>();
  calendarToggle = output<boolean>();

  // ==================== SERVICES ====================
  private hijriService = inject(HijriConverterService);

  // ==================== STATE SIGNALS ====================
  internalCalendarType = signal<'gregorian' | 'hijri'>('gregorian');
  selectedDate = signal<Date | null>(null);
  isOpen = signal<boolean>(false);

  // Gregorian state
  currentMonth = signal<number>(new Date().getMonth());
  currentYear = signal<number>(new Date().getFullYear());

  // Hijri state
  currentHijriMonth = signal<number>(1);
  currentHijriYear = signal<number>(1446);

  // Calendar days
  days = signal<Array<{
    date: Date | null;
    day: number | null;
    isEmpty: boolean;
  }>>([]);

  // ==================== COMPUTED SIGNALS ====================
  translations = computed(() => TRANSLATIONS[this.locale()]);

  daysShortNames = computed(() => this.translations().days);

  monthName = computed(() => {
    if (this.internalCalendarType() === 'hijri') {
      return this.translations().hijriMonths[this.currentHijriMonth() - 1];
    }
    return this.translations().gregorianMonths[this.currentMonth()];
  });

  currentYearDisplay = computed(() =>
    this.internalCalendarType() === 'hijri'
      ? this.currentHijriYear()
      : this.currentYear()
  );

  formattedDate = computed(() => {
    if (!this.selectedDate()) return '';
    const date = this.selectedDate()!;
    if (this.internalCalendarType() === 'hijri') {
      const hijri = this.hijriService.gregorianToHijri(date);
      return `${hijri.day}/${hijri.month}/${hijri.year}`;
    }
    return this.formatGregorianDate(date);
  });

  placeholderText = computed(() =>
    this.placeholder() || this.translations().placeholder
  );

  // CSS Classes Computed Signals
  wrapperCssClasses = computed(() => ({
    'mo-datepicker-wrapper': true,
    'mo-fluid': this.fluid(),
    'rtl': this.locale() === 'ar',
    'ltr': this.locale() === 'en'
  }));

  inputCssClasses = computed(() => ({
    'mo-input': true,
    'rtl': this.locale() === 'ar',
    'ltr': this.locale() === 'en',
    [this.inputClass()]: !!this.inputClass()
  }));

  iconBtnCssClasses = computed(() => ({
    'mo-icon-btn': true,
    'rtl': this.locale() === 'ar',
    'ltr': this.locale() === 'en'
  }));

  calendarCssClasses = computed(() => ({
    'mo-calendar': true,
    'rtl': this.locale() === 'ar',
    'ltr': this.locale() === 'en',
    [this.calendarClass()]: !!this.calendarClass()
  }));

  // Date Comparison Optimization
  private selectedDateTimestamp = computed(() => {
    const date = this.selectedDate();
    if (!date) return null;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  });

  private readonly todayTimestamp = (() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  })();

  // ==================== FORMS INTEGRATION ====================
  private onChange: any = () => { };
  private onTouched: any = () => { };

  writeValue(value: Date | null): void {
    this.selectedDate.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // ==================== LIFECYCLE ====================
  constructor() {
    const today = new Date();
    const hijriToday = this.hijriService.gregorianToHijri(today);
    this.currentHijriYear.set(hijriToday.year);
    this.currentHijriMonth.set(hijriToday.month);

    effect(() => {
      this.internalCalendarType.set(this.calendarType());
    });

    effect(() => {
      this.currentMonth();
      this.currentYear();
      this.currentHijriMonth();
      this.currentHijriYear();
      this.internalCalendarType();
      this.generateCalendar();
    });
  }

  // ==================== CALENDAR GENERATION ====================
  generateCalendar() {
    if (this.internalCalendarType() === 'hijri') {
      this.generateHijriCalendar();
    } else {
      this.generateGregorianCalendar();
    }
  }

  private generateGregorianCalendar() {
    const year = this.currentYear();
    const month = this.currentMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const emptyDays = Array.from(
      { length: startDayOfWeek },
      () => ({
        date: null,
        day: null,
        isEmpty: true
      })
    );

    const monthDays = Array.from(
      { length: daysInMonth },
      (_, i) => ({
        date: new Date(year, month, i + 1),
        day: i + 1,
        isEmpty: false
      })
    );



    this.days.set([...emptyDays, ...monthDays]);
  }

  private generateHijriCalendar() {
    const year = this.currentHijriYear();
    const month = this.currentHijriMonth();

    const firstDayGregorian = this.hijriService.hijriToGregorian(year, month, 1);
    const startDayOfWeek = firstDayGregorian.getDay();

    const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    const daysInMonth = monthLengths[month - 1];

    const emptyDays = Array.from(
      { length: startDayOfWeek },
      () => ({
        date: null,
        day: null,
        isEmpty: true
      })
    );

    const monthDays = Array.from(
      { length: daysInMonth },
      (_, i) => {
        const gregorianDate = this.hijriService.hijriToGregorian(year, month, i + 1);
        return {
          date: gregorianDate,
          day: i + 1,
          isEmpty: false
        };
      }
    );



    this.days.set([...emptyDays, ...monthDays]);
  }

  // ==================== NAVIGATION ====================
  previousMonth() {
    if (this.internalCalendarType() === 'hijri') {
      if (this.currentHijriMonth() === 1) {
        this.currentHijriMonth.set(12);
        this.currentHijriYear.update(y => y - 1);
      } else {
        this.currentHijriMonth.update(m => m - 1);
      }
    } else {
      if (this.currentMonth() === 0) {
        this.currentMonth.set(11);
        this.currentYear.update(y => y - 1);
      } else {
        this.currentMonth.update(m => m - 1);
      }
    }
  }

  nextMonth() {
    if (this.internalCalendarType() === 'hijri') {
      if (this.currentHijriMonth() === 12) {
        this.currentHijriMonth.set(1);
        this.currentHijriYear.update(y => y + 1);
      } else {
        this.currentHijriMonth.update(m => m + 1);
      }
    } else {
      if (this.currentMonth() === 11) {
        this.currentMonth.set(0);
        this.currentYear.update(y => y + 1);
      } else {
        this.currentMonth.update(m => m + 1);
      }
    }
  }

  // ==================== DATE SELECTION ====================
  selectDate(day: { date: Date | null; day: number | null; isEmpty: boolean }) {
    if (day.isEmpty || !day.date) return;

    this.selectedDate.set(day.date);

    const hijri = this.hijriService.gregorianToHijri(day.date);

    const output: DatePickerOutput = {
      gregorianDate: day.date,
      gregorianFormatted: this.formatGregorianDate(day.date),
      hijriDate: {
        ...hijri,
        monthName: this.translations().hijriMonths[hijri.month - 1]
      },
      hijriFormatted: this.formatHijriDate(hijri),
      calendarType: this.internalCalendarType(),
      locale: this.locale()
    };

    this.onChange(day.date);
    this.onTouched();
    this.dateChange.emit(output);
    this.isOpen.set(false);
  }

  selectToday() {
    const today = new Date();
    this.selectedDate.set(today);
    this.currentMonth.set(today.getMonth());
    this.currentYear.set(today.getFullYear());

    const hijri = this.hijriService.gregorianToHijri(today);
    this.currentHijriYear.set(hijri.year);
    this.currentHijriMonth.set(hijri.month);

    const output: DatePickerOutput = {
      gregorianDate: today,
      gregorianFormatted: this.formatGregorianDate(today),
      hijriDate: {
        ...hijri,
        monthName: this.translations().hijriMonths[hijri.month - 1]
      },
      hijriFormatted: this.formatHijriDate(hijri),
      calendarType: this.internalCalendarType(),
      locale: this.locale()
    };

    this.onChange(today);
    this.onTouched();
    this.dateChange.emit(output);
    this.isOpen.set(false);
  }

  clearDate() {
    this.selectedDate.set(null);
    this.onChange(null);
    this.onTouched();
    this.dateChange.emit(null);
    this.isOpen.set(false);
  }

  // ==================== UI INTERACTIONS ====================
  toggleCalendar() {
    const wasOpen = this.isOpen();
    this.isOpen.update(val => !val);
    this.calendarToggle.emit(this.isOpen());

    if (!wasOpen && this.isOpen()) {
      const reference = this.selectedDate() || new Date();
      this.currentMonth.set(reference.getMonth());
      this.currentYear.set(reference.getFullYear());

      const hijri = this.hijriService.gregorianToHijri(reference);
      this.currentHijriYear.set(hijri.year);
      this.currentHijriMonth.set(hijri.month);
    }
  }

  setCalendarType(type: 'gregorian' | 'hijri') {
    this.internalCalendarType.set(type);
    const referenceDate = this.selectedDate() || new Date();

    if (type === 'hijri') {
      const hijri = this.hijriService.gregorianToHijri(referenceDate);
      this.currentHijriYear.set(hijri.year);
      this.currentHijriMonth.set(hijri.month);
    } else {
      this.currentMonth.set(referenceDate.getMonth());
      this.currentYear.set(referenceDate.getFullYear());
    }
  }

  onClickOutside() {
    if (this.isOpen()) {
      this.isOpen.set(false);
    }
  }

  // ==================== HELPERS ====================
  isSelected(day: { date: Date | null; day: number | null; isEmpty: boolean }): boolean {
    if (!day.date || day.isEmpty) return false;
    const timestamp = this.selectedDateTimestamp();
    if (!timestamp) return false;

    const dayTimestamp = new Date(
      day.date.getFullYear(),
      day.date.getMonth(),
      day.date.getDate()
    ).getTime();

    return dayTimestamp === timestamp;
  }

  isToday(day: { date: Date | null; day: number | null; isEmpty: boolean }): boolean {
    if (!day.date || day.isEmpty) return false;

    const dayTimestamp = new Date(
      day.date.getFullYear(),
      day.date.getMonth(),
      day.date.getDate()
    ).getTime();

    return dayTimestamp === this.todayTimestamp;
  }

  // ==================== FORMATTING ====================
  private formatGregorianDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private formatHijriDate(hijri: { year: number; month: number; day: number }): string {
    const monthName = this.translations().hijriMonths[hijri.month - 1];
    const suffix = this.locale() === 'ar' ? 'هـ' : 'AH';
    return `${hijri.day} ${monthName} ${hijri.year} ${suffix}`;
  }
}