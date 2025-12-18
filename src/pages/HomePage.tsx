import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import mainArticle1 from "@/assets/main-article-1.webp";
import mainArticle2 from "@/assets/main-article-2.webp";
import mainArticle3 from "@/assets/main-article-3.webp";
import mainArticle4 from "@/assets/main-article-4.webp";
import mainArticle5 from "@/assets/main-article-5.webp";
import mainArticle6 from "@/assets/main-article-6.webp";
import mainArticle7 from "@/assets/main-article-7.webp";
import mainArticle8 from "@/assets/main-article-8.webp";
import mainArticle9 from "@/assets/main-article-9.webp";
import mainArticle10 from "@/assets/main-article-10.webp";

import partnerLogo1 from "@/assets/company-logo/company-1.png";
import partnerLogo2 from "@/assets/company-logo/company-2.png";
import partnerLogo3 from "@/assets/company-logo/company-3.svg";
import partnerLogo4 from "@/assets/company-logo/company-4.png";
import partnerLogo5 from "@/assets/company-logo/company-5.png";
import partnerLogo6 from "@/assets/company-logo/company-6.png";
import partnerLogo7 from "@/assets/company-logo/company-7.png";
import partnerLogo8 from "@/assets/company-logo/company-8.svg";
import partnerLogo9 from "@/assets/company-logo/company-9.png";
import partnerLogo10 from "@/assets/company-logo/company-10.png";
import partnerLogo11 from "@/assets/company-logo/company-11.png";
import partnerLogo12 from "@/assets/company-logo/company-12.png";
import partnerLogo13 from "@/assets/company-logo/company-13.png";
import partnerLogo14 from "@/assets/company-logo/company-14.png";
import partnerLogo15 from "@/assets/company-logo/company-15.png";

import mainCustom1200 from "@/assets/main-custom-1200.webp";
import mainCustom2000 from "@/assets/main-custom-2000.webp";
import mainCeep1200 from "@/assets/main-ceep-1200.webp";
import mainCeep2000 from "@/assets/main-ceep-2000.webp";
import mainFirstImage from "@/assets/main-first-image-2000.webp";

const HomePage = () => {
    const scrollRootRef = useRef<HTMLDivElement | null>(null);

    const heroRef = useRef<HTMLDivElement | null>(null);

    const introSectionRef = useRef<HTMLElement | null>(null);
    const partnersSectionRef = useRef<HTMLElement | null>(null);

    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const [showAmuseTitle, setShowAmuseTitle] = useState(true);

    const ARTICLES = useMemo(
        () => [
        { id: 1, title: "AI 기반 스마트 클라우드 서비스를 제공하는 기업 ‘아뮤즈8’", tags: ["#AI", "#클라우드"], image: mainArticle1, sourceName: "한국경제" },
        { id: 2, title: "아뮤즈8 “AI 데이터 자동 태깅 기술로 정보관리, 데이터 처리 혁신”", tags: ["#정보관리", "#데이터"], image: mainArticle2, sourceName: "스포츠 동아"  },
        { id: 3, title: "기업 내부 데이터 관리 패러다임 전환, AI 자동화 기술 앞세운 아뮤즈8", tags: ["#패러다임", "#AI자동화"], image: mainArticle3, sourceName: "동아일보"  },
        { id: 4, title: "아뮤즈8, AI 기반 데이터 자동 태깅 기술로 정보 관리 효율화", tags: ["#AI", "#정보관리"], image: mainArticle4, sourceName: "한국미디어뉴스통신"  },
        { id: 5, title: "자료관리 자동화 킵, 모든 자료와 정보를 기억해줄 수 있는 AI 패러다임 바꿔나간다.", tags: ["#Ceep", "#AI패러다임"], image: mainArticle5, sourceName: "한국경제"  },
        { id: 6, title: "베스트셀러 '대표라면 반드시 알아야 할 창업의 기술' 추천사 신동민 대표", tags: ["#창업의기술", "#추천사"], image: mainArticle6, sourceName: "플랫잇"  },
        { id: 7, title: "AI 자동 태깅으로 사내 자료 관리 혁신 이끄는 아뮤즈8", tags: ["#자동태깅", "#사내자료관리"], image: mainArticle7, sourceName: "동아일보"  },
        { id: 8, title: "아뮤즈8, AI 기술 접목한 지능형 데이터 관리 서비스 확대", tags: ["#AI", "#데이터관리서비스"], image: mainArticle8, sourceName: "AI포스트"  },
        { id: 9, title: "아뮤즈8, 광주광역시와 업무협약 및 기술협약", tags: ["#자동분류", "#정보관리"], image: mainArticle9, sourceName: "광주광역시"  },
        { id: 10, title: "아뮤즈8, AI기반 데이터 자동 태깅 기술 비전 AI에 최초 적용", tags: ["#데이터자동태깅", "#효율화"], image: mainArticle10, sourceName: "MSN"  },
        ],
        []
    );

    const PARTNER_LOGOS = useMemo(
        () => [
            { id: 1, name: "Partner 1", src: partnerLogo1 },
            { id: 2, name: "Partner 2", src: partnerLogo2 },
            { id: 3, name: "Partner 3", src: partnerLogo3 },
            { id: 4, name: "Partner 4", src: partnerLogo4 },
            { id: 5, name: "Partner 5", src: partnerLogo5 },
            { id: 6, name: "Partner 6", src: partnerLogo6 },
            { id: 7, name: "Partner 7", src: partnerLogo7 },
            { id: 8, name: "Partner 8", src: partnerLogo8 },
            { id: 9, name: "Partner 9", src: partnerLogo9 },
            { id: 10, name: "Partner 10", src: partnerLogo10 },
            { id: 11, name: "Partner 11", src: partnerLogo11 },
            { id: 12, name: "Partner 12", src: partnerLogo12 },
            { id: 13, name: "Partner 13", src: partnerLogo13 },
            { id: 14, name: "Partner 14", src: partnerLogo14 },
            { id: 15, name: "Partner 15", src: partnerLogo15 },
        ],
        []
    );

    useEffect(() => {
        const root = scrollRootRef.current;
        const hero = heroRef.current;
        if (!root || !hero) return;

        const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
            setIsHeroVisible(entry.isIntersecting);
            }
        },
        { root, threshold: 0.6 }
        );

        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent("hero-visibility", { detail: isHeroVisible }));
    }, [isHeroVisible]);

    useEffect(() => {
        const timer = setTimeout(() => setShowAmuseTitle(false), 1400);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const root = scrollRootRef.current;
        if (!root) return;

        const targets = Array.from(root.querySelectorAll<HTMLElement>(".fade-up"));
        if (targets.length === 0) return;

        const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("show");
            });
        },
        {
            root,
            threshold: 0.15,
            rootMargin: "0px 0px -10% 0px",
        }
        );

        targets.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [ARTICLES.length]);

    const handleScrollDown = () => {
        introSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div
        ref={scrollRootRef}
        className="home-page h-screen overflow-y-scroll snap-y snap-mandatory"
        >
        {/* HERO */}
        <section
            ref={heroRef}
            className="
            relative min-h-screen
            flex flex-col items-center justify-center
            text-center text-white snap-start
            overflow-hidden
            "
        >
            <img
            src={mainFirstImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            />

            <div
            className="
                absolute inset-0 -z-30
                flex items-start justify-center
                pointer-events-none select-none
            "
            >
            <span
                className="
                mt-16
                text-white font-extrabold tracking-wide leading-none
                text-[180px] sm:text-[230px] md:text-[280px] lg:text-[340px]
                opacity-10
                "
            >
                Amuse8
            </span>
            </div>

            <div className="absolute inset-0 bg-black/40 -z-10" />

            <div className="relative z-10 flex flex-col items-center">
            <h1
                className="
                relative z-10 mb-14
                text-3xl sm:text-5xl md:text-6xl font-bold
                w-full
                whitespace-nowrap
                text-center
                h-[1.3em]
                "
            >
                <span
                className={`
                    absolute inset-0
                    flex items-center justify-center
                    transition-all duration-700
                    ${showAmuseTitle ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
                `}
                >
                Amuse8
                </span>

                <span
                className={`
                    absolute inset-0
                    flex items-center justify-center
                    transition-all duration-700
                    whitespace-nowrap
                    ${showAmuseTitle ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}
                `}
                >
                Finding Muse In AI
                </span>
            </h1>

            <Link
                to="/about"
                className="
                group inline-flex items-center
                text-white text-lg font-medium
                mb-12 cursor-pointer
                px-4 py-2 rounded-full
                transition hover:bg-white/20
                "
            >
                <span className="mr-3 transition group-hover:opacity-80">
                우리의 비전에 대해 알아보기
                </span>
                <span
                className="
                    flex items-center justify-center
                    w-9 h-9
                    rounded-full border border-white/70
                    transition
                    group-hover:bg-white group-hover:text-black
                "
                >
                →
                </span>
            </Link>

            <button
                onClick={handleScrollDown}
                className="text-white/80 text-xl animate-bounce uppercase"
                type="button"
            >
                Scroll Down
            </button>
            </div>
        </section>

        <section
            ref={introSectionRef}
            className="
            bg-white text-gray-900
            flex justify-center
            px-4 sm:px-10 lg:px-16
            py-32 sm:py-40 snap-start
            "
        >
            <div className="w-full max-w-[1600px]">
                <p className="text-xs sm:text-sm font-semibold text-gray-400 mb-4">
                Our Products
            </p>
            <div className="mb-16 flex flex-col gap-2">
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-500 leading-snug">
                    We unlock the full potential of data<br />
                    and provide AI optimized for your business.
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-500 leading-snug">
                    정보의 잠재력을 드러내고
                    비즈니스에 최적화된 AI를
                    제공합니다.
                </p>
            </div>

            <div className="grid gap-16 md:grid-cols-2">
                <article className="fade-up border border-gray-300 rounded-2xl px-10 py-14 flex flex-col shadow-sm">
                <div className="mb-10">
                    <img
                    src={mainCeep1200}
                    srcSet={`${mainCeep1200} 1200w, ${mainCeep2000} 2000w`}
                    sizes="(max-width: 768px) 90vw, 1068px"
                    alt="Ceep"
                    loading="lazy"
                    />
                </div>

                <p className="text-xl leading-relaxed text-gray-700 mb-10">
                    흩어진 문서를 자동으로 분석해 명확한 구조로 정리해줍니다.
                    <br />
                    Ceep을 통해 복잡한 자료 관리 없이 필요한 순간 <br /> 즉시 활용할 수 있는
                    업무 환경을 경험해보세요.
                </p>

                <Link
                    to="/services"
                    className="
                    mt-auto inline-flex items-center justify-center
                    text-xl font-semibold text-gray-900
                    hover:opacity-70
                    "
                >
                    <span>Ceep 알아보기</span>
                    <span className="ml-2 text-2xl">→</span>
                </Link>
                </article>

                <article className="fade-up border border-gray-300 rounded-2xl px-10 py-14 flex flex-col shadow-sm">
                <div className="mb-10">
                    <img
                    src={mainCustom1200}
                    srcSet={`${mainCustom1200} 1200w, ${mainCustom2000} 2000w`}
                    sizes="(max-width: 768px) 90vw, 1068px"
                    alt="Custom AI"
                    loading="lazy"
                    />
                </div>

                <p className="text-xl leading-relaxed text-gray-700 mb-10">
                    기업의 문제를 분석해 목적에 맞는 AI 솔루션을 설계·구현합니다.
                    <br />
                    Custom AI를 통해 복잡한 업무를 자동화하고,<br /> 실제 현장에서 바로 적용
                    가능한 AI 경험을 만들어 보세요.
                </p>

                <Link
                    to="/custom-ai"
                    className="
                    mt-auto inline-flex items-center justify-center
                    text-xl font-semibold text-gray-900
                    hover:opacity-70
                    "
                >
                    <span>Custom AI 알아보기</span>
                    <span className="ml-2 text-2xl">→</span>
                </Link>
                </article>
            </div>
            </div>
        </section>

        <section
            className="
            bg-white text-gray-900
            flex justify-center
            px-4 sm:px-10 lg:px-16
            py-32 sm:py-40 snap-start
            "
        >
            <div className="w-full max-w-[1600px]">
            <p className="text-xs sm:text-sm font-semibold text-gray-400 mb-4">
                Our History
            </p>
            <p className="text-2xl font-bold sm:text-2xl lg:text-4xl mb-16 leading-snug">
                기업의 운영 방식과 미래 경쟁력을 <br/>재정의합니다.
            </p>

            <div className="md:hidden">
                <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory">
                {ARTICLES.map((a) => (
                    <article
                    key={a.id}
                    className="
                        fade-up
                        min-w-[78%] sm:min-w-[55%]
                        snap-start
                        border border-gray-200 rounded-2xl
                        p-5
                        bg-white
                        shadow-sm
                    "
                    >
                    <div className="w-full h-48 rounded-xl mb-5 overflow-hidden bg-gray-200">
                        <img
                        src={a.image}
                        alt="뉴스 썸네일"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        />
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold leading-snug mb-3">
                        {a.id === 5 ? `"${a.title}"` : a.title}
                    </h3>
                    <div className="mb-3 text-xs sm:text-sm text-gray-500 font-medium">
                        {a.sourceName}
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm sm:text-base text-primary">
                        {a.tags.map((t) => (
                        <span key={t}>{t}</span>
                        ))}
                    </div>
                    </article>
                ))}
                </div>
            </div>

            <div className="hidden md:grid gap-8 lg:gap-10 md:grid-cols-3">
                {ARTICLES.map((a) => (
                <article
                    key={a.id}
                    className="
                    fade-up
                    border border-gray-200 rounded-2xl
                    p-6
                    bg-white
                    shadow-sm
                    flex flex-col
                    "
                >
                    <div className="w-full h-56 rounded-xl mb-6 overflow-hidden bg-gray-200">
                    <img
                        src={a.image}
                        alt="뉴스 썸네일"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    </div>

                    <h3 className="text-lg lg:text-xl font-semibold leading-snug mb-4">
                    {a.id === 5 ? `"${a.title}"` : a.title}
                    </h3>
                    <div className="mb-4 text-sm text-gray-500 font-medium">
                        {a.sourceName}
                    </div>

                    <div className="mt-auto flex flex-wrap gap-2 text-base text-primary">
                    {a.tags.map((t) => (
                        <span key={t}>{t}</span>
                    ))}
                    </div>
                </article>
                ))}
            </div>
            </div>
        </section>

        <section
            ref={partnersSectionRef}
            className="
            bg-white text-gray-900
            snap-start
            w-full
            min-h-screen
            flex
            "
        >
            <div className="w-full grid grid-cols-1 lg:grid-cols-2">
            <div
                className="
                flex flex-col justify-center
                px-6 sm:px-12 lg:px-20
                py-16
                "
            >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
                    Trusted by many leading business
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                    {PARTNER_LOGOS.map((logo) => (
                        <div
                        key={logo.id}
                        className="
                            h-24 
                            flex items-center justify-center
                            px-4
                        "
                        >
                        <img
                            src={logo.src}
                            alt={logo.name}
                            loading="lazy"
                            decoding="async"
                            className="
                            max-h-full max-w-full
                            object-contain
                            opacity-90
                            "
                        />
                        </div>
                    ))}
                </div>
            </div>

            <div
                className="
                flex flex-col justify-center
                px-6 sm:px-12 lg:px-20
                py-16
                bg-gray-50
                "
            >
                <h3
                className="
                    font-bold text-gray-900 leading-snug
                    text-2xl sm:text-3xl md:text-4xl
                "
                >
                AI로 확장되는<br />새로운 비즈니스 기회
                </h3>

                <p
                className="
                    text-gray-600 font-semibold leading-relaxed mt-5
                    text-lg sm:text-xl md:text-2xl
                "
                >
                Amuse8와 함께 <br />
                미래의 서비스를 만들어보세요.
                </p>

                <Link
                to="/inquiry"
                className="
                    group
                    mt-6
                    inline-flex items-center
                    px-6 py-2.5
                    rounded-full
                    bg-primary text-white text-base
                    w-fit
                    transition-all duration-200
                    hover:bg-white hover:text-gray-900
                    hover:shadow-lg hover:-translate-y-0.5
                "
                >
                <span>Contact Us</span>
                <span
                    className="
                    ml-3
                    w-6 h-6
                    flex items-center justify-center
                    rounded-full
                    border border-current
                    text-xs leading-none
                    transition-all duration-200
                    group-hover:bg-gray-900
                    group-hover:text-white
                    "
                >
                    &gt;
                </span>
                </Link>
            </div>
            </div>
        </section>
        </div>
    );
};

export default HomePage;
