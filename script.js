const navArea = document.getElementById("navArea");
const navItems = [...document.querySelectorAll(".nav-item")];
const hoverBubble = document.getElementById("hoverBubble");
const activeIndicator = document.getElementById("activeIndicator");
const profileButton = document.getElementById("profileButton");
const profileTooltip = document.getElementById("profileTooltip");
const contentArea = document.getElementById("content");

let activeItem = navItems.find(item => item.classList.contains("active"));
let loggedIn = false;

// صفحات مختلف
const pages = {
    home: `
        <section class="demo-card">
            <h1>Sky Turquoise UI</h1>
            <p>خوش‌آمدید به وب‌سایت مدرن ما!</p>
            <p>موس را روی آیکن‌های منو حرکت بده. حباب پشت آیکن بدون ظاهر و غیب شدن،
            با یک حرکت نرم بین گزینه‌ها جابه‌جا می‌شود.</p>
            <button class="login-demo" id="loginDemo">نمایش حالت لاگین‌شده</button>
        </section>
    `,
    about: `
        <section class="demo-card">
            <h2>درباره ما</h2>
            <p>ما تیمی از طراحان و برنامه‌نویسان متخصص هستیم که به ایجاد رابط‌های کاربری زیبا و کارآمد اختصاص دارند.</p>
            <p>تجربه ما در زمینه توسعه وب‌سایت‌های مدرن و پاسخگو، تضمین‌کننده کیفیت بالای پروژه‌هاست.</p>
            <p>ما بر اساس آخرین تکنولوژی‌ها و استاندارهای وب کار می‌کنیم.</p>
        </section>
    `,
    services: `
        <section class="demo-card">
            <h2>خدمات ما</h2>
            <p>🎨 طراحی رابط کاربری (UI/UX)</p>
            <p>💻 توسعه وب‌سایت‌های ریسپانسیو</p>
            <p>📱 توسعه اپلیکیشن‌های موبایل</p>
            <p>🔧 بهینه‌سازی عملکرد و سرعت</p>
            <p>🛡️ تأمین امنیت و پشتیبانی</p>
        </section>
    `,
    portfolio: `
        <section class="demo-card">
            <h2>پورتفولیو</h2>
            <p>پروژه‌های موفق ما:</p>
            <p>✅ طراحی و اجرای 50+ پروژه وب</p>
            <p>✅ ایجاد اپلیکیشن‌های موفق</p>
            <p>✅ بهبود عملکرد وب‌سایت‌های موجود</p>
            <p>✅ مشاوره‌ی فنی برای شرکت‌ها</p>
        </section>
    `,
    blog: `
        <section class="demo-card">
            <h2>بلاگ</h2>
            <p>📝 نوشته‌های آخر:</p>
            <p>• راهنمای جامع CSS Grid</p>
            <p>• بهترین روش‌های JavaScript مدرن</p>
            <p>• طراحی رابط کاربری ریسپانسیو</p>
            <p>• بهینه‌سازی سرعت وب‌سایت</p>
        </section>
    `,
    gallery: `
        <section class="demo-card">
            <h2>گالری</h2>
            <p>نمونه‌های طراحی و کار ما:</p>
            <p>🖼️ طراحی‌های بصری جذاب</p>
            <p>🎬 انیمیشن‌های جذاب</p>
            <p>📊 داشبورد‌های تحلیلی</p>
            <p>🎨 رابط‌های کاربری خلاقانه</p>
        </section>
    `,
    contact: `
        <section class="demo-card">
            <h2>تماس با ما</h2>
            <p>📧 ایمیل: info@mahdiui.com</p>
            <p>📱 تلفن: +98 xxx xxxx</p>
            <p>🌐 شبکه‌های اجتماعی:</p>
            <p>Instagram | Twitter | LinkedIn</p>
            <p>ما برای شنیدن نظرات و پیشنهادات شما منتظریم!</p>
        </section>
    `
};

function getItemPosition(item) {
    const itemRect = item.getBoundingClientRect();
    const areaRect = navArea.getBoundingClientRect();
    return {
        top: itemRect.top - areaRect.top,
        center: itemRect.top - areaRect.top + (itemRect.height / 2)
    };
}

function moveHoverBubble(item) {
    const pos = getItemPosition(item);
    hoverBubble.style.top = pos.top + "px";
}

function moveActiveIndicator(item, instant = false) {
    const pos = getItemPosition(item);
    if (instant) {
        activeIndicator.style.transition = "none";
    }
    activeIndicator.style.top = (pos.center - activeIndicator.offsetHeight / 2) + "px";
    if (instant) {
        requestAnimationFrame(() => {
            activeIndicator.style.transition = "top .48s cubic-bezier(.22,1,.36,1)";
        });
    }
}

function loadPage(pageName) {
    contentArea.innerHTML = pages[pageName] || pages.home;
    
    if (pageName === 'home') {
        const loginBtn = document.getElementById('loginDemo');
        if (loginBtn) {
            loginBtn.addEventListener('click', toggleLogin);
        }
    }
}

navItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
        hoverBubble.style.opacity = "1";
        moveHoverBubble(item);
    });

    item.addEventListener("click", () => {
        activeItem.classList.remove("active");
        activeItem = item;
        activeItem.classList.add("active");
        moveActiveIndicator(activeItem);
        
        const pageName = item.getAttribute('data-page');
        loadPage(pageName);
    });
});

navArea.addEventListener("mouseleave", () => {
    hoverBubble.style.opacity = "0";
});

window.addEventListener("load", () => {
    moveActiveIndicator(activeItem, true);
    requestAnimationFrame(() => {
        moveActiveIndicator(activeItem);
    });
    loadPage('home');
});

window.addEventListener("resize", () => {
    moveActiveIndicator(activeItem, true);
    if (hoverBubble.style.opacity === "1") {
        const hovered = navItems.find(item => item.matches(":hover"));
        if (hovered) {
            moveHoverBubble(hovered);
        }
    }
});

// Login Demo
function setUser(user) {
    loggedIn = !!user;
    if (loggedIn) {
        profileButton.classList.add("logged-in");
        profileTooltip.textContent = "@" + user.username;
    } else {
        profileButton.classList.remove("logged-in");
        profileTooltip.textContent = "ورود به حساب";
    }
}

function toggleLogin() {
    if (!loggedIn) {
        setUser({ username: "MahdiMento" });
    } else {
        setUser(null);
    }
}

profileButton.addEventListener('click', toggleLogin);