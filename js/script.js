const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");


// =========================
// ハンバーガーメニュー
// =========================

menuButton.setAttribute("aria-controls", "menu");
menuButton.setAttribute("aria-expanded", "false");
menuButton.setAttribute("aria-label", "メニューを開く");

menuButton.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("open");

    menuButton.textContent = isOpen ? "×" : "☰";
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "メニューを閉じる" : "メニューを開く"
    );
});


// =========================
// NキーでHOMEへ
// =========================

document.addEventListener("keydown", function (event) {

    if (event.key.toLowerCase() === "n") {
        window.location.href = "index.html";
    }

});


// =========================
// HISTORY スクロール表示
// =========================

const timelineItems = document.querySelectorAll(".timeline-item");


const observer = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);


timelineItems.forEach(function (item) {

    observer.observe(item);

});

// HOMEの三つの部をスクロールに合わせて順番に表示
const homePartCards = document.querySelectorAll(".home-parts-reveal .home-part-panel");

homePartCards.forEach(function (card) {

    observer.observe(card);

});
/* =========================
   HOME HERO SCROLL
   ========================= */

const hero = document.querySelector(".hero");

if (hero) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 80) {
            hero.classList.add("scrolled");
        } else {
            hero.classList.remove("scrolled");
        }

    });

}
/* =========================
   PERFORMANCE LYRICS
   ========================= */

const songItems = document.querySelectorAll(".song-item");

songItems.forEach(function (song) {
    song.addEventListener("click", function () {

        const lyricsBoard = song.nextElementSibling;

        if (lyricsBoard.classList.contains("open")) {

            // 閉じる
            lyricsBoard.style.maxHeight = null;
            lyricsBoard.classList.remove("open");
            song.classList.remove("active");

        } else {

            // 開く
            lyricsBoard.classList.add("open");
            lyricsBoard.style.maxHeight =
                lyricsBoard.scrollHeight + "px";

            song.classList.add("active");
        }
    });
});
/* =========================
   MENU TEXT COLOR
   ========================= */

const menuLinks = document.querySelectorAll(".menu a");

function updateMenuTextColor() {

    if (!menu.classList.contains("open")) {
        return;
    }

    // メニューを一時的に見えなくして、
    // メニューの後ろにある要素を取得
    menu.style.visibility = "hidden";

    const menuRect = menu.getBoundingClientRect();

    const x = menuRect.left - 10;
    const y = window.innerHeight / 2;

    const backgroundElement = document.elementFromPoint(x, y);

    menu.style.visibility = "";

    if (!backgroundElement) {
        return;
    }

    const background = getComputedStyle(
        backgroundElement
    ).backgroundColor;

    const match = background.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)/
    );

    if (!match) {
        return;
    }

    const r = Number(match[1]);
    const g = Number(match[2]);
    const b = Number(match[3]);

    const brightness =
        (r * 299 + g * 587 + b * 114) / 1000;

    if (brightness > 150) {

        menuLinks.forEach(function (link) {
            link.style.color = "black";
        });

    } else {

        menuLinks.forEach(function (link) {
            link.style.color = "white";
        });

    }
}


// メニューを開いたときに判定
menuButton.addEventListener("click", function () {

    setTimeout(function () {
        updateMenuTextColor();
    }, 10);

});


// スクロールしたときに再判定
window.addEventListener("scroll", function () {

    updateMenuTextColor();

});


// ウィンドウサイズ変更時
window.addEventListener("resize", function () {

    updateMenuTextColor();

});
