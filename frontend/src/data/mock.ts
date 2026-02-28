import { NavLink, ProductCard, Testimonial, ProblemItem } from "../types";

export const navLinks: NavLink[] = [
    {
        id: "nav-produk",
        labelId: "Produk",
        labelEn: "Products",
        href: "#layanan",
        children: [
            { id: "prod-1", labelId: "Intelligent AI CS", labelEn: "Intelligent AI CS", href: "/products/ai-cs", icon: "Sparkles", descId: "Automasi layanan pelanggan 24/7 & penutupan sales.", descEn: "Automate 24/7 customer service & sales closing." },
            { id: "prod-2", labelId: "Automated Smart CRM", labelEn: "Automated Smart CRM", href: "/products/smart-crm", icon: "BarChart3", descId: "Pusat kendali data & retensi pelanggan otomatis.", descEn: "Automated data control & customer retention center." },
            { id: "prod-3", labelId: "High-Performance Website", labelEn: "High-Performance Website", href: "/products/website", icon: "Globe", descId: "Etalase digital premium terintegrasi AI.", descEn: "AI-integrated premium digital storefront." },
            { id: "prod-4", labelId: "Custom AI Integration", labelEn: "Custom AI Integration", href: "/products/custom-ai", icon: "Zap", descId: "Solusi AI tailor-made untuk skala korporat.", descEn: "Tailor-made AI solutions for corporate scale." },
        ],
    },
    { id: "nav-studi", labelId: "Studi Kasus", labelEn: "Case Studies", href: "/404" },
    {
        id: "nav-perusahaan",
        labelId: "Perusahaan",
        labelEn: "Company",
        href: "/about",
        children: [
            { id: "co-1", labelId: "Tentang Kami", labelEn: "About Us", href: "/about", icon: "Building2", descId: "Visi & misi agensi kami.", descEn: "Our agency vision & mission." },
            { id: "co-2", labelId: "Tim Kami", labelEn: "Our Team", href: "/team", icon: "Users", descId: "Kenali tim di balik UpRev.", descEn: "Meet the team behind UpRev." },
            { id: "co-3", labelId: "Karir & Kolaborasi", labelEn: "Careers & Partners", href: "/careers", icon: "Handshake", descId: "Bergabung atau bermitra dengan kami.", descEn: "Join or partner with us." },
            { id: "co-4", labelId: "Hubungi Kami", labelEn: "Contact Us", href: "#contact-drawer", icon: "Phone", descId: "Akses langsung ke tim kami.", descEn: "Direct access to our team." },
        ],
    },
    {
        id: "nav-resources",
        labelId: "Resources",
        labelEn: "Resources",
        href: "#",
        children: [
            { id: "res-1", labelId: "Live Demo", labelEn: "Live Demo", href: "https://demo1.uprev.id", icon: "Rocket", descId: "Langsung coba sistem UpRev.", descEn: "Try the UpRev system live." },
            { id: "res-2", labelId: "Blog & Insights", labelEn: "Blog & Insights", href: "/404", icon: "FileText", descId: "Artikel tentang tren AI & bisnis digital.", descEn: "Articles on AI trends & digital business." },
            { id: "res-3", labelId: "Dokumentasi / FAQ", labelEn: "Documentation / FAQ", href: "/404", icon: "BookOpen", descId: "Panduan teknis & jawaban umum.", descEn: "Technical guides & common answers." },
        ],
    },
    { id: "nav-harga", labelId: "Harga", labelEn: "Pricing", href: "#harga" },
];

export const problems: ProblemItem[] = [
    {
        number: "01",
        title: "Invisible Brand",
        titleEn: "Invisible Brand",
        description: "Bisnis tidak muncul di Google atau memiliki website yang buruk. Akibatnya, calon klien besar meragukan kredibilitas Anda dan memilih kompetitor.",
        descriptionEn: "Your business is invisible on Google or has a terrible website. As a result, large potential clients doubt your credibility and choose your competitors.",
        icon: "InvisibleBrand",
    },
    {
        number: "02",
        title: "Slow Response Time",
        titleEn: "Slow Response Time",
        description: "Pelanggan menuntut respon instan. Menjawab chat manual yang lambat membuat Anda kehilangan momentum penjualan setiap hari.",
        descriptionEn: "Customers demand instant responses. Replying manually and slowly makes you lose sales momentum every day.",
        icon: "SlowResponse",
    },
    {
        number: "03",
        title: "High Operational Cost",
        titleEn: "High Operational Cost",
        description: "Biaya SDM membengkak hanya untuk pekerjaan admin repetitif. Profit Anda tergerus oleh inefisiensi kerja manual.",
        descriptionEn: "HR costs swell just for repetitive admin tasks. Your profits are eroded by the inefficiency of manual labor.",
        icon: "HighCost",
    },
    {
        number: "04",
        title: "Zero Retention & Upsell",
        titleEn: "Zero Retention & Upsell",
        description: "Tanpa sistem CRM, Anda gagal merawat pelanggan lama. Anda kehilangan potensi Upselling yang seharusnya menjadi profit termudah bisnis Anda.",
        descriptionEn: "Without a CRM system, you fail to nurture old customers. You lose the potential for Upselling which should be your lowest-hanging fruit for profit.",
        icon: "ZeroRetention",
    },
];

export const products: ProductCard[] = [
    {
        id: "ai-cs",
        title: "Intelligent AI CS",
        titleEn: "Intelligent AI CS",
        description: "Dukungan pelanggan 24/7. AI kami membalas prospek dan menutup penjualan secara otomatis.",
        descriptionEn: "24/7 customer support. Our AI replies to prospects and closes sales automatically.",
        gridArea: "left",
        mockVisual: "chat",
        href: "/products/ai-cs",
    },
    {
        id: "smart-crm",
        title: "Automated Smart CRM",
        titleEn: "Automated Smart CRM",
        description: "Pusat kendali data. Kelola leads dan maksimalkan retention otomatis.",
        descriptionEn: "Data control center. Manage leads and maximize retention automatically.",
        gridArea: "right-top",
        mockVisual: "chart",
        href: "/products/smart-crm",
    },
    {
        id: "website",
        title: "High-Performance Website",
        titleEn: "High-Performance Website",
        description: "Etalase digital premium yang terintegrasi penuh dengan AI.",
        descriptionEn: "Premium digital storefront fully integrated with AI.",
        gridArea: "right-bottom",
        mockVisual: "wireframe",
        href: "/products/website",
    },
];

export const testimonials: Testimonial[] = [
    {
        id: "testi-1",
        quote: "Senang sekali bisa bekerja sama dengan Darrell dan Filbert (Founder of UpRev), mereka tidak hanya mengerjakan apa yang kami minta, tetapi juga aktif memberikan masukan dan bertindak layaknya partner sejati. Mereka sangat proaktif dan benar-benar membantu memberikan ide untuk membuat produk menjadi lebih baik. Sangat bersyukur telah mempercayakan proyek AI Automation ini kepada mereka",
        quoteEn: "Working with Darrell and Filbert (Founder of UpRev) was amazing, mainly because they didn't just code what we asked for, but they also actively give feedback and acted like an actual partner. They were super proactive and actually help throwing out ideas to make the product better. Really glad I trusted them with this AI Automation project",
        authorName: "Calvin Christofan Ng",
        authorTitle: "CTO & Co-Founder, Marksman Media SG",
        countryFlag: "🇸🇬",
    },
    {
        id: "testi-2",
        quote: "Bekerja dengan tim pengembangan AI dan web ini di website STARGAZE Centre of Excellence adalah pengalaman yang luar biasa. Mereka profesional, tepat waktu, fleksibel soal anggaran, dan sangat cerdik, dengan cepat memahami kebutuhan teknis khusus kami dan menerjemahkannya menjadi platform modern kelas dunia yang cocok untuk audiens khusus. Tim muda insinyur AI dan perangkat lunak mereka yang bersemangat memberikan situs yang halus dan berkualitas tinggi dengan perhatian yang mengesankan terhadap detail, kinerja, dan kegunaan. Kami akan dengan percaya diri merekomendasikan mereka kepada siapa pun yang mencari mitra pengembangan yang cakap dan berpikiran maju.",
        quoteEn: "Working with this AI and web development team on the STARGAZE Centre of Excellence website was an excellent experience. They were professional, timely, budget-flexible, and highly resourceful, quickly understanding our niche technical requirements and translating them into a modern, world-class platform suited for a specialized audience. Their passionate team of young AI and software engineers delivered a polished, high-quality site with impressive attention to detail, performance, and usability. We would confidently recommend them to anyone seeking a capable, forward-thinking development partner.",
        authorName: "Malvin",
        authorTitle: "Chairman of the Strategic Operations Committee at STARGAZE, XMUM CoE MY",
        countryFlag: "🇲🇾",
    },
];

export const MOCK_REPLIES = [
    "Tentu! AI kami dirancang untuk membalas pesan dalam hitungan detik, 24/7.",
    "Kami bisa mengintegrasikan sistem ini langsung ke WhatsApp atau website Anda.",
    "Menarik. Apakah Anda ingin menjadwalkan demo langsung dengan tim kami?",
    "Bisa, kami menyesuaikan gaya bahasa AI agar persis seperti brand Anda.",
];
