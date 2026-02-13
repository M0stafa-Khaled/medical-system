import {
  Laptop,
  Shield,
  Zap,
  Stethoscope,
  Heart,
  Baby,
  Activity,
  Trees,
  Smile,
  Brain,
  Utensils,
  Calendar,
  Users,
  ShieldCheck,
  Clipboard,
} from "lucide-react";

export const doctors = [
  {
    name: "د. سارة جونسون",
    specialty: "استشاري القلب والأوعية الدموية",
    rating: 4.9,
    reviews: 120,
    image: "/images/avatar.svg",
    available: true,
  },
  {
    name: "د. أحمد علي",
    specialty: "استشاري المخ والأعصاب",
    rating: 4.8,
    reviews: 85,
    image: "/images/avatar.svg",
    available: false,
  },
  {
    name: "د. إيميلي تشين",
    specialty: "أخصائي طب الأطفال",
    rating: 5.0,
    reviews: 210,
    image: "/images/avatar.svg",
    available: true,
  },
  {
    name: "د. مايكل روس",
    specialty: "استشاري الجلدية والتجميل",
    rating: 4.7,
    reviews: 95,
    image: "/images/avatar.svg",
    available: true,
  },
];

export const faqs = [
  {
    question: "كيف يمكنني حجز موعد؟",
    answer:
      "يمكنك حجز موعد بسهولة من خلال الضغط على زر 'احجز موعد' في أعلى الصفحة، أو عن طريق تحميل تطبيقنا واختيار الطبيب والموعد المناسب لك.",
  },
  {
    question: "هل تقبلون التأمين الصحي؟",
    answer:
      "نعم، نتعامل مع معظم شركات التأمين الكبرى. يرجى التواصل مع الاستقبال أو مراجعة قائمة الشركات المعتمدة لدينا للتأكد من تغطية تأمينك.",
  },
  {
    question: "ما هي مواعيد العمل؟",
    answer:
      "نعمل طوال أيام الأسبوع من الساعة 8 صباحاً وحتى 11 مساءً، وخدمة الطوارئ متاحة 24 ساعة يومياً.",
  },
  {
    question: "هل تتوفر خدمة الزيارات المنزلية؟",
    answer:
      "نعم، نوفر خدمة الكشف المنزلي لعدد من التخصصات. يمكنك طلب الخدمة عن طريق الاتصال بنا أو من خلال التطبيق.",
  },
  {
    question: "كيف يمكنني الحصول على نتائج التحاليل؟",
    answer:
      "ستصلك رسالة نصية فور صدور النتائج، ويمكنك الاطلاع عليها وتحميلها مباشرة من خلال ملفك الطبي على تطبيق الهاتف.",
  },
];

export const features = [
  {
    id: "portal",
    label: "بوابة المرضى",
    icon: Laptop,
    title: "ملفك الطبي متاح دائماً",
    description:
      "نظام إلكتروني متطور يمكنك من حجز المواعيد، متابعة سجلك الطبي، والاطلاع على نتائج التحاليل من أي جهاز عبر الموقع.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
    benefits: [
      "حجز موعد أونلاين بسهولة",
      "تاريخ مرضي مسجل بالكامل",
      "دخول آمن من أي متصفح",
    ],
  },
  {
    id: "lab",
    label: "المختبر",
    icon: Zap,
    title: "نتائج دقيقة وسريعة",
    description:
      "مختبرات مجهزة بأحدث الأجهزة لضمان دقة النتائج، مع إمكانية استلامها عبر الموقع الإلكتروني فور صدورها.",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1000",
    benefits: [
      "أجهزة تحليل متطورة",
      "طاقم معملي متخصص",
      "نتائج إلكترونية فورية",
    ],
  },
  {
    id: "security",
    label: "الخصوصية",
    icon: Shield,
    title: "بياناتك في أمان تام",
    description:
      "نعتمد أحدث بروتوكولات التشفير لحماية سجلك الطبي وبياناتك الشخصية، لأن ثقتكم هي أساس عملنا.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    benefits: [
      "تشفير كامل للبيانات",
      "سرية تامة للمعلومات",
      "متوافق مع معايير الجودة العالمية",
    ],
  },
];

export const specialtiesClinics = [
  {
    icon: Stethoscope,
    title: "الباطنة العامة",
    description: "تشخيص وعلاج الأمراض الباطنية ومتابعة الحالات المزمنة.",
  },
  {
    icon: Baby,
    title: "طب الأطفال",
    description: "رعاية شاملة لصحة طفلك من حديثي الولادة حتى المراهقة.",
  },
  {
    icon: Smile,
    title: "الأسنان",
    description: "خدمات تجميل وعلاج الأسنان بأحدث التقنيات.",
  },
  {
    icon: Heart,
    title: "القلب والأوعية",
    description: "رسم قلب إيكو ومتابعة مرضى الضغط والقلب.",
  },
  {
    icon: Trees,
    title: "العظام والمفاصل",
    description: "علاج كسور وإصابات الملاعب والتهابات المفاصل.",
  },
  {
    icon: Activity,
    title: "الجلدية والتجميل",
    description: "علاج الأمراض الجلدية وجلسات العناية بالبشرة والشعر.",
  },
  {
    icon: Brain,
    title: "النفسية والعصبية",
    description: "استشارات نفسية وعلاج الاضطرابات السلوكية.",
  },
  {
    icon: Utensils,
    title: "التغذية العلاجية",
    description: "برامج غذائية مخصصة لإنقاص الوزن وللرياضيين.",
  },
];

export const systemFeatures = [
  {
    title: "سجلات طبية إلكترونية",
    description:
      "احتفظ بملفك الطبي وتاريخك المرضي في مكان واحد آمن وسهل الوصول.",
    icon: Clipboard,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "حجز مواعيد فوري",
    description: "احجز موعدك مع طبيبك المفضل بسهولة من خلال الموقع أو التطبيق.",
    icon: Calendar,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "أفضل الاستشاريين",
    description:
      "نخبة من الأطباء والاستشاريين في مختلف التخصصات لضمان أفضل رعاية.",
    icon: Users,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "نتائج تحاليل فورية",
    description:
      "احصل على نتائج التحاليل والأشعة فور صدورها عبر التطبيق مباشرة.",
    icon: Activity,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "خوصوصية وأمان",
    description:
      "نلتزم بأعلى معايير الأمان والخصوصية للحفاظ على سرية بياناتك الطبية.",
    icon: ShieldCheck,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    title: "طوارئ 24/7",
    description:
      "جاهزون لاستقبال الحالات الطارئة على مدار الساعة طوال أيام الأسبوع.",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
];

export const testimonials = [
  {
    name: "م. محمد حسن",
    role: "مريض قلب",
    content:
      "تجربة علاجية ممتازة، الطاقم الطبي محترف جداً، والمتابعة الدورية عبر التطبيق سهلت علي الكثير من العناء.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "أ. منى زكي",
    role: "أم لثلاثة أطفال",
    content:
      "قسم الأطفال رائع، والدكتورة إيمان تتعامل مع الأطفال بحب واهتمام كبير. أنصح كل الأمهات بزيارة العيادة.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "أ. أحمد سمير",
    role: "مريض سكري",
    content:
      "النظام والدقة في المواعيد هو أكثر ما يميز عيادتي. لم أنتظر أكثر من 5 دقائق للدخول للطبيب.",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
  },
];
