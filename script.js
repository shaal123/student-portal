// Loads the 100-student JSON array supplied with the assignment.
const DATA_URL = "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";

const searchInput = document.querySelector("#searchInput");
const searchForm = document.querySelector("#searchForm");
const tables = document.querySelector("#tables");
const statusLine = document.querySelector("#status");

let students = [];
let activeSort = "original";
let searchTerm = "";

function getValue(student, keys, fallback = "") {
  for (const key of keys) {
    if (student[key] !== undefined && student[key] !== null) return student[key];
  }
  return fallback;
}
function firstName(s) { return String(getValue(s, ["first_name", "firstName", "firstname", "first"], "")); }
function lastName(s) { return String(getValue(s, ["last_name", "lastName", "lastname", "last"], "")); }
function fullName(s) {
  const combined = String(getValue(s, ["name", "full_name", "fullName"], "")).trim();
  return combined || [firstName(s), lastName(s)].filter(Boolean).join(" ") || "Unknown Student";
}
function email(s) { return String(getValue(s, ["email", "email_address", "emailAddress"], "")); }
function gender(s) { return String(getValue(s, ["gender", "sex"], "Unknown")).toLowerCase(); }
function marks(s) { return Number(getValue(s, ["marks", "mark", "score"], 0)) || 0; }
function studentClass(s) { return Number(getValue(s, ["class", "class_no", "className", "grade"], 0)) || 0; }
function isPassing(s) {
  const value = getValue(s, ["passing", "isPassing", "passed"], false);
  if (typeof value === "string") return ["true", "yes", "passing", "passed", "1"].includes(value.toLowerCase());
  return Boolean(value);
}
function photo(s) {
  return String(getValue(s, ["img", "image", "photo", "picture", "avatar", "image_url"], ""));
}
function initialsAvatar(s) {
  const initials = fullName(s).split(/\s+/).map(p => p[0] || "").slice(0, 2).join("").toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="100%" height="100%" fill="#bdbdbd"/><text x="50%" y="54%" font-family="Arial" font-size="23" text-anchor="middle" dominant-baseline="middle" fill="#333">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
function visibleStudents() {
  let list = students.filter(s => {
    const haystack = `${firstName(s)} ${lastName(s)} ${fullName(s)} ${email(s)}`.toLowerCase();
    return haystack.includes(searchTerm.trim().toLowerCase());
  });
  switch (activeSort) {
    case "az": list.sort((a, b) => fullName(a).localeCompare(fullName(b))); break;
    case "za": list.sort((a, b) => fullName(b).localeCompare(fullName(a))); break;
    case "marks": list.sort((a, b) => marks(a) - marks(b)); break;
    case "passing": list = list.filter(isPassing); break;
    case "class": list.sort((a, b) => studentClass(a) - studentClass(b)); break;
  }
  return list;
}
function cell(text) {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}
function makeTable(list, title = "") {
  const section = document.createElement("section");
  if (title) {
    const heading = document.createElement("h2");
    heading.className = "group-title";
    heading.textContent = title;
    section.appendChild(heading);
  }
  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No students match your search.";
    section.appendChild(empty);
    return section;
  }
  const wrap = document.createElement("div");
  wrap.className = "table-wrap";
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["ID", "Name", "Gender", "Class", "Marks", "Passing", "Email"].forEach(label => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = label;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");

  list.forEach((s, index) => {
    const tr = document.createElement("tr");
    tr.appendChild(cell(String(getValue(s, ["id", "student_id", "studentId"], index + 1))));

    const nameCell = document.createElement("td");
    const nameWrap = document.createElement("div");
    nameWrap.className = "student-name";
    const img = document.createElement("img");
    img.className = "student-photo";
    img.alt = `${fullName(s)} photo`;
    img.src = photo(s) || initialsAvatar(s);
    img.onerror = () => { img.onerror = null; img.src = initialsAvatar(s); };
    const name = document.createElement("span");
    name.textContent = fullName(s);
    nameWrap.append(img, name);
    nameCell.appendChild(nameWrap);
    tr.appendChild(nameCell);

    tr.appendChild(cell(String(getValue(s, ["gender", "sex"], "Unknown"))));
    tr.appendChild(cell(String(getValue(s, ["class", "class_no", "className", "grade"], "—"))));
    tr.appendChild(cell(String(getValue(s, ["marks", "mark", "score"], "—"))));

    const passCell = cell(isPassing(s) ? "Passing" : "Failed");
    passCell.className = isPassing(s) ? "passing" : "failed";
    tr.appendChild(passCell);
    tr.appendChild(cell(email(s)));
    tbody.appendChild(tr);
  });
  table.append(tbody);
  wrap.appendChild(table);
  section.appendChild(wrap);
  return section;
}
function render() {
  tables.replaceChildren();
  const list = visibleStudents();
  if (activeSort === "gender") {
    const females = list.filter(s => gender(s).startsWith("f"));
    const males = list.filter(s => gender(s).startsWith("m"));
    tables.append(makeTable(females, `Female Students (${females.length})`));
    tables.append(makeTable(males, `Male Students (${males.length})`));
    const other = list.filter(s => !gender(s).startsWith("f") && !gender(s).startsWith("m"));
    if (other.length) tables.append(makeTable(other, `Other / Unspecified (${other.length})`));
  } else {
    tables.append(makeTable(list));
  }
  statusLine.textContent = `${list.length} student${list.length === 1 ? "" : "s"} shown${searchTerm ? " for “" + searchTerm + "”" : ""}.`;
}

searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value;
  render();
});
searchForm.addEventListener("submit", event => {
  event.preventDefault();
  searchTerm = searchInput.value;
  render();
});
document.querySelector(".sort-buttons").addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  activeSort = button.dataset.action;
  render();
});

async function loadStudents() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`Could not load JSON (${response.status})`);
    const data = await response.json();
    students = Array.isArray(data) ? data : (Array.isArray(data.students) ? data.students : []);
    if (!students.length) throw new Error("The JSON file did not contain a student array.");
    render();
  } catch (error) {
    console.error(error);
    statusLine.textContent = "Could not load the student JSON. Check your internet connection, or download the JSON file and use the local-file option described in README.md.";
    tables.innerHTML = '<div class="empty">Student data could not be loaded. See README.md for the local JSON setup.</div>';
  }
}
loadStudents();
