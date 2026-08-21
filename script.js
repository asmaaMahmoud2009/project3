const books = [
    {
        id: 1,
        title: "الأيام",
        author: "طه حسين",
        category: "روايات",
        rating: 4.9,
        cover: "cover-1",
        icon: "📕"
    },
    {
        id: 2,
        title: "العادات الذرية",
        author: "جيمس كلير",
        category: "تطوير الذات",
        rating: 4.8,
        cover: "cover-2",
        icon: "📗"
    },
    {
        id: 3,
        title: "ألف ليلة وليلة",
        author: "تراث عربي",
        category: "روايات",
        rating: 4.7,
        cover: "cover-3",
        icon: "📙"
    },
    {
        id: 4,
        title: "تاريخ العالم",
        author: "مؤلف مجهول",
        category: "تاريخ",
        rating: 4.5,
        cover: "cover-4",
        icon: "📘"
    },
    {
        id: 5,
        title: "قوة التفكير",
        author: "نورمان فينسنت",
        category: "تطوير الذات",
        rating: 4.6,
        cover: "cover-5",
        icon: "📔"
    },
    {
        id: 6,
        title: "عالم الفيزياء",
        author: "ستيفن هوكينج",
        category: "علوم",
        rating: 4.9,
        cover: "cover-6",
        icon: "📚"
    },
    {
        id: 7,
        title: "حضارات قديمة",
        author: "أحمد خالد",
        category: "تاريخ",
        rating: 4.4,
        cover: "cover-7",
        icon: "📕"
    },
    {
        id: 8,
        title: "رحلة إلى الفضاء",
        author: "كارل ساغان",
        category: "علوم",
        rating: 4.8,
        cover: "cover-8",
        icon: "🚀"
    }
];

const booksGrid = document.getElementById("booksGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const empty = document.getElementById("empty");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// عرض الكتب
function displayBooks(data) {

    booksGrid.innerHTML = "";

    if (data.length === 0) {
        empty.style.display = "block";
        return;
    }

    empty.style.display = "none";

    data.forEach(book => {

        const isFavorite = favorites.includes(book.id);

        const card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = `
            <div class="book-cover ${book.cover}">
                <span>${book.icon}</span>

                <button
                    class="favorite ${isFavorite ? "active" : ""}"
                    onclick="toggleFavorite(${book.id})">
                    ${isFavorite ? "❤️" : "♡"}
                </button>
            </div>

            <div class="book-info">

                <span class="book-category">
                    ${book.category}
                </span>

                <h3>${book.title}</h3>

                <p class="author">
                    ✍️ ${book.author}
                </p>

                <div class="rating">
                    ⭐ ${book.rating}
                </div>

                <button
                    class="read-btn"
                    onclick="readBook(${book.id})">
                    📖 عرض الكتاب
                </button>

            </div>
        `;

        booksGrid.appendChild(card);
    });
}

// البحث والفلترة
function filterBooks() {

    const search = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;

    const filtered = books.filter(book => {

        const matchesSearch =
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search);

        const matchesCategory =
            category === "all" ||
            book.category === category;

        return matchesSearch && matchesCategory;
    });

    displayBooks(filtered);
}

searchInput.addEventListener("input", filterBooks);
categoryFilter.addEventListener("change", filterBooks);

// المفضلة
function toggleFavorite(id) {

    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    filterBooks();
}

// عرض الكتاب
function readBook(id) {

    const book = books.find(book => book.id === id);

    alert(
        `📚 ${book.title}\n\n` +
        `✍️ المؤلف: ${book.author}\n` +
        `🏷️ التصنيف: ${book.category}\n` +
        `⭐ التقييم: ${book.rating}\n\n` +
        `سيتم إضافة صفحة القراءة الكاملة في النسخة القادمة.`
    );
}

// Dark Mode
const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark = document.body.classList.contains("dark");

    localStorage.setItem(
        "theme",
        dark ? "dark" : "light"
    );

    themeBtn.textContent = dark ? "☀️" : "🌙";
});

// Login Modal
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");
const loginForm = document.getElementById("loginForm");
const successMsg = document.getElementById("successMsg");

loginBtn.addEventListener("click", () => {
    loginModal.classList.add("show");
});

closeModal.addEventListener("click", () => {
    loginModal.classList.remove("show");
});

loginModal.addEventListener("click", e => {

    if (e.target === loginModal) {
        loginModal.classList.remove("show");
    }

});

loginForm.addEventListener("submit", e => {

    e.preventDefault();

    successMsg.textContent =
        "✅ تم تسجيل الدخول بنجاح!";

    setTimeout(() => {
        loginModal.classList.remove("show");
        successMsg.textContent = "";
        loginForm.reset();
    }, 1500);
});

// التصنيفات
document.querySelectorAll(".category-card").forEach(card => {

    card.addEventListener("click", () => {

        const category = card.dataset.category;

        categoryFilter.value = category;

        document
            .getElementById("books")
            .scrollIntoView({ behavior: "smooth" });

        filterBooks();
    });

});

// القائمة على الموبايل
const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", () => {

    const nav = document.querySelector("nav");

    if (nav.style.display === "flex") {
        nav.style.display = "";
    } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "75px";
        nav.style.right = "0";
        nav.style.left = "0";
        nav.style.padding = "20px";
        nav.style.background = "var(--card)";
        nav.style.borderBottom = "1px solid var(--border)";
    }

});

// تشغيل أولي
displayBooks(books);