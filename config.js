// 📝 ملف الإعدادات - قم بتعديل البيانات هنا فقط
// Configuration File - Edit teacher data here

const CONFIG = {
  // المعلومات الأساسية - Basic Information
  teacher: {
    name: "[اسم المعلم]", // Teacher's name
    specialty: "[التخصص]", // Subject specialty
    school: "[اسم المدرسة]", // School name
    year: "[العام الدراسي]", // Academic year
    email: "[البريد الإلكتروني]", // Email (optional)
    phone: "[رقم التواصل]", // Phone number (optional)
    profileImage: "images/profile.jpg", // Profile picture
    coverImage: "images/cover.jpg" // Cover image
  },

  // الدورات التدريبية - Training Courses
  courses: [
    {
      id: 1,
      name: "[اسم الدورة الأولى]",
      provider: "[جهة التدريب]",
      date: "2024-01-15", // Format: YYYY-MM-DD
      hours: 30,
      description: "[وصف الدورة التدريبية]",
      certificate: "documents/course-1.pdf" // Leave as is if no file yet
    },
    {
      id: 2,
      name: "[اسم الدورة الثانية]",
      provider: "[جهة التدريب]",
      date: "2024-02-20",
      hours: 20,
      description: "[وصف الدورة التدريبية]",
      certificate: "documents/course-2.pdf"
    }
  ],

  // أوراق العمل - Worksheets
  worksheets: [
    {
      id: 1,
      name: "[اسم ورقة العمل]",
      subject: "[المادة/المجال]",
      grade: "[الصف أو الفئة]",
      description: "[وصف الورقة]",
      file: "documents/worksheet-1.pdf"
    },
    {
      id: 2,
      name: "[اسم ورقة العمل]",
      subject: "[المادة/المجال]",
      grade: "[الصف أو الفئة]",
      description: "[وصف الورقة]",
      file: "documents/worksheet-2.pdf"
    }
  ],

  // الخطط العلاجية - Therapeutic Plans
  therapeuticPlans: [
    {
      id: 1,
      studentCode: "[رمز الطالب]",
      goal: "[الهدف الرئيسي]",
      skills: "[المهارات المستهدفة]",
      actions: "[الإجراءات المتخذة]",
      duration: "[مدة الخطة]",
      results: "[النتائج المحققة]",
      evidence: "documents/plan-1.pdf"
    }
  ],

  // الشواهد - Evidences
  evidences: [
    {
      id: 1,
      title: "[عنوان الشاهد]",
      date: "2024-01-10", // Format: YYYY-MM-DD
      description: "[وصف الشاهد]",
      type: "image", // "image" or "pdf"
      file: "images/evidence-1.jpg"
    },
    {
      id: 2,
      title: "[عنوان الشاهد]",
      date: "2024-02-15",
      description: "[وصف الشاهد]",
      type: "pdf",
      file: "documents/evidence-1.pdf"
    }
  ],

  // مشاركة الأسرة - Family Participation
  familyParticipation: [
    {
      id: 1,
      title: "[عنوان اللقاء/المبادرة]",
      date: "2024-01-20", // Format: YYYY-MM-DD
      type: "[نوع: اجتماع/تواصل/مبادرة]",
      description: "[وصف النشاط]",
      image: "images/family-1.jpg",
      report: "documents/family-report-1.pdf"
    }
  ],

  // تقارير الأنشطة - Activity Reports
  activities: [
    {
      id: 1,
      name: "[اسم النشاط]",
      date: "2024-01-25", // Format: YYYY-MM-DD
      goal: "[الهدف من النشاط]",
      myRole: "[دوري في النشاط]",
      description: "[وصف تفصيلي للنشاط]",
      images: ["images/activity-1.jpg"], // Array of image paths
      report: "documents/activity-report-1.pdf"
    }
  ],

  // أهداف سياسة التعليم - Education Policy Objectives
  educationObjectives: [
    {
      id: 1,
      title: "تحسين جودة التعليم",
      description: "توفير بيئة تعليمية محفزة وآمنة تساهم في تحسين مخرجات التعليم"
    },
    {
      id: 2,
      title: "تطوير المهارات",
      description: "تنمية المهارات الأساسية والحياتية لدى الطلاب"
    },
    {
      id: 3,
      title: "الابتكار والإبداع",
      description: "تشجيع الفكر الإبداعي والابتكاري في العملية التعليمية"
    }
  ],

  // ميثاق الأخلاقيات - Ethics Charter
  ethicsCharter: {
    title: "ميثاق أخلاقيات مهنة التعليم",
    items: [
      "الالتزام بالمعايير الأخلاقية العالية في ممارسة المهنة",
      "احترام كرامة الطالب والمحافظة على حقوقه",
      "الإنصاف والعدالة في التعامل مع جميع الطلاب",
      "تطوير المهارات المهنية بشكل مستمر",
      "التعاون الفعال مع الزملاء والإدارة والأسرة"
    ]
  },

  // التطوير المهني - Professional Development
  professionalDevelopment: [
    {
      id: 1,
      title: "[مجال التطوير المهني]",
      activities: "[الأنشطة والبرامج التطويرية]",
      date: "2024-01-30" // Format: YYYY-MM-DD
    }
  ],

  // الإنجازات والمبادرات - Achievements and Initiatives
  achievements: [
    {
      id: 1,
      title: "[عنوان الإنجاز/المبادرة]",
      description: "[وصف الإنجاز والتأثير]",
      date: "2024-02-01", // Format: YYYY-MM-DD
      image: "images/achievement-1.jpg"
    }
  ]
};

// التحقق من أن الإعدادات تم تحميلها بنجاح
console.log('✓ تم تحميل ملف الإعدادات بنجاح');
