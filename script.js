/* ---------------------- CONFIG ---------------------- */
const ADMIN_PASS = "Admin_2002";

/* ---------------------- NEWS ---------------------- */
const NEWS_KEY = "bawabatalibda3_news";
let editMode = false;
let newsData = JSON.parse(localStorage.getItem(NEWS_KEY) || "[]");

function renderNews() {
  const container = document.getElementById("newsContainer");
  if (!container) return;
  container.innerHTML = "";

  newsData.forEach((news, index) => {
    const card = document.createElement("div");
    card.className = "news-card";

    const img = document.createElement("img");
    img.src = news.image || "https://via.placeholder.com/600x300";
    img.alt = news.title || "news image";
    card.appendChild(img);

    const h3 = document.createElement("h3");
    h3.textContent = news.title;
    card.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = news.content;
    card.appendChild(p);

    if (editMode) {
      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑 حذف";
      delBtn.addEventListener("click", () => removeNews(index));
      card.appendChild(delBtn);
    }

    container.appendChild(card);
  });
}

function addNews() {
  const title = document.getElementById("newsTitle").value.trim();
  const content = document.getElementById("newsContent").value.trim();
  const imageInput = document.getElementById("newsImage");

  if (!title || !content) return alert("الرجاء إدخال عنوان ومحتوى الخبر");

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageData = e.target.result;
      newsData.unshift({ title, content, image: imageData });
      localStorage.setItem(NEWS_KEY, JSON.stringify(newsData));
      renderNews();
      document.getElementById("newsTitle").value = "";
      document.getElementById("newsContent").value = "";
      imageInput.value = "";
      alert("✅ تمت إضافة الخبر وحفظه");
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    newsData.unshift({ title, content, image: "" });
    localStorage.setItem(NEWS_KEY, JSON.stringify(newsData));
    renderNews();
    document.getElementById("newsTitle").value = "";
    document.getElementById("newsContent").value = "";
    alert("✅ تمت إضافة الخبر وحفظه");
  }
}

function removeNews(index) {
  if (!confirm("هل أنت متأكد أنك تريد حذف هذا الخبر؟")) return;
  newsData.splice(index, 1);
  localStorage.setItem(NEWS_KEY, JSON.stringify(newsData));
  renderNews();
}

function handleEditNews() {
  const pass = prompt("أدخل كلمة المرور للتعديل:");
  if (pass !== ADMIN_PASS) return alert("كلمة المرور غير صحيحة ❌");

  editMode = !editMode;
  const editForm = document.getElementById("editForm");
  const editBtn = document.getElementById("editNewsBtn");

  if (editMode) {
    if (editForm) editForm.style.display = "block";
    if (editBtn) editBtn.textContent = "🔒 الخروج من التعديل";
  } else {
    if (editForm) editForm.style.display = "none";
    if (editBtn) editBtn.textContent = "✏️ تعديل الأخبار";
  }

  renderNews();
}

/* ---------------------- GENERIC CONTENT EDITOR ---------------------- */
function setupEditablePage(editBtnId, formId, textareaId, contentId, saveBtnId, storageKey) {
  const editBtn = document.getElementById(editBtnId);
  const form = document.getElementById(formId);
  const textarea = document.getElementById(textareaId);
  const container = document.getElementById(contentId);
  const saveBtn = document.getElementById(saveBtnId);

  if (!editBtn || !form || !textarea || !container || !saveBtn) return;

  const savedContent = localStorage.getItem(storageKey);
  if (savedContent) container.innerHTML = savedContent;

  editBtn.addEventListener("click", () => {
    const pass = prompt("أدخل كلمة المرور للتعديل:");
    if (pass !== ADMIN_PASS) return alert("كلمة المرور غير صحيحة ❌");

    textarea.value = container.innerHTML;
    form.style.display = "block";
  });

  saveBtn.addEventListener("click", () => {
    container.innerHTML = textarea.value;
    localStorage.setItem(storageKey, textarea.value);
    alert("✅ تم حفظ المحتوى");
    form.style.display = "none";
  });
}

/* ---------------------- TALENTS ---------------------- */
const TALENT_KEY = "bawabatalibda3_talent_list";
let talents = JSON.parse(localStorage.getItem(TALENT_KEY) || "[]");

function renderTalents() {
  const container = document.getElementById("talentsContent");
  if (!container) return;
  container.innerHTML = "";

  talents.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";

    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.style.width = "100%";
      img.style.borderRadius = "5px";
      card.appendChild(img);
    }

    const h3 = document.createElement("h3");
    h3.textContent = item.title;
    card.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = item.content;
    card.appendChild(p);

    if (editMode) {
      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑 حذف";
      delBtn.style.marginTop = "8px";
      delBtn.addEventListener("click", () => removeTalent(index));
      card.appendChild(delBtn);
    }

    container.appendChild(card);
  });
}

function addTalent() {
  const title = document.getElementById("talentTitle").value.trim();
  const content = document.getElementById("talentContent").value.trim();
  const imageInput = document.getElementById("talentImage");

  if (!title || !content) return alert("الرجاء إدخال عنوان ووصف الموهبة");

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageData = e.target.result;
      talents.unshift({ title, content, image: imageData });
      localStorage.setItem(TALENT_KEY, JSON.stringify(talents));
      renderTalents();
      document.getElementById("talentTitle").value = "";
      document.getElementById("talentContent").value = "";
      imageInput.value = "";
      alert("✅ تم إضافة الموهبة وحفظها");
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    talents.unshift({ title, content, image: "" });
    localStorage.setItem(TALENT_KEY, JSON.stringify(talents));
    renderTalents();
    document.getElementById("talentTitle").value = "";
    document.getElementById("talentContent").value = "";
    alert("✅ تم إضافة الموهبة وحفظها");
  }
}

function removeTalent(index) {
  if (!confirm("هل أنت متأكد أنك تريد حذف هذه الموهبة؟")) return;
  talents.splice(index, 1);
  localStorage.setItem(TALENT_KEY, JSON.stringify(talents));
  renderTalents();
}

/* ---------------------- ACHIEVEMENTS ---------------------- */
const ACHIEV_KEY = "bawabatalibda3_achievements_list";
let achievements = JSON.parse(localStorage.getItem(ACHIEV_KEY) || "[]");

function renderAchievements() {
  const container = document.getElementById("achievementsContent");
  if (!container) return;
  container.innerHTML = "";

  achievements.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";

    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.style.width = "100%";
      img.style.borderRadius = "5px";
      card.appendChild(img);
    }

    const h3 = document.createElement("h3");
    h3.textContent = item.title;
    card.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = item.content;
    card.appendChild(p);

    if (editMode) {
      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑 حذف";
      delBtn.style.marginTop = "8px";
      delBtn.addEventListener("click", () => removeAchievement(index));
      card.appendChild(delBtn);
    }

    container.appendChild(card);
  });
}

function addAchievement() {
  const title = document.getElementById("achievementTitle").value.trim();
  const content = document.getElementById("achievementContent").value.trim();
  const imageInput = document.getElementById("achievementImage");

  if (!title || !content) return alert("الرجاء إدخال عنوان ووصف الإنجاز");

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageData = e.target.result;
      achievements.unshift({ title, content, image: imageData });
      localStorage.setItem(ACHIEV_KEY, JSON.stringify(achievements));
      renderAchievements();
      document.getElementById("achievementTitle").value = "";
      document.getElementById("achievementContent").value = "";
      imageInput.value = "";
      alert("✅ تم إضافة الإنجاز وحفظه");
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    achievements.unshift({ title, content, image: "" });
    localStorage.setItem(ACHIEV_KEY, JSON.stringify(achievements));
    renderAchievements();
    document.getElementById("achievementTitle").value = "";
    document.getElementById("achievementContent").value = "";
    alert("✅ تم إضافة الإنجاز وحفظه");
  }
}

function removeAchievement(index) {
  if (!confirm("هل أنت متأكد أنك تريد حذف هذا الإنجاز؟")) return;
  achievements.splice(index, 1);
  localStorage.setItem(ACHIEV_KEY, JSON.stringify(achievements));
  renderAchievements();
}

/* ---------------------- INIT ---------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // News
  renderNews();
  const editNewsBtn = document.getElementById("editNewsBtn");
  if (editNewsBtn) editNewsBtn.addEventListener("click", handleEditNews);

  // Talents
  renderTalents();
  const editTalentBtn = document.getElementById("editTalentBtn");
  const formTalent = document.getElementById("editTalentForm");
  const saveTalentBtn = document.getElementById("saveTalentBtn");
  if (editTalentBtn && formTalent && saveTalentBtn) {
    editTalentBtn.addEventListener("click", () => {
      const pass = prompt("أدخل كلمة المرور للتعديل:");
      if (pass !== ADMIN_PASS) return alert("كلمة المرور غير صحيحة ❌");
      formTalent.style.display = formTalent.style.display === "none" ? "block" : "none";
      editMode = !editMode;
      renderTalents();
    });
    saveTalentBtn.addEventListener("click", addTalent);
  }

  // Achievements
  renderAchievements();
  const editAchievBtn = document.getElementById("editAchievementsBtn");
  const formAchiev = document.getElementById("editAchievementsForm");
  const saveAchievBtn = document.getElementById("saveAchievementsBtn");
  if (editAchievBtn && formAchiev && saveAchievBtn) {
    editAchievBtn.addEventListener("click", () => {
      const pass = prompt("أدخل كلمة المرور للتعديل:");
      if (pass !== ADMIN_PASS) return alert("كلمة المرور غير صحيحة ❌");
      formAchiev.style.display = formAchiev.style.display === "none" ? "block" : "none";
      editMode = !editMode;
      renderAchievements();
    });
    saveAchievBtn.addEventListener("click", addAchievement);
  }
});
