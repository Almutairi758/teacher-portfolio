// ================================================================
// سكريبت التفاعل الرئيسي - Main Interactive Script
// تم مراجعته بعناية لضمان التوافق الكامل والعمل الموثوق
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
  updateTeacherData();
  validateConfig();
}

// التحقق من صحة البيانات
function validateConfig() {
  if (typeof CONFIG === 'undefined') {
    console.error('❌ خطأ: ملف config.js لم يتم تحميله');
    return false;
  }
  console.log('✓ تم تحميل البيانات بنجاح');
  return true;
}

// تحديث بيانات المعلم بشكل آمن
function updateTeacherData() {
  try {
    const teacher = CONFIG.teacher;
    
    // غلاف الصفحة
    const nameEl = document.getElementById('teacherName');
    const specialtyEl = document.getElementById('teacherSpecialty');
    const schoolEl = document.getElementById('teacherSchool');
    const yearEl = document.getElementById('teacherYear');
    const coverImg = document.getElementById('coverImg');
    
    if (nameEl) nameEl.textContent = sanitizeText(teacher.name);
    if (specialtyEl) specialtyEl.textContent = sanitizeText(teacher.specialty);
    if (schoolEl) schoolEl.textContent = sanitizeText(teacher.school);
    if (yearEl) yearEl.textContent = sanitizeText(teacher.year);
    if (coverImg && teacher.coverImage) {
      coverImg.src = teacher.coverImage;
      coverImg.onerror = function() {
        this.src = getPlaceholderImage('cover', 800, 600);
      };
    }

    // قسم السيرة الذاتية
    const bioName = document.getElementById('bioName');
    const bioSpecialty = document.getElementById('bioSpecialty');
    const bioSchool = document.getElementById('bioSchool');
    const bioProfileImg = document.getElementById('bioProfileImg');
    const bioEmail = document.getElementById('bioEmail');
    const bioPhone = document.getElementById('bioPhone');
    const emailItem = document.getElementById('emailItem');
    const phoneItem = document.getElementById('phoneItem');

    if (bioName) bioName.textContent = sanitizeText(teacher.name);
    if (bioSpecialty) bioSpecialty.textContent = sanitizeText(teacher.specialty);
    if (bioSchool) bioSchool.textContent = sanitizeText(teacher.school);
    if (bioProfileImg && teacher.profileImage) {
      bioProfileImg.src = teacher.profileImage;
      bioProfileImg.onerror = function() {
        this.src = getPlaceholderImage('profile', 200, 300);
      };
    }

    // عرض/إخفاء البريد والهاتف
    const shouldShowEmail = teacher.email && !teacher.email.includes('[');
    const shouldShowPhone = teacher.phone && !teacher.phone.includes('[');

    if (emailItem) {
      emailItem.style.display = shouldShowEmail ? 'block' : 'none';
      if (shouldShowEmail && bioEmail) {
        bioEmail.textContent = sanitizeText(teacher.email);
      }
    }

    if (phoneItem) {
      phoneItem.style.display = shouldShowPhone ? 'block' : 'none';
      if (shouldShowPhone && bioPhone) {
        bioPhone.textContent = sanitizeText(teacher.phone);
      }
    }

  } catch (error) {
    console.error('خطأ في تحديث بيانات المعلم:', error);
  }
}

// ================================================================
// وظائف مساعدة للأمان - Security Helper Functions
// ================================================================

function sanitizeText(text) {
  if (!text) return '';
  // منع XSS attacks
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getPlaceholderImage(type, width, height) {
  const colors = {
    'cover': '%234a90e2',
    'profile': '%23e0e0e0',
    'evidence': '%23ecf0f1',
    'activity': '%23ecf0f1'
  };
  const color = colors[type] || '%23ecf0f1';
  const label = type === 'cover' ? 'صورة الغلاف' : 
                type === 'profile' ? 'الصورة الشخصية' : 'صورة';
  
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect fill="${color}" width="${width}" height="${height}"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="16" fill="%23999" font-family="Arial">${encodeURIComponent(label)}</text></svg>`;
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
  if (!container) return;
  
  container.innerHTML = '';
  
  if (!CONFIG.educationObjectives || CONFIG.educationObjectives.length === 0) {
    container.innerHTML = '<p>لا توجد أهداف محددة</p>';
    return;
  }

  CONFIG.educationObjectives.forEach(obj => {
    try {
      const card = document.createElement('div');
      card.className = 'objective-card';
      card.innerHTML = `
        <h4>${sanitizeText(obj.title)}</h4>
        <p>${sanitizeText(obj.description)}</p>
      `;
      container.appendChild(card);
    } catch (error) {
      console.error('خطأ في إضافة هدف:', error);
    }
  });
}

// ميثاق الأخلاقيات
function populateEthics() {
  const container = document.getElementById('ethicsList');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (!CONFIG.ethicsCharter || !CONFIG.ethicsCharter.items || CONFIG.ethicsCharter.items.length === 0) {
    container.innerHTML = '<p>لا توجد بنود محددة</p>';
    return;
  }

  CONFIG.ethicsCharter.items.forEach(item => {
    try {
      const ethicsItem = document.createElement('div');
      ethicsItem.className = 'ethics-item';
      ethicsItem.innerHTML = `<p>${sanitizeText(item)}</p>`;
      container.appendChild(ethicsItem);
    } catch (error) {
      console.error('خطأ في إضافة بند أخلاقي:', error);
    }
  });
}

// الدورات التدريبية
function populateCourses() {
  const container = document.getElementById('coursesList');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (!CONFIG.courses || CONFIG.courses.length === 0) {
    container.innerHTML = '<p>لم تتم إضافة دورات بعد</p>';
    return;
  }

  CONFIG.courses.forEach(course => {
    try {
      const card = document.createElement('div');
      card.className = 'course-card';
      
      const formattedDate = formatDate(course.date);
      const certificatePath = course.certificate || '';
      const hasCertificate = certificatePath && !certificatePath.includes('[');

      card.innerHTML = `
        <h4>${sanitizeText(course.name)}</h4>
        <div class="course-meta">
          <span><strong>الجهة:</strong> ${sanitizeText(course.provider)}</span>
          <span><strong>التاريخ:</strong> ${formattedDate}</span>
          <span><strong>عدد الساعات:</strong> ${course.hours || 0} ساعة</span>
        </div>
        <div class="course-description">${sanitizeText(course.description)}</div>
        ${hasCertificate ? `<button class="course-button" onclick="openDocument('${certificatePath}', 'certificate')">عرض الشهادة</button>` : ''}
      `;
      container.appendChild(card);
    } catch (error) {
      console.error('خطأ في إضافة دورة:', error);
    }
  });
}

// أوراق العمل
function populateWorksheets() {
  const container = document.getElementById('worksheetsList');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (!CONFIG.worksheets || CONFIG.worksheets.length === 0) {
    container.innerHTML = '<p>لم يتم إضافة أوراق عمل بعد</p>';
    return;
  }

  CONFIG.worksheets.forEach(worksheet => {
    try {
      const item = document.createElement('div');
      item.className = 'worksheet-item';
      
      const filePath = worksheet.file || '';
      const hasFile = filePath && !filePath.includes('[');

      item.innerHTML = `
        <div class="worksheet-header">
          <h4>${sanitizeText(worksheet.name)}</h4>
        </div>
        <div class="worksheet-tags">
          <span class="tag">${sanitizeText(worksheet.subject)}</span>
          <span class="tag">${sanitizeText(worksheet.grade)}</span>
        </div>
        <div class="worksheet-description">${sanitizeText(worksheet.description)}</div>
        ${hasFile ? `<button class="course-button" onclick="openDocument('${filePath}', 'worksheet')">فتح الملف</button>` : ''}
      `;
      container.appendChild(item);
    } catch (error) {
      console.error('خطأ في إضافة ورقة عمل:', error);
    }
  });
}

// الخطط العلاجية
function populatePlans() {
  const container = document.getElementById('plansList');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (!CONFIG.therapeuticPlans || CONFIG.therapeuticPlans.length === 0) {
    container.innerHTML = '<p>لم يتم إضافة خطط علاجية بعد</p>';
    return;
  }

  CONFIG.therapeuticPlans.forEach(plan => {
    try {
      const card = document.createElement('div');
      card.className = 'plan-card';

      const evidencePath = plan.evidence || '';
      const hasEvidence = evidencePath && !evidencePath.includes('[');

      card.innerHTML = `
        <div class="plan-header">
          <h4>الطالب: ${sanitizeText(plan.studentCode)}</h4>
        </div>
        
        <div class="plan-details">
          <div class="plan-detail">
            <strong>الهدف:</strong>
            <span>${sanitizeText(plan.goal)}</span>
          </div>
          <div class="plan-detail">
            <strong>المهارات:</strong>
            <span>${sanitizeText(plan.skills)}</span>
          </div>
          <div class="plan-detail">
            <strong>المدة:</strong>
            <span>${sanitizeText(plan.duration)}</span>
          </div>
        </div>

        <div class="plan-detail" style="margin-top: 1rem;">
          <strong>الإجراءات:</strong>
          <span>${sanitizeText(plan.actions)}</span>
        </div>

        <div class="plan-detail" style="margin-top: 1rem;">
          <strong>النتائج:</strong>
          <span>${sanitizeText(plan.results)}</span>
        </div>

        ${hasEvidence ? `<button class="course-button" onclick="openDocument('${evidencePath}', 'plan')" style="margin-top: 1rem;">عرض الشواهد</button>` : ''}
      `;
      container.appendChild(card);
    } catch (error) {
      console.error('خطأ في إضافة خطة علاجية:', error);
    }
  });
}

// الشواهد
function populateEvidences() {
  const container = document.getElementById('evidencesList');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (!CONFIG.evidences || CONFIG.evidences.length === 0) {
    container.innerHTML = '<p>لم يتم إضافة شواهد بعد</p>';
    return;
  }

  CONFIG.evidences.forEach(evidence => {
    try {
      const item = document.createElement('div');
      item.className = 'evidence-item';
      
      const formattedDate = formatDate(evidence.date);
      const filePath = evidence.file || '';
      const isImage = evidence.type === 'image';
      const hasFile = filePath && !filePath.includes('[');

      let imgSrc = filePath;
      if (!hasFile) {
        imgSrc = getPlaceholderImage('evidence', 250, 200);
      }

      let clickHandler = '';
      if (hasFile) {
        if (isImage) {
          clickHandler = `onclick="openLightbox('${filePath}')"`;
        } else {
          clickHandler = `onclick="openDocument('${filePath}', 'evidence')"`;
        }
      }

      item.innerHTML = `
        <img src="${imgSrc}" alt="${sanitizeText(evidence.title)}" class="evidence-image" ${clickHandler}
             onerror="this.src='${getPlaceholderImage('evidence', 250, 200)}'">
        <div class="evidence-content">
          <h4>${sanitizeText(evidence.title)}</h4>
          <div class="date">${formattedDate}</div>
          <p>${sanitizeText(evidence.description)}</p>
        </div>
      `;
      container.appendChild(item);
    } catch (error) {
      console.error('خطأ في إضافة شاهد:', error);
    }
  });
}

// مشاركة الأسرة
function populateFamily() {
  const container = document.getElementById('familyList');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (!CONFIG.familyParticipation || CONFIG.familyParticipation.length === 0) {
    container.innerHTML = '<p>لم يتم إضافة أنشطة أسرية بعد</p>';
    return;
  }

  CONFIG.familyParticipation.forEach(item => {
    try {
      const card = document.createElement('div');
      card.className = 'family-item';
      
      const formattedDate = formatDate(item.date);
      const imagePath = item.image || '';
      const hasImage = imagePath && !imagePath.includes('[');
      const reportPath = item.report || '';
      const hasReport = reportPath && !reportPath.includes('[');

      let imgSrc = imagePath;
      if (!hasImage) {
        imgSrc = getPlaceholderImage('activity', 800, 250);
      }

      card.innerHTML = `
        <img src="${imgSrc}" alt="${sanitizeText(item.title)}" class="family-image"
             onerror="this.src='${getPlaceholderImage('activity', 800, 250)}'">
        <div class="family-content">
          <div class="family-header">
            <h4>${sanitizeText(item.title)}</h4>
            <span class="family-type">${sanitizeText(item.type)}</span>
          </div>
          <div class="family-date">${formattedDate}</div>
          <div class="family-description">${sanitizeText(item.description)}</div>
          ${hasReport ? `<button class="course-button" onclick="openDocument('${reportPath}', 'family')">عرض التقرير</button>` : ''}
        </div>
      `;
      container.appendChild(card);
    } catch (error) {
      console.error('خطأ في إضافة نشاط أسري:', error);
    }
  });
}

// تقارير الأنشطة
function populateActivities() {
  const container = document.getElementById('activitiesList');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (!CONFIG.activities || CONFIG.activities.length === 0) {
    container.innerHTML = '<p>لم يتم إضافة أنشطة بعد</p>';
    return;
  }

  CONFIG.activities.forEach(activity => {
    try {
      const item = document.createElement('div');
      item.className = 'activity-item';
      
      const formattedDate = formatDate(activity.date);
      const reportPath = activity.report || '';
      const hasReport = reportPath && !reportPath.includes('[');

      let imagesHtml = '';
      if (activity.images && activity.images.length > 0) {
        imagesHtml = '<div class="activity-images">';
        activity.images.forEach(img => {
          if (img && !img.includes('[')) {
            imagesHtml += `
              <img src="${img}" alt="نشاط" class="activity-image"
                   onerror="this.src='${getPlaceholderImage('activity', 150, 150)}'"
                   onclick="openLightbox('${img}')">
            `;
          }
        });
        imagesHtml += '</div>';
      }

      item.innerHTML = `
        <div class="activity-header">
          <h4>${sanitizeText(activity.name)}</h4>
          <div class="activity-meta">
            <span>📅 ${formattedDate}</span>
            <span>🎯 ${sanitizeText(activity.goal)}</span>
            <span>👤 ${sanitizeText(activity.myRole)}</span>
          </div>
        </div>
        <div class="activity-content">
          <div class="activity-description">${sanitizeText(activity.description)}</div>
          ${imagesHtml}
          ${hasReport ? `<button class="course-button" onclick="openDocument('${reportPath}', 'activity')" style="margin-top: 1rem;">عرض التقرير</button>` : ''}
        </div>
      `;
      container.appendChild(item);
    } catch (error) {
      console.error('خطأ في إضافة نشاط:', error);
    }
  });
}

// التطوير المهني
function populateProfessionalDev() {
  const container = document.getElementById('devList');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (!CONFIG.professionalDevelopment || CONFIG.professionalDevelopment.length === 0) {
    container.innerHTML = '<p>لم يتم إضافة برامج تطويرية بعد</p>';
    return;
  }

  CONFIG.professionalDevelopment.forEach(dev => {
    try {
      const card = document.createElement('div');
      card.className = 'plan-card';
      
      const formattedDate = formatDate(dev.date);

      card.innerHTML = `
        <div class="plan-header">
          <h4>${sanitizeText(dev.title)}</h4>
          <p>${formattedDate}</p>
        </div>
        <div class="plan-detail">
          <strong>الأنشطة والبرامج:</strong>
          <span>${sanitizeText(dev.activities)}</span>
        </div>
      `;
      container.appendChild(card);
    } catch (error) {
      console.error('خطأ في إضافة برنامج تطويري:', error);
    }
  });
}

// الإنجازات والمبادرات
function populateAchievements() {
  const container = document.getElementById('achievementsList');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (!CONFIG.achievements || CONFIG.achievements.length === 0) {
    container.innerHTML = '<p>لم يتم إضافة إنجازات بعد</p>';
    return;
  }

  CONFIG.achievements.forEach(achievement => {
    try {
      const card = document.createElement('div');
      card.className = 'achievement-card';
      
      const formattedDate = formatDate(achievement.date);
      const imagePath = achievement.image || '';
      const hasImage = imagePath && !imagePath.includes('[');

      let imgSrc = imagePath;
      if (!hasImage) {
        imgSrc = getPlaceholderImage('activity', 800, 200);
      }

      card.innerHTML = `
        <img src="${imgSrc}" alt="${sanitizeText(achievement.title)}" class="achievement-image"
             onerror="this.src='${getPlaceholderImage('activity', 800, 200)}'"
             ${hasImage ? `onclick="openLightbox('${imagePath}')"` : ''}>
        <div class="achievement-content">
          <h4>${sanitizeText(achievement.title)}</h4>
          <div class="achievement-date">${formattedDate}</div>
          <div class="achievement-description">${sanitizeText(achievement.description)}</div>
        </div>
      `;
      container.appendChild(card);
    } catch (error) {
      console.error('خطأ في إضافة إنجاز:', error);
    }
  });
}

// ================================================================
// التنقل بين الأقسام - Navigation
// ================================================================

function showSection(sectionId) {
  try {
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

    // إغلاق قائمة الهاتف
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
      navMenu.classList.remove('active');
    }
  } catch (error) {
    console.error('خطأ في التنقل:', error);
  }
}

// ================================================================
// معالج الأحداث - Event Listeners
// ================================================================

function setupEventListeners() {
  try {
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

    // إغلاق Lightbox عند الضغط خارجه أو على X
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
    }

    // إغلاق Lightbox بـ Escape
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    });
  } catch (error) {
    console.error('خطأ في إعداد المستمعين:', error);
  }
}

// ================================================================
// معاينة الملفات - Document Viewing (Improved PDF Handling)
// ================================================================

function openDocument(filePath, type) {
  try {
    if (!filePath || filePath.includes('[')) {
      alert('⚠️ عذراً، الملف لم يتم إضافته بعد.\n\nيرجى إضافة الملف إلى مجلد documents في المستودع.');
      return;
    }

    // التحقق من نوع الملف
    const isPdf = filePath.toLowerCase().endsWith('.pdf');
    
    if (isPdf) {
      // فتح PDF باستخدام طريقة موثوقة
      showPdfViewer(filePath);
    } else {
      // فتح الملف في نافذة جديدة
      window.open(filePath, '_blank');
    }
  } catch (error) {
    console.error('خطأ في فتح الملف:', error);
    alert('حدث خطأ في محاولة فتح الملف');
  }
}

function showPdfViewer(pdfPath) {
  try {
    const pdfViewer = document.getElementById('pdf-viewer');
    const pdfFrame = document.getElementById('pdfFrame');
    
    if (!pdfViewer || !pdfFrame) {
      console.error('عنصر عرض PDF غير موجود');
      return;
    }

    // استخدام embed مباشر (يعمل بشكل أفضل على الجوال والكمبيوتر)
    // هذه الطريقة تستخدم قارئ PDF الأصلي للمتصفح
    pdfFrame.src = pdfPath;
    
    showSection('pdf-viewer');
  } catch (error) {
    console.error('خطأ في عرض PDF:', error);
    alert('لم يتمكن من فتح ملف PDF');
  }
}

function closePdfViewer() {
  try {
    const pdfFrame = document.getElementById('pdfFrame');
    if (pdfFrame) {
      pdfFrame.src = '';
    }
    showSection('home');
  } catch (error) {
    console.error('خطأ في إغلاق عارض PDF:', error);
  }
}

// ================================================================
// عرض الصور - Image Viewer (Lightbox)
// ================================================================

function openLightbox(imagePath) {
  try {
    if (!imagePath || imagePath.includes('[')) {
      alert('⚠️ الصورة لم تكن متوفرة');
      return;
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    if (!lightbox || !lightboxImg) {
      console.error('عناصر Lightbox غير موجودة');
      return;
    }
    
    lightboxImg.src = imagePath;
    lightboxImg.onerror = function() {
      this.src = getPlaceholderImage('evidence', 600, 600);
    };
    lightbox.classList.add('active');
  } catch (error) {
    console.error('خطأ في فتح صورة:', error);
  }
}

function closeLightbox() {
  try {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.classList.remove('active');
    }
  } catch (error) {
    console.error('خطأ في إغلاق Lightbox:', error);
  }
}

// ================================================================
// الطباعة وحفظ PDF - Print/PDF Export
// ================================================================

function printPortfolio() {
  try {
    // التحقق من أن لدينا بيانات كافية
    if (CONFIG.teacher.name === '[اسم المعلم]') {
      alert('⚠️ يرجى تحديث بيانات المعلم في ملف config.js أولاً');
      return;
    }

    // إغلاق أي عنصر مفتوح
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.classList.remove('active');
    }
    const pdfFrame = document.getElementById('pdfFrame');
    if (pdfFrame) {
      pdfFrame.src = '';
    }

    // عرض الصفحة الرئيسية فقط (CSS للطباعة سيتولى الباقي)
    showSection('home');
    
    // انتظر قليلاً للتأكد من تحديث الـ DOM
    setTimeout(function() {
      window.print();
    }, 300);
  } catch (error) {
    console.error('خطأ في الطباعة:', error);
    alert('حدث خطأ في محاولة الطباعة');
  }
}

// ================================================================
// وظائف مساعدة - Utility Functions
// ================================================================

// تنسيق التاريخ بطريقة آمنة
function formatDate(dateString) {
  try {
    if (!dateString || dateString.includes('[')) {
      return '';
    }
    
    // استخدام UTC لتجنب مشاكل timezone
    const date = new Date(dateString + 'T00:00:00Z');
    
    if (isNaN(date.getTime())) {
      return dateString; // إرجاع التاريخ الأصلي إذا كان غير صحيح
    }
    
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('خطأ في تنسيق التاريخ:', error);
    return dateString;
  }
}

// التحقق من وجود الملف
function fileExists(filePath) {
  return filePath && !filePath.includes('[');
}

// ================================================================
// معالجة الأخطاء العامة
// ================================================================

window.addEventListener('error', function(event) {
  console.error('خطأ عام:', event.error);
});

// ================================================================
// معلومات التشخيص
// ================================================================

console.log('📚 تم تحميل ملف الإنجاز المهني بنجاح');
console.log('🔧 لتعديل البيانات، قم بفتح ملف config.js وتعديل الإعدادات');
console.log('📱 يعمل على الهاتف والكمبيوتر');
console.log('🖨️ استخدم زر "طباعة/PDF" لتحويل الملف إلى PDF');
