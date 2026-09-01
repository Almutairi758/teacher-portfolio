# 📚 ملف الإنجاز المهني الإلكتروني للمعلم
# Teacher Professional Portfolio

## 🎯 مرحباً بك!

هذا المشروع عبارة عن موقع ويب متكامل وحديث لملف إنجاز المعلم. يعمل بشكل مثالي على الهاتف والكمبيوتر، وقابل للطباعة كملف PDF احترافي.

---

## ✨ المميزات الرئيسية

✅ **سهل الاستخدام** - لا تحتاج لخبرة برمجية  
✅ **تصميم احترافي** - يدعم جميع الأجهزة (iPhone, Android, Desktop)  
✅ **RTL عربي** - واجهة عربية كاملة  
✅ **قابل للطباعة** - اطبع PDF بجودة عالية وحجم A4  
✅ **سريع** - يعمل مباشرة على GitHub Pages بدون سيرفر  
✅ **آمن** - لا توجد قاعدة بيانات أو backend  

---

## 🚀 البدء السريع

### الخطوة 1️⃣: تحميل الملفات

1. اذهب إلى https://github.com/Almutairi758/teacher-portfolio
2. انقر الزر الأخضر `Code` → `Download ZIP`
3. استخرج الملفات

### الخطوة 2️⃣: فتح الملفات

```
teacher-portfolio/
├── index.html          ← الصفحة الرئيسية
├── style.css           ← التصميم
├── script.js           ← الوظائف
├── config.js           ← ⭐ عدّل هنا
├── images/             ← صورك
└── documents/          ← ملفات PDF
```

### الخطوة 3️⃣: تعديل بيانات المعلم

**افتح ملف `config.js` واعدل:**

```javascript
const CONFIG = {
  teacher: {
    name: "أحمد محمد",         // ✏️ اسمك
    specialty: "اللغة العربية",  // ✏️ تخصصك
    school: "مدرسة الأمل",       // ✏️ مدرستك
    year: "1445-1446",           // ✏️ السنة الدراسية
    email: "your@email.com",     // ✏️ بريدك (اختياري)
    phone: "+966 50 1234567",    // ✏️ رقمك (اختياري)
    profileImage: "images/profile.jpg",  // صورتك
    coverImage: "images/cover.jpg"       // صورة الغلاف
  },
  courses: [ /* أضف دوراتك */ ],
  // الأقسام الأخرى...
};
```

### الخطوة 4️⃣: إضافة الصور

ضع الصور في مجلد `images/`:
- `profile.jpg` - صورتك الشخصية
- `cover.jpg` - صورة الغلاف

**الموقع سيعمل بدون صور - ستظهر صور placeholder جميلة!**

### الخطوة 5️⃣: اختبار الموقع محليًا

افتح `index.html` بالماوس (انقر مرتين) أو بالمتصفح.

---

## 📝 شرح الأقسام

### الدورات التدريبية
في `config.js`:

```javascript
courses: [
  {
    id: 1,
    name: "دورة التعليم الرقمي",
    provider: "وزارة التعليم",
    date: "2024-01-15",        // YYYY-MM-DD
    hours: 30,
    description: "وصف الدورة",
    certificate: "documents/course-1.pdf"
  }
]
```

### أوراق العمل
في `config.js`:

```javascript
worksheets: [
  {
    id: 1,
    name: "ورقة عمل 1",
    subject: "اللغة العربية",
    grade: "الصف الثالث",
    description: "النشاط",
    file: "documents/worksheet-1.pdf"
  }
]
```

### الخطط العلاجية
في `config.js`:

```javascript
therapeuticPlans: [
  {
    id: 1,
    studentCode: "ط001",         // رمز الطالب (ليس الاسم)
    goal: "تحسين القراءة",
    skills: "الفهم والاستيعاب",
    actions: "جلسات علاجية",
    duration: "3 أشهر",
    results: "تحسن ملحوظ",
    evidence: "documents/plan-1.pdf"
  }
]
```

### الشواهد
في `config.js`:

```javascript
evidences: [
  {
    id: 1,
    title: "شاهد من الورشة",
    date: "2024-01-10",
    description: "شهادة حضور",
    type: "image",              // "image" أو "pdf"
    file: "images/evidence-1.jpg"
  }
]
```

### مشاركة الأسرة
في `config.js`:

```javascript
familyParticipation: [
  {
    id: 1,
    title: "اجتماع الأسرة",
    date: "2024-01-20",
    type: "اجتماع",
    description: "اجتماع شهري",
    image: "images/family-1.jpg",
    report: "documents/family-report-1.pdf"
  }
]
```

### الأنشطة المدرسية
في `config.js`:

```javascript
activities: [
  {
    id: 1,
    name: "مسابقة الإملاء",
    date: "2024-01-25",
    goal: "تحسين الإملاء",
    myRole: "منسق",
    description: "وصف النشاط",
    images: ["images/activity-1.jpg"],
    report: "documents/activity-report-1.pdf"
  }
]
```

---

## 🌐 رفع إلى GitHub Pages

### الخطوة 1: رفع الملفات

1. اذهب إلى: github.com/Almutairi758/teacher-portfolio
2. انقر **Add file** → **Upload files**
3. اسحب جميع الملفات والمجلدات
4. اكتب: `Initial commit`
5. انقر **Commit changes**

### الخطوة 2: تفعيل GitHub Pages

1. اذهب إلى **Settings** → **Pages**
2. اختر **Deploy from a branch**
3. اختر **main** و **root**
4. انقر **Save**

### الخطوة 3: الحصول على الرابط

بعد دقائق، سيظهر الرابط:
```
https://almutairi758.github.io/teacher-portfolio/
```

---

## 🖨️ طباعة PDF

1. افتح الموقع
2. انقر **طباعة/PDF**
3. اختر **Save as PDF**
4. احفظ الملف

---

## ❓ أسئلة

**س: ماذا لو لم أضع صورة؟**  
ج: لا مشكلة - سيظهر placeholder جميل.

**س: كيف أضيف دورة جديدة؟**  
ج: افتح `config.js`، اذهب إلى `courses`، أضف كائن جديد.

**س: كيف أضيف شاهدًا جديدًا؟**  
ج: افتح `config.js`، اذهب إلى `evidences`، أضف كائن جديد.

**س: الموقع يعمل على iPhone؟**  
ج: نعم! تم اختباره على جميع الأجهزة.

**س: هل يحتاج برامج خاصة؟**  
ج: لا! يعمل في أي متصفح.

---

## 📁 أسماء الملفات

**الصور:**
- `images/profile.jpg` - صورتك (250x300)
- `images/cover.jpg` - غلاف (800x600)
- `images/evidence-*.jpg` - شواهد
- `images/family-*.jpg` - أسرة
- `images/activity-*.jpg` - أنشطة
- `images/achievement-*.jpg` - إنجازات

**المستندات:**
- `documents/course-*.pdf` - شهادات
- `documents/worksheet-*.pdf` - أوراق عمل
- `documents/plan-*.pdf` - خطط
- `documents/evidence-*.pdf` - شواهد PDF
- `documents/family-report-*.pdf` - تقارير
- `documents/activity-report-*.pdf` - تقارير أنشطة

---

## ✅ قائمة تجهيز

- [ ] عدلت البيانات الشخصية
- [ ] أضفت الصور
- [ ] أضفت الدورات
- [ ] أضفت الشواهد
- [ ] أضفت الأنشطة
- [ ] رفعت إلى GitHub
- [ ] فعلت GitHub Pages
- [ ] اختبرت على الهاتف

---

## 🎉 تم!

موقعك جاهز! شارك الرابط مع الجميع.

**استمتع بملفك الإنجازي الاحترافي!** 🌟
