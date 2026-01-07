# ng-mo-date-picker

<div align="center">

[![English](https://img.shields.io/badge/Language-English-blue?style=for-the-badge)](./README.md)
[![العربية](https://img.shields.io/badge/اللغة-العربية-green?style=for-the-badge)](./README.ar.md)

🗓️ **Angular Hijri/Gregorian Date Picker with RTL/LTR support**

[![npm version](https://badge.fury.io/js/ng-mo-date-picker.svg)](https://www.npmjs.com/package/ng-mo-date-picker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/ng-mo-date-picker.svg)](https://www.npmjs.com/package/ng-mo-date-picker)

[Demo](https://3mowafy.github.io/ng-mo-date-picker/) • [Documentation](#-api-reference) • [Examples](#-usage-examples)

</div>
## ✨ Features

- ✅ **Dual Calendar System**: Hijri (Islamic) and Gregorian calendars
- ✅ **Bilingual**: Full Arabic and English support
- ✅ **RTL/LTR**: Automatic direction switching
- ✅ **Forms Ready**: Works with Reactive Forms, Template-driven Forms, and Signal Forms
- ✅ **Lightweight**: Only ~50KB (with moment-hijri dependency)
- ✅ **Standalone**: No module imports needed (Angular 21+)
- ✅ **Customizable**: Custom icons, styles, and behavior
- ✅ **TypeScript**: Fully typed with excellent IntelliSense support
- ✅ **Rich Output**: Get both Gregorian and Hijri dates with full formatting

## 📦 Installation
```bash
npm install ng-mo-date-picker
```

**Note**: `moment-hijri` will be installed automatically as a peer dependency.

## 🚀 Quick Start

### 1. Import the Component
```typescript
import { Component } from '@angular/core';
import { NgMoDatePicker, DatePickerOutput } from 'ng-mo-date-picker';

@Component({
  selector: 'app-root',
  imports: [NgMoDatePicker], // Standalone component
  template: `
    <ng-mo-date-picker 
      [locale]="'ar'"
      (dateChange)="onDateChange($event)"
    />
  `
})
export class AppComponent {
  onDateChange(output: DatePickerOutput | null) {
    if (output) {
      console.log('Gregorian:', output.gregorianFormatted);
      console.log('Hijri:', output.hijriFormatted);
      console.log('Month Name:', output.hijriDate.monthName);
    }
  }
}
```

## 📚 Usage Examples

### Basic Usage (Arabic)
```html
<ng-mo-date-picker [locale]="'ar'" />
```

### English with Custom Placeholder
```html
<ng-mo-date-picker 
  [locale]="'en'"
  [placeholder]="'Pick a date'"
/>
```

### Start with Hijri Calendar
```html
<ng-mo-date-picker 
  [calendarType]="'hijri'"
  [locale]="'ar'"
/>
```

### Custom Icon
```html
<ng-mo-date-picker 
  [customIcon]="'🗓️'"
/>

<!-- Or hide icon completely -->
<ng-mo-date-picker 
  [showIcon]="false"
/>
```

### With Reactive Forms
```typescript
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [NgMoDatePicker, ReactiveFormsModule],
  template: `
    <ng-mo-date-picker [formControl]="dateControl" />
    <p>Selected: {{ dateControl.value | date }}</p>
  `
})
export class MyComponent {
  dateControl = new FormControl<Date | null>(null);
}
```

### With Template-driven Forms
```html
<ng-mo-date-picker 
  [(ngModel)]="selectedDate"
  [locale]="'en'"
/>
```

### Custom Styling
```html
<ng-mo-date-picker 
  [inputClass]="'my-custom-input'"
  [calendarClass]="'my-custom-calendar'"
/>
```
```css
.my-custom-input {
  border: 2px solid #3b82f6;
  border-radius: 8px;
}

.my-custom-calendar {
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}
```

## 🎛️ API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `calendarType` | `'gregorian' \| 'hijri'` | `'gregorian'` | Initial calendar type to display |
| `locale` | `'ar' \| 'en'` | `'ar'` | Language and direction (RTL/LTR) |
| `showIcon` | `boolean` | `true` | Show/hide calendar icon |
| `customIcon` | `string` | `'📅'` | Custom icon (emoji or text) |
| `inputClass` | `string` | `''` | Additional CSS classes for input |
| `calendarClass` | `string` | `''` | Additional CSS classes for calendar popup |
| `disabled` | `boolean` | `false` | Disable the datepicker |
| `readonly` | `boolean` | `false` | Make input readonly |
| `placeholder` | `string` | Auto (based on locale) | Custom placeholder text |
| `name` | `string` | `undefined` | Input name attribute |
| `id` | `string` | `undefined` | Input id attribute |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `dateChange` | `DatePickerOutput \| null` | Emits when date is selected or cleared |
| `calendarToggle` | `boolean` | Emits when calendar opens/closes |

### DatePickerOutput Interface
```typescript
interface DatePickerOutput {
  // Gregorian date info
  gregorianDate: Date;
  gregorianFormatted: string; // "07/01/2026"
  
  // Hijri date info
  hijriDate: {
    year: number;           // 1446
    month: number;          // 7
    monthName: string;      // "Rajab" or "رجب"
    day: number;            // 18
  };
  hijriFormatted: string;   // "18 Rajab 1446 AH"
  
  // Meta info
  calendarType: 'gregorian' | 'hijri';
  locale: 'ar' | 'en';
}
```

## 🎨 Styling

The datepicker comes with clean, modern styles out of the box. You can customize it using:

1. **CSS Variables** (coming in v2.0)
2. **Custom Classes**: Use `inputClass` and `calendarClass` inputs
3. **Override Styles**: Target `.mo-datepicker-wrapper`, `.mo-calendar`, etc.

### Example Custom Theme
```css
.mo-calendar {
  --primary-color: #10b981;
  --hover-color: #059669;
}

.mo-day.selected {
  background: var(--primary-color);
}

.mo-day:hover {
  background: var(--hover-color);
}
```

## 🌍 i18n Support

The component automatically handles:
- Month names (Gregorian and Hijri)
- Day names
- UI labels (Today, Clear, etc.)
- Text direction (RTL/LTR)

Switch between languages:
```html
<ng-mo-date-picker [locale]="currentLocale" />

<button (click)="currentLocale = currentLocale === 'ar' ? 'en' : 'ar'">
  Toggle Language
</button>
```

## 🔧 Advanced Usage

### Listen to Calendar Toggle
```html
<ng-mo-date-picker 
  (calendarToggle)="onCalendarToggle($event)"
/>
```
```typescript
onCalendarToggle(isOpen: boolean) {
  console.log('Calendar is now:', isOpen ? 'open' : 'closed');
}
```

### Access Full Date Info
```typescript
onDateChange(output: DatePickerOutput | null) {
  if (!output) {
    console.log('Date cleared');
    return;
  }

  // Use Gregorian
  const jsDate = output.gregorianDate;
  console.log('Gregorian:', output.gregorianFormatted);
  
  // Use Hijri
  console.log('Hijri Year:', output.hijriDate.year);
  console.log('Hijri Month:', output.hijriDate.monthName);
  console.log('Formatted:', output.hijriFormatted);
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Issues

Found a bug or have a feature request?  
👉 [Open an issue on GitHub](https://github.com/3Mowafy/ng-mo-date-picker/issues)

## 📄 License

MIT © [Mohamed Mowafy](https://github.com/3Mowafy)

## 🔗 Links

- [GitHub Repository](https://github.com/3Mowafy/ng-mo-date-picker)
- [npm Package](https://www.npmjs.com/package/ng-mo-date-picker)
- [Issues](https://github.com/3Mowafy/ng-mo-date-picker/issues)
- [Demo](https://github.com/3Mowafy/ng-mo-date-picker#demo) *(coming soon)*

## 🙏 Acknowledgments

- Built with [Angular](https://angular.io/)
- Hijri conversion powered by [moment-hijri](https://github.com/xsoh/moment-hijri)

---

Made with ❤️ by [Mohamed Mowafy](https://github.com/3Mowafy)