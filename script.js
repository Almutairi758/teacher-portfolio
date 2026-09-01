// ================================================================
// سكريبت التفاعل الرئيسي - Main Interactive Script
// ================================================================

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
  initializePortfolio();
  populateAllSections();
  setupEventListeners();
});

// ================================================================
// تهيئة الموقع - Initialize Portfolio
// ================================================================

function initializePortfolio() {
  // تحديث بيانات المعلم في غلاف الصفحة
  updateTeacherData();
}

// تحديث بيانات المعلم
function updateTeacherData() {
  // Cover Page
  document.getElementById('teacherName').textContent = CONFIG.teacher.name;
  document.getElementById('teacherSpecialty').textContent = CONFIG.teacher.specialty;
  document.getElementById('teacherSchool').textContent = CONFIG.teacher.school;
  document.getElementById('teacherYear').textContent = CONFIG.teacher.year;
  document.getElementById('coverImg').src = CONFIG.teacher.coverImage;

  // Biography Section
  document.getElementById('bioName').textContent = CONFIG.teacher.name;
  document.getElementById('bioSpecialty').textContent = CONFIG.teacher.specialty;
  document.getElementById('bioSchool').textContent = CONFIG.teacher.school;
  document.getElementById('bioProfileImg').src = CONFIG.teacher.profileImage;

  // Show/Hide contact info
  if (CONFIG.teacher.email && CONFIG.teacher.email !== '[البريد الإلكتروني]') {
    document.getElementById('emailItem').style.display = 'block';
    document.getElementById('bioEmail').textContent = CONFIG.teacher.email;
  } else {
    document.getElementById('emailItem').style.display = 'none';
  }

  if (CONFIG.teacher.phone && CONFIG.teacher.phone !== '[رقم التواصل]') {
    document.getElementById('phoneItem').style.display = 'block';
    document.getElementById('bioPhone').textContent = CONFIG.teacher.phone;
  } else {
    document.getElementById('phoneItem').style.display = 'none';
  }
}

// ================================================================
// ملء جميع الأقسام - Populate All Sections
// ================================================================

function populateAllSections() {
  populateObjectives();
  populateEthics();
  populateCourses();
  populateWorksheets();
  populatePlans();
  populateEvidences();
  populateFamily();
  populateActivities();
  populateProfessionalDev();
  populateAchievements();
}

// الأهداف التعليمية
function populateObjectives() {
  const container = document.getElementById('objectivesList');
  container.innerHTML = '';

  CONFIG.educationObjectives.forEach(obj => {
    const card = document.createElement('div');
    card.className = 'objective-card';
    card.innerHTML = `
      <h4>${obj.title}</h4>
      <p>${obj.description}</p>
    `;
    container.appendChild(card);
  });
}

// ميثاق الأخلاقيات
function populateEthics() {
  const container = document.getElementById('ethicsList');
  container.innerHTML = '';

  CONFIG.ethicsCharter.items.forEach(item => {
    const ethicsItem = document.createElement('div');
    ethicsItem.className = 'ethics-item';
    ethicsItem.innerHTML = `<p>${item}</p>`;
    container.appendChild(ethicsItem);
  });
}

// الدورات التدريبية
function populateCourses() {
  const container = document.getElementById('coursesList');
  container.innerHTML = '';

  CONFIG.courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    
    const date = new Date(course.date);
    const formattedDate = date.toLocaleDateString('ar-SA');

    card.innerHTML = `
      <h4>${course.name}</h4>
      <div class="course-meta">
        <span><strong>الجهة:</strong> ${course.provider}</span>
        <span><strong>التاريخ:</strong> ${formattedDate}</span>
        <span><strong>عدد الساعات:</strong> ${course.hours} ساعة</span>
      </div>
      <div class="course-description">${course.description}</div>
      <button class="course-button" onclick="openDocument('${course.certificate}', 'certificate')">
        عرض الشهادة
      </button>
    `;
    container.appendChild(card);
  });
}

// أوراق العمل
function populateWorksheets() {
  const container = document.getElementById('worksheetsList');
  container.innerHTML = '';

  CONFIG.worksheets.forEach(worksheet => {
    const item = document.createElement('div');
    item.className = 'worksheet-item';
    
    item.innerHTML = `
      <div class="worksheet-header">
        <h4>${worksheet.name}</h4>
      </div>
      <div class="worksheet-tags">
        <span class="tag">${worksheet.subject}</span>
        <span class="tag">${worksheet.grade}</span>
      </div>
      <div class="worksheet-description">${worksheet.description}</div>
      <button class="course-button" onclick="openDocument('${worksheet.file}', 'worksheet')">
        فتح الملف
      </button>
    `;
    container.appendChild(item);
  });
}

// الخطط العلاجية
function populatePlans() {
  const container = document.getElementById('plansList');
  container.innerHTML = '';

  CONFIG.therapeuticPlans.forEach(plan => {
    const card = document.createElement('div');
    card.className = 'plan-card';

    card.innerHTML = `
      <div class="plan-header">
        <h4>الطالب: ${plan.studentCode}</h4>
      </div>
      
      <div class="plan-details">
        <div class="plan-detail">
          <strong>الهدف:</strong>
          <span>${plan.goal}</span>
        </div>
        <div class="plan-detail">
          <strong>المهارات:</strong>
          <span>${plan.skills}</span>
        </div>
        <div class="plan-detail">
          <strong>المدة:</strong>
          <span>${plan.duration}</span>
        </div>
      </div>

      <div class="plan-detail" style="margin-top: 1rem;">
        <strong>الإجراءات:</strong>
        <span>${plan.actions}</span>
      </div>

      <div class="plan-detail" style="margin-top: 1rem;">
        <strong>النتائج:</strong>
        <span>${plan.results}</span>
      </div>

      <button class="course-button" onclick="openDocument('${plan.evidence}', 'plan')" style="margin-top: 1rem;">
        عرض الشواهد
      </button>
    `;
    container.appendChild(card);
  });
}

// الشواهد
function populateEvidences() {
  const container = document.getElementById('evidencesList');
  container.innerHTML = '';

  CONFIG.evidences.forEach(evidence => {
    const item = document.createElement('div');
    item.className = 'evidence-item';
    
    const date = new Date(evidence.date);
    const formattedDate = date.toLocaleDateString('ar-SA');

    item.innerHTML = `
      <img src="${evidence.file}" alt="${evidence.title}" class="evidence-image" 
           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22250%22 height=%22200%22><rect fill=%22%23ecf0f1%22 width=%22250%22 height=%22200%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2214%22 fill=%22%23999%22 font-family=%22Arial%22>${evidence.type}</text></svg>'"
           onclick="openEvidence('${evidence.file}', '${evidence.type}')">
      <div class="evidence-content">
        <h4>${evidence.title}</h4>
        <div class="date">${formattedDate}</div>
        <p>${evidence.description}</p>
      </div>
    `;
    container.appendChild(item);
  });
}

// مشاركة الأسرة
function populateFamily() {
  const container = document.getElementById('familyList');
  container.innerHTML = '';

  CONFIG.familyParticipation.forEach(item => {
    const card = document.createElement('div');
    card.className = 'family-item';
    
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('ar-SA');

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="family-image"
           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%25%22 height=%22250%22><rect fill=%22%23ecf0f1%22 width=%22100%25%22 height=%22250%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2214%22 fill=%22%23999%22 font-family=%22Arial%22>صورة</text></svg>'">
      <div class="family-content">
        <div class="family-header">
          <h4>${item.title}</h4>
          <span class="family-type">${item.type}</span>
        </div>
        <div class="family-date">${formattedDate}</div>
        <div class="family-description">${item.description}</div>
        <button class="course-button" onclick="openDocument('${item.report}', 'family')">
          عرض التقرير
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// تقارير الأنشطة
function populateActivities() {
  const container = document.getElementById('activitiesList');
  container.innerHTML = '';

  CONFIG.activities.forEach(activity => {
    const item = document.createElement('div');
    item.className = 'activity-item';
    
    const date = new Date(activity.date);
    const formattedDate = date.toLocaleDateString('ar-SA');

    let imagesHtml = '';
    if (activity.images && activity.images.length > 0) {
      imagesHtml = '<div class="activity-images">';
      activity.images.forEach(img => {
        imagesHtml += `
          <img src="${img}" alt="نشاط" class="activity-image"
               onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%22150%22><rect fill=%22%23ecf0f1%22 width=%22150%22 height=%22150%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2212%22 fill=%22%23999%22 font-family=%22Arial%22>صورة</text></svg>'"
               onclick="openLightbox('${img}')">
        `;
      });
      imagesHtml += '</div>';
    }

    item.innerHTML = `
      <div class="activity-header">
        <h4>${activity.name}</h4>
        <div class="activity-meta">
          <span>📅 ${formattedDate}</span>
          <span>🎯 ${activity.goal}</span>
          <span>👤 ${activity.myRole}</span>
        </div>
      </div>
      <div class="activity-content">
        <div class="activity-description">${activity.description}</div>
        ${imagesHtml}
        <button class="course-button" onclick="openDocument('${activity.report}', 'activity')" style="margin-top: 1rem;">
          عرض التقرير
        </button>
      </div>
    `;
    container.appendChild(item);
  });
}

// التطوير المهني
function populateProfessionalDev() {
  const container = document.getElementById('devList');
  container.innerHTML = '';

  CONFIG.professionalDevelopment.forEach(dev => {
    const card = document.createElement('div');
    card.className = 'plan-card';
    
    const date = new Date(dev.date);
    const formattedDate = date.toLocaleDateString('ar-SA');

    card.innerHTML = `
      <div class="plan-header">
        <h4>${dev.title}</h4>
        <p>${formattedDate}</p>
      </div>
      <div class="plan-detail">
        <strong>الأنشطة والبرامج:</strong>
        <span>${dev.activities}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// الإنجازات والمبادرات
function populateAchievements() {
  const container = document.getElementById('achievementsList');
  container.innerHTML = '';

  CONFIG.achievements.forEach(achievement => {
    const card = document.createElement('div');
    card.className = 'achievement-card';
    
    const date = new Date(achievement.date);
    const formattedDate = date.toLocaleDateString('ar-SA');

    card.innerHTML = `
      <img src="${achievement.image}" alt="${achievement.title}" class="achievement-image"
           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%25%22 height=%22200%22><rect fill=%22%23ecf0f1%22 width=%22100%25%22 height=%22200%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2214%22 fill=%22%23999%22 font-family=%22Arial%22>صورة الإنجاز</text></svg>'"
           onclick="openLightbox('${achievement.image}')">
      <div class="achievement-content">
        <h4>${achievement.title}</h4>
        <div class="achievement-date">${formattedDate}</div>
        <div class="achievement-description">${achievement.description}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ================================================================
// التنقل بين الأقسام - Navigation
// ================================================================

function showSection(sectionId) {
  // إخفاء جميع الأقسام
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('active');
  });

  // إظهار القسم المختار
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.classList.add('active');
    window.scrollTo(0, 0);
  }

  // إغلاق قائمة الهاتف إن وجدت
  const navMenu = document.getElementById('navMenu');
  if (navMenu) {
    navMenu.classList.remove('active');
  }
}

// ================================================================
// معالج الأحداث - Event Listeners
// ================================================================

function setupEventListeners() {
  // زر قائمة الهاتف
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });

    // إغلاق القائمة عند الضغط على رابط
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
      });
    });
  }

  // إغلاق Lightbox عند الضغط خارجه
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
}

// ================================================================
// معاينة الملفات - Document Viewing
// ================================================================

function openDocument(filePath, type) {
  if (!filePath || filePath.includes('[')) {
    alert('⚠️ عذراً، الملف لم يتم إضافته بعد.\n\nيرجى إضافة الملف إلى مجلد documents في المستودع.');
    return;
  }

  // التحقق من نوع الملف
  const isPdf = filePath.toLowerCase().endsWith('.pdf');
  
  if (isPdf) {
    // فتح PDF في عارض داخلي
    showPdfViewer(filePath);
  } else {
    // فتح الملف في نافذة جديدة
    window.open(filePath, '_blank');
  }
}

function showPdfViewer(pdfPath) {
  const pdfViewer = document.getElementById('pdf-viewer');
  const pdfFrame = document.getElementById('pdfFrame');
  
  // استخدام Google Docs Viewer للعرض
  pdfFrame.src = 'https://docs.google.com/gview?url=' + encodeURIComponent(window.location.origin + '/' + pdfPath) + '&embedded=true';
  
  showSection('pdf-viewer');
}

function closePdfViewer() {
  document.getElementById('pdfFrame').src = '';
  showSection('home');
}

// ================================================================
// عرض الصور - Image Viewer (Lightbox)
// ================================================================

function openEvidence(filePath, type) {
  if (type === 'image') {
    openLightbox(filePath);
  } else if (type === 'pdf') {
    openDocument(filePath, 'evidence');
  }
}

function openLightbox(imagePath) {
  if (!imagePath || imagePath.includes('[')) {
    alert('⚠️ الصورة لم تكن متوفرة');
    return;
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  
  lightboxImg.src = imagePath;
  lightbox.classList.add('active');
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
}

// إغلاق Lightbox بالضغط على Escape
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});

// ================================================================
// الطباعة وحفظ PDF - Print/PDF Export
// ================================================================

function printPortfolio() {
  // التحقق من أن لدينا بيانات كافية
  if (CONFIG.teacher.name === '[اسم المعلم]') {
    alert('⚠️ يرجى تحديث بيانات المعلم في ملف config.js أولاً');
    return;
  }

  // عرض جميع الأقسام للطباعة
  showAllSectionsForPrint();
  
  // انتظر قليلاً للتأكد من تحديث الـ DOM
  setTimeout(function() {
    window.print();
  }, 500);
}

function showAllSectionsForPrint() {
  // نسخة بسيطة: نقوم بإظهار الصفحة الرئيسية
  // والـ CSS للطباعة يتولى عرض جميع الأقسام
  showSection('home');
}

// ================================================================
// وظائف مساعدة - Utility Functions
// ================================================================

// تنسيق التاريخ
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// التحقق من وجود الملف
function fileExists(filePath) {
  return !filePath.includes('[');
}

// ================================================================
// إضافة دورة جديدة - Add New Course (مثال)
// ================================================================

/*
لإضافة دورة جديدة، قم بـ:
1. افتح ملف config.js
2. ابحث عن قسم "courses"
3. أضف الكود التالي في النهاية:

    {
      id: 3,
      name: "[اسم الدورة الجديدة]",
      provider: "[جهة التدريب]",
      date: "2024-03-15",
      hours: 25,
      description: "[وصف الدورة]",
      certificate: "documents/course-3.pdf"
    }

4. احفظ الملف
5. أعد تحميل الصفحة
*/

// ================================================================
// معلومات إضافية - Additional Info
// ================================================================

console.log('📚 تم تحميل ملف الإنجاز المهني بنجاح');
console.log('لتعديل البيانات، قم بفتح ملف config.js وتعديل الإعدادات');
