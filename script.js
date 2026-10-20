// Company WhatsApp number in international format (Oman country code 968).
// Confirm the number is correct before publishing.
const WHATSAPP_NUMBER = "96896115050";

const langToggle = document.getElementById("langToggle");
const quoteForm = document.getElementById("quoteForm");
let currentLang = "ar";

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-ar][data-en]").forEach((el) => {
    const value = el.dataset[lang];
    if (value !== undefined) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") return;
      if (el.tagName === "OPTION") el.textContent = value;
      else el.innerHTML = value;
    }
  });
  langToggle.textContent = lang === "ar" ? "EN" : "ع";
  document.title = lang === "ar"
    ? "NSAYM BARKA LLTJART | نوافذ وأبواب"
    : "NSAYM BARKA LLTJART | Windows & Doors";
}
langToggle.addEventListener("click", () => setLanguage(currentLang === "ar" ? "en" : "ar"));
document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-category]").forEach((link) => {
  link.addEventListener("click", () => {
    const select = quoteForm.elements.product;
    select.value = link.dataset.category;
  });
});

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(quoteForm);
  const fields = currentLang === "ar" ? {
    title: "طلب عرض سعر - NSAYM BARKA LLTJART",
    name: "الاسم",
    phone: "رقم الهاتف",
    product: "المنتج",
    location: "المدينة / المنطقة",
    quantity: "الكمية التقريبية",
    details: "المقاسات والتفاصيل"
  } : {
    title: "Quotation Request - NSAYM BARKA LLTJART",
    name: "Name",
    phone: "Phone",
    product: "Product",
    location: "City / area",
    quantity: "Approx. quantity",
    details: "Dimensions and details"
  };
  const message = [
    fields.title,
    `${fields.name}: ${form.get("name")}`,
    `${fields.phone}: ${form.get("phone")}`,
    `${fields.product}: ${form.get("product")}`,
    `${fields.location}: ${form.get("location") || "-"}`,
    `${fields.quantity}: ${form.get("quantity") || "-"}`,
    `${fields.details}: ${form.get("details") || "-"}`
  ].join("\n");

  if (!WHATSAPP_NUMBER) {
    const note = document.getElementById("formNote");
    note.textContent = currentLang === "ar"
      ? "النموذج جاهز، لكن يلزم إضافة رقم واتساب الشركة في أعلى ملف script.js حتى يفتح الإرسال."
      : "The form is ready, but add the company's WhatsApp number at the top of script.js to enable sending.";
    note.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
