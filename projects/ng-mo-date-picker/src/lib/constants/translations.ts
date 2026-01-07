export const TRANSLATIONS = {
    ar: {
        gregorianMonths: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
            'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        hijriMonths: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى',
            'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
        days: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
        today: 'اليوم',
        clear: 'مسح',
        gregorian: 'ميلادي',
        hijri: 'هجري',
        placeholder: 'اختر تاريخ'
    },
    en: {
        gregorianMonths: ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'],
        hijriMonths: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Awwal',
            'Jumada al-Thani', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'],
        days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        today: 'Today',
        clear: 'Clear',
        gregorian: 'Gregorian',
        hijri: 'Hijri',
        placeholder: 'Select date'
    }
} as const;

export type Locale = keyof typeof TRANSLATIONS;