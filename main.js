class LoadingScreen {
  constructor() {
    this.loader = document.getElementById("loading-screen");
    this.mainContent = document.getElementById("main-content");
    this.loadingDuration = 2000; // 2 ثانية
    this.init();
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.handlePageLoad();
      });
    } else {
      this.handlePageLoad();
    }
  }

  handlePageLoad() {
    setTimeout(() => {
      this.hideLoader();
    }, this.loadingDuration);
  }

  hideLoader() {
    this.loader.classList.add("fade-out");

    setTimeout(() => {
      this.loader.style.display = "none";
      this.mainContent.classList.add("show");

      // بعد عرض المحتوى، فعّل WOW.js
      new WOW().init();

      console.log("Loading completed!");
    }, 800);
  }
}

// بدء شاشة التحميل
new LoadingScreen();

// تخطي شاشة التحميل عند النقر
document.getElementById("loading-screen").addEventListener("click", function () {
  if (!this.classList.contains("fade-out")) {
    new LoadingScreen().hideLoader();
  }
});

function changeText(button) {
  document.querySelectorAll(".button_active").forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  const newText = button.getAttribute("data-text");
  const paragraph = document.getElementById("product-text");
  const currentText = paragraph.textContent;

  // حذف النص حرفًا حرفًا
  let i = currentText.length;

  function deleteChar() {
    if (i > 0) {
      paragraph.textContent = currentText.substring(0, i - 1);
      i--;
      setTimeout(deleteChar, 1); // سرعة الحذف
    } else {
      typeChar();
    }
  }

  // كتابة النص الجديد حرفًا حرفًا
  let j = 0;
  function typeChar() {
    if (j < newText.length) {
      paragraph.textContent += newText.charAt(j);
      j++;
      setTimeout(typeChar, 1); // سرعة الكتابة
    }
  }

  deleteChar();
}

document.querySelectorAll(".timeline-year, .timeline-year1").forEach((item) => {
  item.addEventListener("click", function () {
    // إزالة active من الجميع ثم إضافته للمحدد
    document.querySelectorAll(".timeline-year, .timeline-year1").forEach((el) => el.classList.remove("active"));
    this.classList.add("active");

    // النص
    const newText = this.getAttribute("data-text");
    const textBox = document.getElementById("timeline-text");
    const currentText = textBox.textContent;

    // الصورة
    const newImg = this.getAttribute("data-image");
    const imageElement = document.querySelector(".img4");

    // تغيير النص تدريجيًا
    let i = currentText.length;
    function deleteChar() {
      if (i > 0) {
        textBox.textContent = currentText.substring(0, i - 1);
        i--;
        setTimeout(deleteChar, 1);
      } else {
        typeChar();
      }
    }

    function typeChar() {
      let j = 0;
      function type() {
        if (j < newText.length) {
          textBox.textContent += newText.charAt(j);
          j++;
          setTimeout(type, 1);
        }
      }
      type();
    }

    deleteChar();

    // تغيير الصورة مع fade
    imageElement.classList.remove("fade-in");
    imageElement.classList.add("fade-out");
    setTimeout(() => {
      imageElement.src = newImg;
      imageElement.classList.remove("fade-out");
      imageElement.classList.add("fade-in");
    }, 500);
  });
});
