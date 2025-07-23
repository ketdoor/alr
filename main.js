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
const image = document.getElementById("product-image");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        image.classList.add("animate__fadeInLeft", "show");
      }
    });
  },
  {
    threshold: 0.5,
  }
);

observer.observe(image);
function changeText(button) {
  document.querySelectorAll(".button_active").forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  const newText = button.getAttribute("data-text");
  const paragraph = document.getElementById("product-text");
  const image = document.getElementById("product-image");

  // إخفاء النص
  paragraph.classList.remove("fade-in");
  paragraph.classList.add("fade-out");

  // تحضير الصورة للخروج
  image.classList.remove("animate__fadeInLeft");
  image.classList.add("animate__fadeOutLeft");

  setTimeout(() => {
    // تغيير النص
    paragraph.textContent = newText;
    paragraph.classList.remove("fade-out");
    paragraph.classList.add("fade-in");
    // Change the image source
    const newSrc = button.getAttribute("data-image");
    image.src = newSrc;

    // Reset animation
    image.classList.remove("animate__fadeOutLeft");

    // Force reflow (to re-trigger animation)
    void image.offsetWidth;

    // Re-enter with animation
    image.classList.add("animate__fadeInLeft");
  }, 500); // match animation duration
}

const image2 = document.getElementById("Story-image");
const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        image2.classList.add("animate__fadeInRight", "show");
      }
    });
  },
  {
    threshold: 0.5,
  }
);
observer2.observe(image2);

document.querySelectorAll(".timeline-item").forEach((item) => {
  item.addEventListener("click", function () {
    // إزالة التفعيل من كل السنوات
    document.querySelectorAll(".timeline-year").forEach((year) => {
      year.classList.remove("highlight", "active");
    });

    // تفعيل السنة الحالية
    const year = this.querySelector(".timeline-year");
    year.classList.add("highlight", "active");

    // جلب العناصر
    const newText = year.getAttribute("data-text");
    const newImage = year.getAttribute("data-image");
    const paragraph = document.getElementById("timeline-text");
    const image = document.querySelector(".img4");

    // إخفاء النص
    paragraph.classList.remove("fade-in");
    paragraph.classList.add("fade-out");

    // تحضير الصورة للخروج (عكس الاتجاه: خروج لليمين بدل اليسار)
    image.classList.remove("animate__fadeInLeft");
    image.classList.add("animate__fadeOutRight");

    setTimeout(() => {
      // تغيير النص
      paragraph.textContent = newText;
      paragraph.classList.remove("fade-out");
      paragraph.classList.add("fade-in");

      // تغيير الصورة
      image.src = newImage;
      image.classList.remove("animate__fadeOutRight");

      // Force reflow (لإعادة تشغيل الأنميشن)
      void image.offsetWidth;

      // دخول الصورة من اليسار
      image.classList.add("animate__fadeInLeft");
    }, 500); // يطابق مدة الأنميشن
  });
});
