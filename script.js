/* ---------------------- CONFIG ---------------------- */
const ADMIN_PASS = "Admin_2002";


/* ---------------------- PARENTS ---------------------- */
const PARENTS_KEY = "bawabatalibda3_parents";
function setupParents() {
  const parentsContent = document.getElementById("parentsContent");
  const editBtn = document.getElementById("editParentsBtn");
  const editForm = document.getElementById("editParentsForm");
  const textarea = document.getElementById("parentsTextarea");
  const saveBtn = document.getElementById("saveParentsBtn");

  if (!parentsContent || !editBtn || !editForm || !textarea || !saveBtn) return;

  const saved = localStorage.getItem(PARENTS_KEY);
  if (saved) parentsContent.innerHTML = saved;

  editBtn.addEventListener("click", () => {
    const pass = prompt("أدخل كلمة المرور للتعديل:");
    if (pass !== ADMIN_PASS) return alert("كلمة المرور غير صحيحة ❌");

    textarea.value = parentsContent.innerHTML;
    editForm.style.display = editForm.style.display === "block" ? "none" : "block";
  });

  saveBtn.addEventListener("click", () => {
    parentsContent.innerHTML = textarea.value;
    localStorage.setItem(PARENTS_KEY, textarea.value);
    alert("✅ تم حفظ المحتوى");
    editForm.style.display = "none";
  });
}

/* ---------------------- TALENTS ---------------------- */
const TALENT_KEY = "bawabatalibda3_talent_list";
let talentEditMode = false;
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

    if (talentEditMode) {
      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑 حذف";
      delBtn.style.marginTop = "8px";
      delBtn.addEventListener("click", () => removeTalent(index));
      card.appendChild(delBtn);
    }

    container.appendChild(card);
  });
}

function toggleTalentEdit() {
  const pass = prompt("أدخل كلمة المرور للتعديل:");
  if (pass !== ADMIN_PASS) return alert("كلمة المرور غير صحيحة ❌");
  talentEditMode = !talentEditMode;
  const form = document.getElementById("editTalentForm");
  form.style.display = form.style.display === "block" ? "none" : "block";
  renderTalents();
}

/* ---------------------- ACHIEVEMENTS ---------------------- */
const ACHIEV_KEY = "bawabatalibda3_achievements_list";
let achievementEditMode = false;
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

    if (achievementEditMode) {
      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑 حذف";
      delBtn.style.marginTop = "8px";
      delBtn.addEventListener("click", () => removeAchievement(index));
      card.appendChild(delBtn);
    }

    container.appendChild(card);
  });
}

function toggleAchievementEdit() {
  const pass = prompt("أدخل كلمة المرور للتعديل:");
  if (pass !== ADMIN_PASS) return alert("كلمة المرور غير صحيحة ❌");
  achievementEditMode = !achievementEditMode;
  const form = document.getElementById("editAchievementsForm");
  form.style.display = form.style.display === "block" ? "none" : "block";
  renderAchievements();
}

/* ---------------------- INIT ---------------------- */
document.addEventListener("DOMContentLoaded", () => {
  

  // Parents
  setupParents();

  // Talents
  renderTalents();
  const editTalentBtn = document.getElementById("editTalentBtn");
  if (editTalentBtn) editTalentBtn.addEventListener("click", toggleTalentEdit);
  const saveTalentBtn = document.getElementById("saveTalentBtn");
  if (saveTalentBtn) saveTalentBtn.addEventListener("click", addTalent);

  // Achievements
  renderAchievements();
  const editAchievBtn = document.getElementById("editAchievementsBtn");
  if (editAchievBtn) editAchievBtn.addEventListener("click", toggleAchievementEdit);
  const saveAchievBtn = document.getElementById("saveAchievementsBtn");
  if (saveAchievBtn) saveAchievBtn.addEventListener("click", addAchievement);
});


