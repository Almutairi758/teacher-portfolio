// ================================================================
// سكريبت التفاعل الرئيسي - Main Interactive Script
// تم مراجعته وتحسينه بعناية شاملة
// ================================================================

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
  try {
    initializePortfolio();
    populateAllSections();
    setupEventListeners();
  } catch (error) {
    console.error('❌ خطأ في التهيئة:', error);
  }
});

// ================================================================
// تهيئة الموقع - Initialize Portfolio
// ================================================================

function initializePortfolio() {
  validateConfig();
  updateTeacherData();
}

// التحقق من صحة البيانات
function validateConfig() {
  if (typeof CONFIG === 'undefined') {
    console.error('❌ خطأ: ملف config.js لم يتم تحميله');
    return false;
  }
  
  // التحقق من وجود جميع الحقول الإجبارية
  const requiredArrays = [
    'educationObjectives',
    'ethicsCharter',
    'courses',
    'worksheets',
    'therapeuticPlans',
    'evidences',
    'familyParticipation',
    'activities',
    'professionalDevelopment',
    'achievements'
  ];
  
  requiredArrays.forEach(field => {
    if (!CONFIG[field]) {
      console.warn(`⚠️ تحذير: ${field} غير محدد في CONFIG`);
      CONFIG[field] = [];
    }
  });
  
  // التحقق من ethicsCharter.items
  if (CONFIG.ethicsCharter && !CONFIG.ethicsCharter.items) {
    CONFIG.ethicsCharter.items = [];
  }
  
  console.log('✓ تم التحقق من البيانات بنجاح');
  return true;
}

// تحديث بيانات المعلم بشكل آمن
function updateTeacherData() {
  try {
    const teacher = CONFIG.teacher;
    if (!teacher) return;
    
    // غلاف الصفحة
    const nameEl = document.getElementById('teacherName');
    const specialtyEl = document.getElementById('teacherSpecialty');
    const schoolEl = document.getElementById('teacherSchool');
    const yearEl = document.getElementById('teacherYear');
    const coverImg = document.getElementById('coverImg');
    
    if (nameEl) nameEl.textContent = teacher.name || '';
    if (specialtyEl) specialtyEl.textContent = teacher.specialty || '';
    if (schoolEl) schoolEl.textContent = teacher.school || '';
    if (yearEl) yearEl.textContent = teacher.year || '';
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

    if (bioName) bioName.textContent = teacher.name || '';
    if (bioSpecialty) bioSpecialty.textContent = teacher.specialty || '';
    if (bioSchool) bioSchool.textContent = teacher.school || '';
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
        bioEmail.textContent = teacher.email || '';
      }
    }

    if (phoneItem) {
      phoneItem.style.display = shouldShowPhone ? 'block' : 'none';
      if (shouldShowPhone && bioPhone) {
        bioPhone.textContent = teacher.phone || '';
      }
    }

  } catch (error) {
    console.error('خطأ في تحديث بيانات المعلم:', error);
  }
}

// ================================================================
// وظائف مساعدة للأمان - Security Helper Functions
// ================================================================

function getPlaceholderImage(type, width, height) {
  const colors = {
    'cover': '%234a90e2',
    'profile': '%23e0e0e0',
    'evidence': '%23ecf0f1',
    'activity': '%23ecf0f1'
  };
  const color = colors[type] || '%23ecf0f1';
  const labels = {
    'cover': 'صورة%20��لغلاف',
    'profile': 'الصورة%20الشخصية',
    'evidence': 'صورة',
    'activity': 'صورة'
  };
  const label = labels[type] || 'صورة';
  
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect fill="${color}" width="${width}" height="${height}"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="16" fill="%23999" font-family="Arial">${label}</text></svg>`;
}

// ================================================================
// ملء جميع الأقسام - Populate All Sections
// ================================================================

function populateAllSections() {
  try {
    populateObjectives();
    populateEthics();
    populateCourses();
    populateWorksheets();
    populatePlans();
    populateEvidences();
    populateFamily();
    populateActivities();
    populateProfessionalDev();
    populateSessionSchedule();
    populateAchievements();
  } catch (error) {
    console.error('خطأ في ملء الأقسام:', error);
  }
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
      
      const h4 = document.createElement('h4');
      h4.textContent = obj.title || '';
      
      const p = document.createElement('p');
      p.textContent = obj.description || '';
      
      card.appendChild(h4);
      card.appendChild(p);
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
      
      const p = document.createElement('p');
      p.textContent = item || '';
      
      ethicsItem.appendChild(p);
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

      const h4 = document.createElement('h4');
      h4.textContent = course.name || '';
      
      const meta = document.createElement('div');
      meta.className = 'course-meta';
      meta.innerHTML = `
        <span><strong>الجهة:</strong> <span class="meta-value">${course.provider || ''}</span></span>
        <span><strong>التاريخ:</strong> <span class="meta-value">${formattedDate}</span></span>
        <span><strong>عدد الساعات:</strong> <span class="meta-value">${course.hours || 0} ساعة</span></span>
      `;
      
      const desc = document.createElement('div');
      desc.className = 'course-description';
      desc.textContent = course.description || '';
      
      card.appendChild(h4);
      card.appendChild(meta);
      card.appendChild(desc);
      
      if (hasCertificate) {
        const btn = document.createElement('button');
        btn.className = 'course-button';
        btn.textContent = 'عرض الشهادة';
        btn.onclick = function() { openDocument(certificatePath, 'certificate'); };
        card.appendChild(btn);
      }
      
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

      const header = document.createElement('div');
      header.className = 'worksheet-header';
      const h4 = document.createElement('h4');
      h4.textContent = worksheet.name || '';
      header.appendChild(h4);
      
      const tags = document.createElement('div');
      tags.className = 'worksheet-tags';
      tags.innerHTML = `
        <span class="tag">${worksheet.subject || ''}</span>
        <span class="tag">${worksheet.grade || ''}</span>
      `;
      
      const desc = document.createElement('div');
      desc.className = 'worksheet-description';
      desc.textContent = worksheet.description || '';
      
      item.appendChild(header);
      item.appendChild(tags);
      item.appendChild(desc);
      
      if (hasFile) {
        const btn = document.createElement('button');
        btn.className = 'course-button';
        btn.textContent = 'فتح الملف';
        btn.onclick = function() { openDocument(filePath, 'worksheet'); };
        item.appendChild(btn);
      }
      
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

      const header = document.createElement('div');
      header.className = 'plan-header';
      const h4 = document.createElement('h4');
      h4.textContent = 'الطالب: ' + (plan.studentCode || '');
      header.appendChild(h4);
      
      const details = document.createElement('div');
      details.className = 'plan-details';
      details.innerHTML = `
        <div class="plan-detail">
          <strong>الهدف:</strong>
          <span>${plan.goal || ''}</span>
        </div>
        <div class="plan-detail">
          <strong>المهارات:</strong>
          <span>${plan.skills || ''}</span>
        </div>
        <div class="plan-detail">
          <strong>المدة:</strong>
          <span>${plan.duration || ''}</span>
        </div>
      `;
      
      const actions = document.createElement('div');
      actions.className = 'plan-detail';
      actions.style.marginTop = '1rem';
      actions.innerHTML = `
        <strong>الإجراءات:</strong>
        <span>${plan.actions || ''}</span>
      `;
      
      const results = document.createElement('div');
      results.className = 'plan-detail';
      results.style.marginTop = '1rem';
      results.innerHTML = `
        <strong>النتائج:</strong>
        <span>${plan.results || ''}</span>
      `;

      card.appendChild(header);
      card.appendChild(details);
      card.appendChild(actions);
      card.appendChild(results);

      if (hasEvidence) {
        const btn = document.createElement('button');
        btn.className = 'course-button';
        btn.textContent = 'عرض الشواهد';
        btn.style.marginTop = '1rem';
        btn.onclick = function() { openDocument(evidencePath, 'plan'); };
        card.appendChild(btn);
      }
      
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

      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = evidence.title || '';
      img.className = 'evidence-image';
      
      if (hasFile) {
        if (isImage) {
          img.style.cursor = 'pointer';
          img.onclick = function() { openLightbox(filePath); };
        } else {
          img.style.cursor = 'pointer';
          img.onclick = function() { openDocument(filePath, 'evidence'); };
        }
      }
      
      img.onerror = function() {
        this.src = getPlaceholderImage('evidence', 250, 200);
      };

      const content = document.createElement('div');
      content.className = 'evidence-content';
      
      const h4 = document.createElement('h4');
      h4.textContent = evidence.title || '';
      
      const date = document.createElement('div');
      date.className = 'date';
      date.textContent = formattedDate;
      
      const desc = document.createElement('p');
      desc.textContent = evidence.description || '';
      
      content.appendChild(h4);
      content.appendChild(date);
      content.appendChild(desc);
      
      item.appendChild(img);
      item.appendChild(content);
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

      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = item.title || '';
      img.className = 'family-image';
      img.onerror = function() {
        this.src = getPlaceholderImage('activity', 800, 250);
      };

      const content = document.createElement('div');
      content.className = 'family-content';
      
      const header = document.createElement('div');
      header.className = 'family-header';
      
      const h4 = document.createElement('h4');
      h4.textContent = item.title || '';
      
      const type = document.createElement('span');
      type.className = 'family-type';
      type.textContent = item.type || '';
      
      header.appendChild(h4);
      header.appendChild(type);
      
      const date = document.createElement('div');
      date.className = 'family-date';
      date.textContent = formattedDate;
      
      const desc = document.createElement('div');
      desc.className = 'family-description';
      desc.textContent = item.description || '';
      
      content.appendChild(header);
      content.appendChild(date);
      content.appendChild(desc);
      
      if (hasReport) {
        const btn = document.createElement('button');
        btn.className = 'course-button';
        btn.textContent = 'عرض التقرير';
        btn.onclick = function() { openDocument(reportPath, 'family'); };
        content.appendChild(btn);
      }
      
      card.appendChild(img);
      card.appendChild(content);
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

      const header = document.createElement('div');
      header.className = 'activity-header';
      
      const h4 = document.createElement('h4');
      h4.textContent = activity.name || '';
      
      const meta = document.createElement('div');
      meta.className = 'activity-meta';
      meta.innerHTML = `
        <span>📅 ${formattedDate}</span>
        <span>🎯 ${activity.goal || ''}</span>
        <span>👤 ${activity.myRole || ''}</span>
      `;
      
      header.appendChild(h4);
      header.appendChild(meta);
      
      const content = document.createElement('div');
      content.className = 'activity-content';
      
      const desc = document.createElement('div');
      desc.className = 'activity-description';
      desc.textContent = activity.description || '';
      content.appendChild(desc);
      
      if (activity.images && activity.images.length > 0) {
        const imagesDiv = document.createElement('div');
        imagesDiv.className = 'activity-images';
        
        activity.images.forEach(img => {
          if (img && !img.includes('[')) {
            const imgEl = document.createElement('img');
            imgEl.src = img;
            imgEl.alt = 'نشاط';
            imgEl.className = 'activity-image';
            imgEl.onclick = function() { openLightbox(img); };
            imgEl.onerror = function() {
              this.src = getPlaceholderImage('activity', 150, 150);
            };
            imagesDiv.appendChild(imgEl);
          }
        });
        
        content.appendChild(imagesDiv);
      }
      
      if (hasReport) {
        const btn = document.createElement('button');
        btn.className = 'course-button';
        btn.textContent = 'عرض التقرير';
        btn.style.marginTop = '1rem';
        btn.onclick = function() { openDocument(reportPath, 'activity'); };
        content.appendChild(btn);
      }
      
      item.appendChild(header);
      item.appendChild(content);
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

      const header = document.createElement('div');
      header.className = 'plan-header';
      
      const h4 = document.createElement('h4');
      h4.textContent = dev.title || '';
      
      const date = document.createElement('p');
      date.textContent = formattedDate;
      
      header.appendChild(h4);
      header.appendChild(date);
      
      const detail = document.createElement('div');
      detail.className = 'plan-detail';
      detail.innerHTML = `
        <strong>الأنشطة والبرامج:</strong>
        <span>${dev.activities || ''}</span>
      `;
      
      card.appendChild(header);
      card.appendChild(detail);
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

      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = achievement.title || '';
      img.className = 'achievement-image';
      
      if (hasImage) {
        img.style.cursor = 'pointer';
        img.onclick = function() { openLightbox(imagePath); };
      }
      
      img.onerror = function() {
        this.src = getPlaceholderImage('activity', 800, 200);
      };

      const content = document.createElement('div');
      content.className = 'achievement-content';
      
      const h4 = document.createElement('h4');
      h4.textContent = achievement.title || '';
      
      const date = document.createElement('div');
      date.className = 'achievement-date';
      date.textContent = formattedDate;
      
      const desc = document.createElement('div');
      desc.className = 'achievement-description';
      desc.textContent = achievement.description || '';
      
      content.appendChild(h4);
      content.appendChild(date);
      content.appendChild(desc);
      
      card.appendChild(img);
      card.appendChild(content);
      container.appendChild(card);
    } catch (error) {
      console.error('خطأ في إضافة إنجاز:', error);
    }
  });
}


// جدول الجلسات
function populateSessionSchedule() {
  const container = document.getElementById('scheduleContainer');
  if (!container) return;

  container.innerHTML = '';
  const schedule = CONFIG.sessionSchedule || {};
  const imagePath = schedule.image || '';
  const pdfPath = schedule.pdf || '';
  const hasImage = imagePath && !imagePath.includes('[');
  const hasPdf = pdfPath && !pdfPath.includes('[');

  if (hasImage) {
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = schedule.title || 'جدول الجلسات';
    img.className = 'schedule-image';
    img.onclick = function() { openLightbox(imagePath); };
    img.onerror = function() { this.style.display = 'none'; };
    container.appendChild(img);
  }

  if (hasPdf) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary schedule-pdf-btn';
    btn.textContent = 'عرض جدول الجلسات PDF';
    btn.onclick = function() { openDocument(pdfPath, 'schedule'); };
    container.appendChild(btn);
  }

  if (!hasImage && !hasPdf) {
    const note = document.createElement('div');
    note.className = 'schedule-placeholder';
    note.innerHTML = '<strong>جدول الجلسات</strong><p>أضف صورة الجدول أو ملف PDF وسيظهر هنا مباشرة.</p>';
    container.appendChild(note);
  }
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
    } else {
      console.warn(`قسم غير موجود: ${sectionId}`);
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
      navToggle.addEventListener('click', function(e) {
        e.preventDefault();
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
// معاينة الملفات - Document Viewing
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
      showPdfViewer(filePath);
    } else {
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
      alert('لم يتمكن من فتح عارض PDF');
      return;
    }

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
      console.warn('الصورة غير متوفرة:', imagePath);
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

// إغلاق Lightbox عند الضغط خارجه
document.addEventListener('click', function(event) {
  const lightbox = document.getElementById('lightbox');
  if (lightbox && event.target === lightbox) {
    closeLightbox();
  }
});

// ================================================================
// الطباعة وحفظ PDF - Print/PDF Export
// ================================================================

function printPortfolio() {
  try {
    // التحقق من أن لدينا بيانات كافية
    if (CONFIG.teacher && CONFIG.teacher.name === '[اسم المعلم]') {
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

    // عرض الصفحة الرئيسية
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
    const [year, month, day] = dateString.split('-');
    if (!year || !month || !day) {
      return dateString;
    }
    
    const date = new Date(year, parseInt(month) - 1, day);
    
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('خطأ في تنسيق التاريخ:', error);
    return dateString || '';
  }
}

// ================================================================
// معالجة الأخطاء العامة
// ================================================================

window.addEventListener('error', function(event) {
  console.error('خطأ في الصفحة:', event.error);
});

// ================================================================
// معلومات التشخيص
// ================================================================

console.log('📚 تم تحميل ملف الإنجاز المهني بنجاح');
console.log('🔧 لتعديل البيانات، قم بفتح ملف config.js وتعديل الإعدادات');
console.log('📱 يعمل على الهاتف والكمبيوتر');
console.log('🖨️ استخدم زر "طباعة/PDF" لتحويل الملف إلى PDF');
