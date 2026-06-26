import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    ko: {
        translation: {
            common: {
                language: "언어",
                korean: "KR",
                english: "EN",
                openMenu: "메뉴 열기",
                closeMenu: "메뉴 닫기",
                goHome: "홈으로 이동",
                opensNewTab: "새 탭에서 열림",
                scrollDown: "Scroll Down",
                contactUs: "Contact Us",
                newsThumbnail: "뉴스 썸네일",
            },
            nav: {
                amuse8: "Amuse8",
                blokit: "Blokit AI",
                custom: "Custom AI",
                wallwall: "WallWall AI",
            },
            home: {
                seoDescription: "Amuse8은 AI 기반 서비스와 맞춤형 AI 솔루션을 통해 기업의 데이터와 업무를 효율적으로 연결하는 AI 기업입니다.",
                hero: {
                    tagline: "Finding Muse In AI",
                    visionCta: "우리의 비전에 대해 알아보기",
                },
                products: {
                    label: "Our Products",
                    intro: ["We unlock the full potential of data", "and provide AI optimized for your business."],
                    introKo: ["정보의 잠재력을 드러내고", "비즈니스에 최적화된 AI를", "제공합니다."],
                    blokitDescription: ["흩어진 문서를 자동으로 분석해 명확한 구조로 정리해줍니다.", "Blokit을 통해 복잡한 자료 관리 없이 필요한 순간 즉시 활용할 수 있는", "업무 환경을 경험해보세요."],
                    blokitCta: "Blokit AI 알아보기",
                    customDescription: ["기업의 문제를 분석해 목적에 맞는 AI 솔루션을 설계·구현합니다.", "Custom AI를 통해 복잡한 업무를 자동화하고, 실제 현장에서 바로 적용", "가능한 AI 경험을 만들어 보세요."],
                    customCta: "Custom AI 알아보기",
                },
                history: {
                    label: "Our History",
                    headline: ["We redefine how businesses operate", "and their future competitiveness."],
                    subline: "기업의 운영 방식과 미래 경쟁력을 재정의합니다.",
                },
                partners: {
                    trusted: "Trusted by many leading businesses",
                    trustedKo: "많은 기업들이 아뮤즈8과 함께하고 있습니다.",
                    shaping: "Shaping the Future with Amuse8",
                    opportunity: "New business opportunities expanded by AI",
                    opportunityKo: "AI로 확장되는 새로운 비즈니스 기회",
                    create: "Create the services of the future with Amuse8.",
                    createKo: "Amuse8와 함께 미래의 서비스를 만들어보세요.",
                },
                articles: [
                    { title: "AI 기반 스마트 클라우드 서비스를 제공하는 기업 ‘아뮤즈8’", tags: ["#AI", "#클라우드"], sourceName: "한국경제" },
                    { title: "아뮤즈8 '2024 품질만족지수 1위 기업 및 혁신기술 대상' 선정", tags: ["#품질만족지수", "#아뮤즈8"], sourceName: "스포츠 동아" },
                    { title: "아뮤즈8 '2025 전략기술 딥테크 창업촉진 사업' 최종 선정", tags: ["#전략기술", "#딥테크"], sourceName: "과학기술정보통신부" },
                    { title: "아뮤즈8 '2025 D.V.S 드림벤처스타' 최종선정", tags: ["#D.V.S", "#드림벤처스타"], sourceName: "대전창조경제혁신센터" },
                    { title: "아뮤즈8 '2024 HAI START 창업 경진대회’ 딥테크 부문 수상", tags: ["#동국대", "#딥테크"], sourceName: "동국대학교" },
                    { title: "아뮤즈8 '예비창업패키지 우수졸업'", tags: ["#예비창업패키지"], sourceName: "중소벤처기업부" },
                    { title: "AI 자동 태깅으로 사내 자료 관리 혁신 이끄는 아뮤즈8", tags: ["#자동태깅", "#사내자료관리"], sourceName: "동아일보" },
                    { title: "아뮤즈8, AI 기술 접목한 지능형 데이터 관리 서비스 확대", tags: ["#AI", "#데이터관리서비스"], sourceName: "AI포스트" },
                    { title: "아뮤즈8, 광주광역시와 업무협약 및 기술협약", tags: ["#자동분류", "#정보관리"], sourceName: "광주광역시" },
                    { title: "아뮤즈8, AI기반 데이터 자동 태깅 기술 비전 AI에 최초 적용", tags: ["#데이터자동태깅", "#효율화"], sourceName: "MSN" },
                    { title: "베스트셀러 '대표라면 반드시 알아야 할 창업의 기술' 추천사 신동민 대표", tags: ["#창업의기술", "#추천사"], sourceName: "플랫잇" },
                    { title: "자료관리 자동화 킵, 모든 자료와 정보를 기억해줄 수 있는 AI 패러다임 바꿔나간다.", tags: ["#Ceep", "#AI패러다임"], sourceName: "한국경제" },
                    { title: "기업 내부 데이터 관리 패러다임 전환, AI 자동화 기술 앞세운 아뮤즈8", tags: ["#패러다임", "#AI자동화"], sourceName: "동아일보" },
                    { title: "아뮤즈8, AI 기반 데이터 자동 태깅 기술로 정보 관리 효율화", tags: ["#AI", "#정보관리"], sourceName: "한국미디어뉴스통신" },
                    { title: "아뮤즈8 '청년창업사관학교 15기 졸업'", tags: ["#청년창업사관학교", "#청창사"], sourceName: "중소벤처기업부" },
                    { title: "아뮤즈8 '2024 동국대학교 캠퍼스타운’ 우수기업 선정", tags: ["#동국대", "#캠퍼스타운", "#우수기업"], sourceName: "동국대학교" },
                ],
            },
        },
    },
    en: {
        translation: {
            common: {
                language: "Language",
                korean: "KR",
                english: "EN",
                openMenu: "Open menu",
                closeMenu: "Close menu",
                goHome: "Go to home",
                opensNewTab: "Opens in a new tab",
                scrollDown: "Scroll Down",
                contactUs: "Contact Us",
                newsThumbnail: "News thumbnail",
            },
            nav: {
                amuse8: "Amuse8",
                blokit: "Blokit AI",
                custom: "Custom AI",
                wallwall: "WallWall AI",
            },
            home: {
                seoDescription: "Amuse8 connects enterprise data and workflows through AI-powered services and custom AI solutions.",
                hero: {
                    tagline: "Finding Muse In AI",
                    visionCta: "Explore our vision",
                },
                products: {
                    label: "Our Products",
                    intro: ["We unlock the full potential of data", "and provide AI optimized for your business."],
                    introKo: ["We reveal the potential of information", "and deliver AI optimized for business."],
                    blokitDescription: ["Blokit automatically analyzes scattered documents and organizes them into a clear structure.", "Use information instantly when you need it, without complex document management.", "Build a work environment where knowledge is ready to use."],
                    blokitCta: "Learn more about Blokit AI",
                    customDescription: ["We analyze business problems and design AI solutions tailored to each objective.", "With Custom AI, automate complex workflows and create AI experiences", "that can be applied directly in the field."],
                    customCta: "Learn more about Custom AI",
                },
                history: {
                    label: "Our History",
                    headline: ["We redefine how businesses operate", "and their future competitiveness."],
                    subline: "We reshape business operations and future competitiveness.",
                },
                partners: {
                    trusted: "Trusted by many leading businesses",
                    trustedKo: "Many companies are building with Amuse8.",
                    shaping: "Shaping the Future with Amuse8",
                    opportunity: "New business opportunities expanded by AI",
                    opportunityKo: "New business opportunities powered by AI",
                    create: "Create the services of the future with Amuse8.",
                    createKo: "Build future-ready services with Amuse8.",
                },
                articles: [
                    { title: "Amuse8 provides AI-powered smart cloud services", tags: ["#AI", "#Cloud"], sourceName: "Korea Economic Daily" },
                    { title: "Amuse8 selected as a 2024 Quality Satisfaction Index No. 1 and Innovative Technology award winner", tags: ["#QualityIndex", "#Amuse8"], sourceName: "Sports Donga" },
                    { title: "Amuse8 selected for the 2025 Strategic Technology Deep-Tech Startup Acceleration Program", tags: ["#StrategicTech", "#DeepTech"], sourceName: "MSIT" },
                    { title: "Amuse8 selected for 2025 D.V.S Dream Venture Star", tags: ["#DVS", "#DreamVentureStar"], sourceName: "Daejeon Center for Creative Economy & Innovation" },
                    { title: "Amuse8 wins in the deep-tech category at the 2024 HAI START Startup Competition", tags: ["#Dongguk", "#DeepTech"], sourceName: "Dongguk University" },
                    { title: "Amuse8 graduates with excellence from the Pre-Startup Package", tags: ["#PreStartupPackage"], sourceName: "MSS" },
                    { title: "Amuse8 leads innovation in internal document management with AI auto-tagging", tags: ["#AutoTagging", "#DocumentManagement"], sourceName: "Dong-A Ilbo" },
                    { title: "Amuse8 expands intelligent data management services powered by AI", tags: ["#AI", "#DataManagement"], sourceName: "AI Post" },
                    { title: "Amuse8 signs business and technology partnership with Gwangju Metropolitan City", tags: ["#AutoClassification", "#InformationManagement"], sourceName: "Gwangju Metropolitan City" },
                    { title: "Amuse8 applies AI-based data auto-tagging technology to Vision AI for the first time", tags: ["#DataAutoTagging", "#Efficiency"], sourceName: "MSN" },
                    { title: "CEO Shin Dong-min contributes a recommendation for the bestseller Startup Skills Every CEO Should Know", tags: ["#StartupSkills", "#Recommendation"], sourceName: "Platit" },
                    { title: "Ceep, a document management automation service, aims to change the AI paradigm by remembering every file and piece of information", tags: ["#Ceep", "#AIParadigm"], sourceName: "Korea Economic Daily" },
                    { title: "Amuse8 leads the shift in enterprise data management with AI automation technology", tags: ["#Paradigm", "#AIAutomation"], sourceName: "Dong-A Ilbo" },
                    { title: "Amuse8 improves information management efficiency with AI-based data auto-tagging", tags: ["#AI", "#InformationManagement"], sourceName: "Korea Media News" },
                    { title: "Amuse8 graduates from the 15th Youth Startup Academy", tags: ["#YouthStartupAcademy", "#Startup"], sourceName: "MSS" },
                    { title: "Amuse8 selected as an outstanding company in the 2024 Dongguk University Campus Town program", tags: ["#Dongguk", "#CampusTown", "#OutstandingCompany"], sourceName: "Dongguk University" },
                ],
            },
        },
    },
} as const;

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("amuse8-language") || "ko",
    fallbackLng: "ko",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
