import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

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
import mainArticle11 from "@/assets/main-article-11.webp";
import mainArticle12 from "@/assets/main-article-12.webp";
import mainArticle13 from "@/assets/main-article-13.webp";
import mainArticle14 from "@/assets/main-article-14.webp";
import mainArticle15 from "@/assets/main-article-15.webp";
import mainArticle16 from "@/assets/main-article-16.webp";

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
import mainBlokit1200 from "@/assets/main-blokit-1200.webp";
import mainBlokit2000 from "@/assets/main-blokit-2000.webp";
import mainFirstImage from "@/assets/main-first-image-2000.webp";
import Footer from "../components/Footer";
import { useSeo } from "../hooks/useSeo";

type ArticleTranslation = {
    title: string;
    tags: string[];
    sourceName: string;
};

const ARTICLE_IMAGES = [
    mainArticle1,
    mainArticle2,
    mainArticle3,
    mainArticle4,
    mainArticle5,
    mainArticle6,
    mainArticle7,
    mainArticle8,
    mainArticle9,
    mainArticle10,
    mainArticle11,
    mainArticle12,
    mainArticle13,
    mainArticle14,
    mainArticle15,
    mainArticle16,
];

const HomePage = () => {
    const { t } = useTranslation();

    useSeo({
    title: "Amuse8 | Finding Muse In AI",
    description: t("home.seoDescription"),
    canonicalPath: "/",
    jsonLd: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Amuse8",
        url: "https://amuse8.kr",
        },
    });
    const scrollRootRef = useRef<HTMLDivElement | null>(null);

    const heroRef = useRef<HTMLDivElement | null>(null);

    const introSectionRef = useRef<HTMLElement | null>(null);
    const partnersSectionRef = useRef<HTMLElement | null>(null);

    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const [showAmuseTitle, setShowAmuseTitle] = useState(true);

    const ARTICLES = useMemo(
        () => (t("home.articles", { returnObjects: true }) as ArticleTranslation[]).map((article, index) => ({
            id: index + 1,
            ...article,
            image: ARTICLE_IMAGES[index],
        })),
        [t]
    );

    const productIntroLines = t("home.products.intro", { returnObjects: true }) as string[];
    const productIntroKoLines = t("home.products.introKo", { returnObjects: true }) as string[];
    const blokitDescriptionLines = t("home.products.blokitDescription", { returnObjects: true }) as string[];
    const customDescriptionLines = t("home.products.customDescription", { returnObjects: true }) as string[];
    const historyHeadlineLines = t("home.history.headline", { returnObjects: true }) as string[];

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
        const hero = heroRef.current;
        if (!hero) return;

        const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
            setIsHeroVisible(entry.isIntersecting);
            }
        },
        { threshold: 0.6 }
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
        const rootEl = scrollRootRef.current;
        if (!rootEl) return;

        const targets = Array.from(rootEl.querySelectorAll<HTMLElement>(".fade-up"));
        if (targets.length === 0) return;

        const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("show");
            });
        },
        {
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
            id="home-scroll-root"
            ref={scrollRootRef} 
            className="home-page snap-y snap-mandatory">
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
                {t("home.hero.tagline")}
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
                {t("home.hero.visionCta")}
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
                {t("common.scrollDown")}
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
                {t("home.products.label")}
            </p>
            <div className="mb-16 flex flex-col gap-2">
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-500 leading-snug">
                    {productIntroLines.map((line) => (
                        <span key={line}>{line}<br /></span>
                    ))}
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-500 leading-snug">
                    {productIntroKoLines.map((line) => (
                        <span key={line}>{line}<br /></span>
                    ))}
                </p>
            </div>

            <div className="grid gap-16 md:grid-cols-2">
                <article className="border border-gray-300 rounded-2xl px-10 py-14 flex flex-col shadow-sm">
                <div className="mb-10 overflow-hidden aspect-[16/9] [transform:translateZ(0)]">
                    <picture>
                        <source media="(max-width: 768px)" srcSet={mainBlokit1200}/>
                        <img
                            src={mainBlokit1200}
                            srcSet={`${mainBlokit1200} 1200w, ${mainBlokit2000} 2000w`}
                            sizes="1068px"
                            alt="Blokit"
                            loading="eager"
                            decoding="async"
                            className="block h-full w-full object-cover [backface-visibility:hidden] [transform:translateZ(0)]"
                            draggable={false}
                        />
                    </picture>
                </div>

                <div className="fade-up flex flex-col flex-1">
                    <p className="text-xl leading-relaxed text-gray-700 mb-10">
                    {blokitDescriptionLines.map((line) => (
                        <span key={line}>{line}<br /></span>
                    ))}
                    </p>

                    <Link
                        to="/blokit-ai"
                        className="
                        mt-auto inline-flex items-center justify-center
                        text-xl font-semibold text-gray-900
                        hover:opacity-70
                        "
                    >
                        <span>{t("home.products.blokitCta")}</span>
                        <span className="ml-2 text-2xl">→</span>
                    </Link>
                </div>
                </article>

                <article className="border border-gray-300 rounded-2xl px-10 py-14 flex flex-col shadow-sm">
                <div className="mb-10 overflow-hidden aspect-[16/9] [transform:translateZ(0)]">
                    <picture>
                        <source media="(max-width: 768px)" srcSet={mainCustom1200}/>
                        <img
                            src={mainCustom1200}
                            srcSet={`${mainCustom1200} 1200w, ${mainCustom2000} 2000w`}
                            sizes="1068px"
                            alt="Custom"
                            loading="eager"
                            decoding="async"
                            className="block h-full w-full object-cover [backface-visibility:hidden] [transform:translateZ(0)]"
                            draggable={false}
                        />
                    </picture>
                </div>

                <div className="fade-up flex flex-col flex-1">
                    <p className="text-xl leading-relaxed text-gray-700 mb-10">
                    {customDescriptionLines.map((line) => (
                        <span key={line}>{line}<br /></span>
                    ))}
                    </p>
                    <Link
                        to="/custom-ai"
                        className="
                        mt-auto inline-flex items-center justify-center
                        text-xl font-semibold text-gray-900
                        hover:opacity-70
                        "
                    >
                        <span>{t("home.products.customCta")}</span>
                        <span className="ml-2 text-2xl">→</span>
                    </Link>
                </div>
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
                    {t("home.history.label")}
                </p>
                <div className="mb-16 flex flex-col gap-2">
                    <p className="text-sm sm:text-base lg:text-lg font-semibold text-black leading-snug">
                        {historyHeadlineLines.map((line) => (
                            <span key={line}>{line}<br /></span>
                        ))}
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-500 leading-snug">
                        {t("home.history.subline")}
                    </p>
                </div>
                

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
                        alt={t("common.newsThumbnail")}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        />
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold leading-snug mb-3">
                        {a.title}
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
                            alt={t("common.newsThumbnail")}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        </div>

                        <h3 className="text-lg lg:text-xl font-semibold leading-snug mb-4">
                        {a.title}
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
                flex flex-col justify-start
                px-6 sm:px-12 lg:px-20
                py-16
                "
            >
                <div className="mb-16 flex flex-col gap-2">
                    <p className="text-sm sm:text-base lg:text-lg font-semibold text-black leading-snug">
                        {t("home.partners.trusted")}
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-500 leading-snug">
                        {t("home.partners.trustedKo")}
                    </p>
                </div>

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
                flex flex-col justify-start
                px-6 sm:px-12 lg:px-20
                py-16
                bg-gray-50
                "
            >
                <h1 className="text-3xl sm:text-2xl font-semibold text-gray-400 mb-4">
                    {t("home.partners.shaping")}
                </h1>
                <div className="mb-16 flex flex-col gap-2">

                <p className="text-sm sm:text-base lg:text-lg font-semibold text-black leading-snug">
                    {t("home.partners.opportunity")}
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-500 leading-snug">
                    {t("home.partners.opportunityKo")}
                </p>
                </div>

            <div className="mb-16 flex flex-col gap-2">
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-black leading-snug">
                    {t("home.partners.create")}
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-500 leading-snug">
                    {t("home.partners.createKo")}
                </p>
            </div>
            <Link
            to="/inquiry"
            className="
                group relative overflow-hidden
                mt-8 inline-flex items-center
                px-8 py-3.5 rounded-full
                bg-primary text-white text-lg font-medium w-fit
                transition-all duration-300 ease-out
                hover:bg-white hover:text-gray-900 hover:shadow-lg hover:-translate-y-1
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30
                motion-reduce:transition-none motion-reduce:hover:transform-none
            "
            >
            {/* shine */}
            <span
                aria-hidden="true"
                className="
                pointer-events-none absolute inset-0
                translate-x-[-120%]
                bg-gradient-to-r from-transparent via-white/30 to-transparent
                transition-transform duration-700 ease-out
                group-hover:translate-x-[120%]
                motion-reduce:hidden
                "
            />

            <span className="relative z-10">{t("common.contactUs")}</span>

            <span
                className="
                relative z-10 ml-4
                w-7 h-7 flex items-center justify-center
                rounded-full border border-current
                text-sm leading-none
                transition-all duration-300 ease-out
                group-hover:bg-gray-900 group-hover:text-white group-hover:scale-105
                "
            >
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                &gt;
                </span>
            </span>
            </Link>
            </div>
            </div>
        </section>
        <div className="bg-white h-16 sm:h-24" />
        <Footer/>
        </div>
    );
};

export default HomePage;
