# Ng-Mo-date-picker

<div dir="rtl" align="center">

## choose Readme in English
[![English](https://img.shields.io/badge/Language-English-blue?style=for-the-badge)](./README.md)
[![العربية](https://img.shields.io/badge/اللغة-العربية-green?style=for-the-badge)](./README.ar.md)

🗓️ **مكتبة Angular لاختيار التاريخ الهجري والميلادي مع دعم كامل للعربية والإنجليزية**

[![npm version](https://badge.fury.io/js/ng-mo-date-picker.svg)](https://www.npmjs.com/package/ng-mo-date-picker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🎮 معاينة مباشرة](https://3mowafy.github.io/ng-mo-date-picker/) • [📖 التوثيق](#-المدخلات-والمخرجات) • [💡 الأمثلة](#-أمثلة-الاستخدام)

</div>

---

## ✨ المميزات

- ✅ **نظامان للتقويم**: دعم كامل للتقويم الهجري (الإسلامي) والميلادي
- ✅ **ثنائي اللغة**: واجهة عربية وإنجليزية بالكامل
- ✅ **دعم الاتجاه التلقائي**: تبديل تلقائي بين RTL و LTR
- ✅ **متوافق مع النماذج**: يعمل مع Reactive Forms و Template-driven Forms و Signal Forms
- ✅ **خفيف وسريع**: حجم صغير (~50KB) مع الاعتماديات
- ✅ **مكون مستقل**: لا يحتاج استيراد modules (Angular 21+) 
- ✅ **قابل للتخصيص**: تخصيص كامل للأيقونات والألوان والأنماط
- ✅ **مكتوب بـ TypeScript**: دعم كامل لـ IntelliSense
- ✅ **إخراج شامل**: الحصول على التاريخ الميلادي والهجري معاً مع التنسيق الكامل

## 📦 التثبيت
```bash
npm install ng-mo-date-picker
```

**ملاحظة**: سيتم تثبيت `moment-hijri` تلقائياً كاعتمادية.

## 🚀 البدء السريع

### الخطوة الأولى: استيراد المكون

**Angular 21 Standalone:**
```typescript
import { Component } from '@angular/core';
import { NgMoDatePicker, DatePickerOutput } from 'ng-mo-date-picker';

@Component({
  selector: 'app-root',
  imports: [NgMoDatePicker],
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
      console.log('التاريخ الميلادي:', output.gregorianFormatted);
      console.log('التاريخ الهجري:', output.hijriFormatted);
      console.log('اسم الشهر:', output.hijriDate.monthName);
    }
  }
}
```

## 📚 أمثلة الاستخدام

### مثال أساسي (عربي)
```html
<ng-mo-date-picker [locale]="'ar'" />
```

### إنجليزي مع نص توضيحي مخصص
```html
<ng-mo-date-picker 
  [locale]="'en'"
  [placeholder]="'Pick a date'"
/>
```

### البدء بالتقويم الهجري
```html
<ng-mo-date-picker 
  [calendarType]="'hijri'"
  [locale]="'ar'"
/>
```

### تخصيص الأيقونة
```html
<!-- أيقونة مخصصة -->
<ng-mo-date-picker 
  [customIcon]="'🗓️'"
/>

<!-- إخفاء الأيقونة -->
<ng-mo-date-picker 
  [showIcon]="false"
/>
```

### الاستخدام مع Reactive Forms
```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgMoDatePicker } from 'ng-mo-date-picker';

@Component({
  imports: [NgMoDatePicker, ReactiveFormsModule],
  template: `
    <ng-mo-date-picker [formControl]="dateControl" />
    <p>التاريخ المختار: {{ dateControl.value | date }}</p>
  `
})
export class MyComponent {
  dateControl = new FormControl<Date | null>(null);
}
```

### الاستخدام مع Template-driven Forms
```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgMoDatePicker } from 'ng-mo-date-picker';

@Component({
  imports: [NgMoDatePicker, FormsModule],
  template: `
    <ng-mo-date-picker 
      [(ngModel)]="selectedDate"
      [locale]="'ar'"
    />
  `
})
export class MyComponent {
  selectedDate: Date | null = null;
}
```

### تخصيص الأنماط
```html
<ng-mo-date-picker 
  [inputClass]="'my-input'"
  [calendarClass]="'my-calendar'"
/>
```
```css
.my-input {
  border: 2px solid #3b82f6;
  border-radius: 12px;
  padding: 12px;
}

.my-calendar {
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}
```

## 🎛️ المدخلات والمخرجات

### المدخلات (Inputs)

| الاسم | النوع | القيمة الافتراضية | الوصف |
|------|------|---------|-------------|
| `calendarType` | `'gregorian' \| 'hijri'` | `'gregorian'` | نوع التقويم عند الفتح |
| `locale` | `'ar' \| 'en'` | `'ar'` | اللغة واتجاه النص |
| `showIcon` | `boolean` | `true` | إظهار أو إخفاء أيقونة التقويم |
| `customIcon` | `string` | `'📅'` | أيقونة مخصصة (emoji أو نص) |
| `inputClass` | `string` | `''` | CSS classes إضافية لحقل الإدخال |
| `calendarClass` | `string` | `''` | CSS classes إضافية للتقويم المنبثق |
| `disabled` | `boolean` | `false` | تعطيل المكون |
| `readonly` | `boolean` | `false` | جعل الحقل للقراءة فقط |
| `placeholder` | `string` | تلقائي حسب اللغة | النص التوضيحي |
| `name` | `string` | `undefined` | اسم الحقل (name attribute) |
| `id` | `string` | `undefined` | معرّف الحقل (id attribute) |
| `fluid` | `boolean` | `false` | جعل المكون بعرض كامل |
### المخرجات (Outputs)

| الاسم | النوع | الوصف |
|------|------|-------------|
| `dateChange` | `DatePickerOutput \| null` | يُطلق عند اختيار أو مسح التاريخ |
| `calendarToggle` | `boolean` | يُطلق عند فتح أو إغلاق التقويم |

### واجهة DatePickerOutput
```typescript
interface DatePickerOutput {
  // بيانات التاريخ الميلادي
  gregorianDate: Date;              // كائن Date الأصلي
  gregorianFormatted: string;       // "07/01/2026"
  
  // بيانات التاريخ الهجري
  hijriDate: {
    year: number;                   // 1446
    month: number;                  // 7
    monthName: string;              // "رجب" أو "Rajab"
    day: number;                    // 18
  };
  hijriFormatted: string;           // "18 رجب 1446 هـ"
  
  // معلومات إضافية
  calendarType: 'gregorian' | 'hijri';
  locale: 'ar' | 'en';
}
```

## 🎨 التخصيص المتقدم

### استخدام CSS Variables (قريباً في v2.0)
```css
.mo-calendar {
  --primary-color: #10b981;
  --hover-color: #059669;
}
```

### تجاوز الأنماط الافتراضية
```css
/* تخصيص اليوم المحدد */
.mo-day.selected {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* تخصيص زر التنقل */
.mo-nav-btn:hover {
  color: #10b981;
  transform: scale(1.1);
}
```

## 🌍 دعم اللغات (i18n)

المكون يتعامل تلقائياً مع:
- أسماء الأشهر (الميلادية والهجرية)
- أسماء الأيام
- نصوص الواجهة (اليوم، مسح، إلخ)
- اتجاه النص (RTL/LTR)

### التبديل بين اللغات
```typescript
@Component({
  template: `
    <ng-mo-date-picker [locale]="currentLang" />
    
    <button (click)="toggleLang()">
      تبديل اللغة
    </button>
  `
})
export class MyComponent {
  currentLang: 'ar' | 'en' = 'ar';
  
  toggleLang() {
    this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
  }
}
```

## 🔧 استخدامات متقدمة

### الاستماع لفتح وإغلاق التقويم
```typescript
@Component({
  template: `
    <ng-mo-date-picker 
      (calendarToggle)="onCalendarToggle($event)"
    />
  `
})
export class MyComponent {
  onCalendarToggle(isOpen: boolean) {
    console.log('التقويم الآن:', isOpen ? 'مفتوح' : 'مغلق');
  }
}
```

### الوصول للبيانات الكاملة
```typescript
onDateChange(output: DatePickerOutput | null) {
  if (!output) {
    console.log('تم مسح التاريخ');
    return;
  }

  // استخدام التاريخ الميلادي
  const jsDate = output.gregorianDate;
  console.log('التاريخ الميلادي:', output.gregorianFormatted);
  
  // استخدام التاريخ الهجري
  console.log('السنة الهجرية:', output.hijriDate.year);
  console.log('الشهر الهجري:', output.hijriDate.monthName);
  console.log('منسق:', output.hijriFormatted);
  
  // معرفة نوع التقويم المستخدم
  console.log('التقويم المستخدم:', output.calendarType);
}
```

## 📱 دعم المتصفحات

- Chrome (آخر إصدار)
- Firefox (آخر إصدار)
- Safari (آخر إصدار)
- Edge (آخر إصدار)

## 📋 سجل التحديثات

راجع [CHANGELOG.md](./CHANGELOG.md) لمعرفة تاريخ الإصدارات بالتفصيل.

## 🤝 المساهمة

المساهمات مرحب بها دائماً! لا تتردد في:

1. عمل Fork للمشروع
2. إنشاء branch للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'إضافة ميزة رائعة'`)
4. Push للـ branch (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## 🐛 الإبلاغ عن المشاكل

وجدت خطأ أو لديك اقتراح لميزة جديدة؟  
👉 [افتح issue على GitHub](https://github.com/3Mowafy/ng-mo-date-picker/issues)

## 📄 الترخيص

MIT © [Mohamed Mowafy](https://github.com/3Mowafy)

## 🔗 روابط مفيدة

- [📦 الحزمة على npm](https://www.npmjs.com/package/ng-mo-date-picker)
- [💻 المستودع على GitHub](https://github.com/3Mowafy/ng-mo-date-picker)
- [🎮 معاينة مباشرة](https://3mowafy.github.io/ng-mo-date-picker/)
- [🐛 الإبلاغ عن مشكلة](https://github.com/3Mowafy/ng-mo-date-picker/issues)
- [📖 التوثيق الكامل](https://github.com/3Mowafy/ng-mo-date-picker#readme)

## 🙏 شكر وتقدير

- بُني باستخدام [Angular](https://angular.io/)
- التحويل الهجري بواسطة [moment-hijri](https://github.com/xsoh/moment-hijri)

---

<div align="center">

**صُنع بـ ❤️ في مصر**

[Mohamed Mowafy](https://github.com/3Mowafy) • 2026

⭐ إذا أعجبتك المكتبة، لا تنسَ إعطائها نجمة على GitHub!

</div>