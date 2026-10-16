const az = {
  locale: "az",
  months: ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avq", "sen", "okt", "noy", "dek"],
  name: "İsmət Cahangirov",
  meta: {
    title: "İsmət Cahangirov — Full Stack Developer",
    description:
      "Bakıdan full stack developer. Next.js, React Native, Node.js və PostgreSQL ilə veb və mobil məhsulları başdan-sona hazırlayıram.",
    ogDescription: "Başdan-sona hazırlanmış veb və mobil məhsullar: IdeyaNest, Xira, Xeco, Docify, Minna, Cahan Academy.",
  },
  nav: { home: "Ana səhifə", projects: "Layihələr", stack: "Texnologiyalar", about: "Haqqımda", contact: "Əlaqə" },
  header: {
    brand: "Cahangirov",
    homeLabel: "İsmət Cahangirov, yuxarı qayıt",
    city: "Bakı, GMT+4",
    cityShort: "Bakı",
    talk: "Əlaqə saxla",
    menu: "MENYU",
    menuLabel: "Menyu",
    closeMenu: "Menyunu bağla",
    language: "Dil",
  },
  hero: {
    giant: "Full Stack",
    role: "Full Stack Developer",
    open: "İş təkliflərinə açığam",
    headline: ["Bazadan son", "piksələ qədər,", "hamısı məndən."],
    shipped: "50+ layihə hazırlamışam",
    students: "100+ tələbə yetişdirmişəm",
    cta: "Əlaqə saxla",
    work: "İşlərimə bax",
    shipsWith: "İşlətdiyim alətlər",
    experience: "3+ il təcrübə",
    based: "Bakı, Azərbaycan",
    scroll: "Aşağı sürüşdür",
    alt: "Qara kostyumda, qırmızı işıqlı vizoru olan parlaq qara dəbilqəli fiqur",
  },
  featured: {
    live: "Canlı layihə",
    open: (name) => `${name} saytını yeni tabda aç`,
    prev: "Əvvəlki layihə",
    next: "Növbəti layihə",
  },
  projectsSection: {
    selected: ["Seçilmiş", "işlər"],
    hint: "Açmaq üçün karta klikləyin",
    title: "Layihələr",
    middle: "Tək başına dizayn edilib, qurulub və yayımlanıb",
    right: "Full stack developer",
  },
  wheel: {
    open: "Layihəni aç",
    me: "Mən",
    ring: "Full stack • Veb • Mobil • Real-time • Full stack • Veb • Mobil • Real-time •",
    cardLabel: (name, kind) => `${name}, ${kind}. Yeni tabda aç`,
    prev: "Əvvəlki layihə",
    next: "Növbəti layihə",
  },
  projects: {
    IdeyaNest: {
      kind: "Kraudfandinq platforması",
      summary:
        "Azərbaycan üçün mükafat əsaslı kütləvi maliyyələşdirmə. Müəlliflər hədəfi və son tarixi olan kampaniya yerləşdirir; kampaniya hədəfinin 80%-ini toplamasa, dəstəkçilərə pul tam qaytarılır.",
      tags: ["Veb", "iOS və Android", "Ödənişlər"],
    },
    "Alievs Space": {
      kind: "Tədris idarəetmə sistemi (LMS)",
      summary:
        "Tədris mərkəzləri üçün çoxtəşkilatlı LMS: tələbələr, ödənişlər, davamiyyət, qruplar, cədvəl, imtahanlar, ev tapşırıqları və onlayn görüşlər. Frontend hissəsini mən hazırlamışam.",
      tags: ["Frontend", "Dashboard", "Çoxtəşkilatlı"],
    },
    Mebline: {
      kind: "Mebel mağazası saytı",
      summary:
        "Ofis mebeli və interyer həlləri şirkəti üçün WordPress və WooCommerce üzərində sıfırdan yazılmış xüsusi tema: kateqoriya vitrini, məhsul kataloqu və təklif sorğusu.",
      tags: ["WordPress", "WooCommerce", "Xüsusi tema"],
    },
    Xira: {
      kind: "Video zəng və çat",
      summary:
        "Canlı onlayn statusu və bir toxunuşla video zəngi olan real-time mesajlaşma. Telefon nömrəsi əvəzinə nikneym ilə işləyir.",
      tags: ["Real-time", "Video", "Çat"],
    },
    Xeco: {
      kind: "Kreatorlarla canlı zənglər",
      summary:
        "Kreatorlar canlı yayına çıxır və izləyicilərlə təkbətək video zəng edir. Real-time çat və dəstək üçün göndərilən coinlər var.",
      tags: ["Video zəng", "Coinlər", "Real-time"],
    },
    "Cahan Academy": {
      kind: "Akademiya paneli",
      summary:
        "Akademiyanın idarəetmə paneli: müəllimlər, tələbələr, kurslar, davamiyyət, ev tapşırıqları, imtahanlar, quizlər və cədvəl bir yerdə.",
      tags: ["Dashboard", "Rollar", "Çoxdilli"],
    },
    Docify: {
      kind: "Fayl konvertoru",
      summary:
        "Şəkil, video, audio və PDF fayllarını tamamilə brauzerin içində çevirir. Fayl serverə yüklənmir, qeydiyyat və ölçü limiti yoxdur.",
      tags: ["Məxfilik", "Media", "PDF"],
    },
    Minna: {
      kind: "Anime yayımı",
      summary: "Trenddə olan, populyar və ən yüksək reytinqli animeləri sevimlilər, bloqlar və icma bölməsi ilə yayımlayır.",
      tags: ["Streaming", "Hesablar", "İcma"],
    },
  },
  stack: {
    lead: ["", "Nə ilə", " qururam"],
    title: "Texnologiyalar",
    subtitle: "Proqramlaşdırma dilləri ekranlarda, gündəlik işlətdiyim digər alətlər isə lövhəyə sancılıb.",
    tvAlt: "Qırmızı vizorlu qara dəbilqəli fiqur köhnə televizorların üstündə oturub",
    notes: {
      Frameworks: "Freymvorklar",
      "State & data": "State və data",
      UI: "UI kitabxanaları",
      "Databases & BaaS": "Verilənlər bazası",
      "Real-time": "Real-time",
      "DevOps & hosting": "DevOps və hostinq",
      "AI tools": "AI alətləri",
    },
  },
  about: {
    label: "Haqqımda",
    headline: ["Bir developer,", "bütöv məhsul."],
    body:
      "Mən İsmət Cahangirov, Bakıdan full stack developerəm. Məhsulu boş repozitoriyadan production-a qədər aparıram: verilənlər bazasının sxemi, API, veb tətbiq, mobil tətbiq və deploy. Bu səhifədəki hər layihəni özüm dizayn etmiş, qurmuş və yayımlamışam.",
    stats: [
      { value: "3+", label: "il MERN stack ilə məhsul hazırlayıram" },
      { value: "100+", label: "tələbəyə proqramlaşdırma öyrətmişəm" },
    ],
    areas: [
      {
        title: "Frontend",
        body: "React, Next.js və TypeScript ilə komponent əsaslı interfeyslər. Hər səhifə üçün uyğun render strategiyası seçirəm: SSR, SSG və ya ISR.",
        keys: ["React", "Next.js", "Redux Toolkit", "Zustand"],
      },
      {
        title: "Backend və API",
        body: "Node.js və Express ilə REST API, PostgreSQL və MongoDB-də data modelləri, autentifikasiya axınları, Redis ilə keşləmə və rate limiting.",
        keys: ["Node.js", "Prisma", "Supabase", "Upstash"],
      },
      {
        title: "Mobil",
        body: "React Native ilə iOS və Android tətbiqləri: native modullar, push bildirişlər, offline rejim və store relizləri.",
        keys: ["React Native", "Expo", "Push", "Offline"],
      },
      {
        title: "Real-time",
        body: "WebRTC, LiveKit, Jitsi və Socket.IO üzərində canlı video, səsli zəng, ani bildirişlər və birgə iş.",
        keys: ["WebRTC", "LiveKit", "WebSocket"],
      },
      {
        title: "SEO və performans",
        body: "LCP, INP və CLS üzrə Core Web Vitals optimizasiyası: code splitting, lazy loading, şəkil optimizasiyası, keşləmə və semantik HTML.",
        keys: ["Core Web Vitals", "Keşləmə", "a11y"],
      },
      {
        title: "Liderlik",
        body: "Frontend komandasına rəhbərlik etmişəm, code review mədəniyyəti qurmuşam, junior və middle developerlərə mentorluq etmişəm, akademiya kurikulumuna cavabdeh olmuşam.",
        keys: ["Code review", "Mentorluq", "Kurikulum"],
      },
    ],
  },
  contact: {
    label: "Əlaqə",
    headline: ["Məhsul", "ideyanız var?", "Gəlin quraq."],
    body: "Frilans layihələr, tam ştat iş təklifləri və ya arxitekturanıza ikinci rəy. Adətən bir gün ərzində cavab verirəm.",
    methods: { email: "E-poçt", phone: "Telefon", github: "GitHub", location: "Ünvan" },
    formTitle: "Mənə yazın",
    formSub: "Mesaj birbaşa mənə çatır. Adətən bir gün ərzində cavab verirəm.",
    nameLabel: "Ad",
    namePlaceholder: "Adınız",
    emailLabel: "E-poçt",
    emailPlaceholder: "ad@example.com",
    messageLabel: "Layihə",
    messagePlaceholder: "Nə qurursunuz və nə vaxta lazımdır?",
    submit: "Mesajı göndər",
    errors: {
      name: "Adınızı yazın.",
      email: "Düzgün e-poçt ünvanı yazın, məsələn ad@example.com.",
      message: "Layihəniz haqqında ən azı bir cümlə yazın.",
    },
    sending: "Göndərilir…",
    toast: "Təşəkkürlər! Mesajınız göndərildi.",
    failed: "Mesaj göndərilmədi. Yenidən cəhd edin və ya birbaşa e-poçt yazın.",
    rateLimited: "Şəbəkənizdən çoxlu mesaj gəlib. Bir az sonra yenidən cəhd edin və ya birbaşa e-poçt yazın.",
  },
  footer: {
    giant: "Gəlin quraq",
    role: "Full stack developer, Bakı",
    top: "Yuxarı qayıt",
    built: "Next.js ilə qurulub",
    navLabel: "Alt menyu",
  },
  skip: "Layihələrə keç",
};

export default az;
