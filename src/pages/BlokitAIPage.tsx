import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useScrollAnimation from "../hooks/useScrollAnimation";
import PageTitle from "../components/PageTitle";
import dragVideo from "../assets/drag-video.mp4";
import heroVideo from "../assets/blokitai-video.mp4";
import timeImage from "../assets/blokitai-time-image.webp";
import productiveImage from "../assets/blokitai-productive-image.webp";
import moneyImage from "../assets/blokitai-money-image.webp";
import { Box } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Footer from "../components/Footer";
import { useSeo } from "../hooks/useSeo";
import { blokitContent, getLanguage } from "../localizedContent";

const renderLines = (text: string) => text.split("\n").map((line) => (
    <span key={line} className="block">{line}</span>
));

const BlokitAIPage = () => {
    const { i18n } = useTranslation();
    const content = blokitContent[getLanguage(i18n.language)];

    useSeo({
    title: "Blokit AI | AI Document Intelligence by Amuse8",
    description: content.seoDescription,
    canonicalPath: "/blokit-ai",
    });
    const scrollRootRef = useRef<HTMLDivElement | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);
    const nextSectionRef = useRef<HTMLDivElement | null>(null);

    const [isHeroVisible, setIsHeroVisible] = useState(true);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [autoplayFailed, setAutoPlayFailed] = useState(false);

    useEffect(() => {
        const root = scrollRootRef.current;
        const hero = heroRef.current;
        if (!root || !hero) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsHeroVisible(entry.isIntersecting);
            },
            {
                root,
                threshold: 0.3
            }
        );

        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        window.dispatchEvent(
            new CustomEvent("hero-visibility", { detail: isHeroVisible })
        );
    }, [isHeroVisible]);

    useEffect(() => {
        if (!videoRef.current) return;

        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                setAutoPlayFailed(true);
            });
        }
    }, []);

    const handleScrollDown = () => {
        nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div
            ref={scrollRootRef} 
            className="h-screen overflow-y-scroll snap-y snap-mandatory overscroll-contain">
            <PageTitle title="Blokit"/>
            <section
                ref={heroRef}
                className="relative min-h-screen
                    flex flex-col items-center justify-center
                    text-center text-white snap-start 
                "
            >
                <video
                    className="pointer-events-none absolute inset-0 w-full h-full object-cover"
                    src={heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="absolute inset-0 bg-black/40"/>
                <a className="absolute bottom-4 right-4 z-20 text-xs text-white/70"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://kr.freepik.com/free-video/%EC%B6%94%EC%83%81-%EA%B8%B0%EC%88%A0-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4_3730676#fromView=search&page=3&position=9&uuid=587e67d0-f154-463a-a3a6-da2bd462255f">Video: wirestock</a>
                <div className="relative z-10 flex flex-col items-center">
                    <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold mb-7">
	                        {content.heroTitle}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/80 mb-10 text-center">
	                        {content.heroSubtitle}
                    </p>
                    <p className="group inline-flex items-center text-white text-lg font-medium mb-12
                        px-4 py-2 rounded-full">
	                            <span className="mr-3">{content.heroCta}</span>
                            
                    </p>
                    <button
                        onClick={handleScrollDown}
                        className="
                            
                            text-white/80 text-base animate-bounce uppercase
                        "
                        >
	                        Scroll Down
                    </button>
                </div>
            </section>
            <section
                ref={nextSectionRef}
                className="
                    bg-white text-gray-900
                    flex justify-center
                    px-4 sm:px-10 lg:px-16
                    py-32 sm:py-40 snap-start"
            >
                <div className="w-full max-w-[1600px]">
                    <p className="text-center text-xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-snug">
	                        {renderLines(content.introTitle)}
                    </p>
                    <p className="text-center text-xs sm:text-sm lg:text-base font-medium mb-16 leading-snug">
	                        {content.introBody}
                    </p>
                    <div className="grid gap-8 md:gap-12 md:grid-cols-3 mt-16">
                        <article
                            ref={useScrollAnimation()}
                            className="fade-up bg-white rounded-2xl px-10 py-12 flex flex-col items-center text-center shadow-md"
                        >
	                            <p className="text-5xl font-bold text-blue-600 mb-4">{content.stats[0][0]}</p>
                            <p className="text-lg font-semibold text-gray-700">
	                                {content.stats[0][1]}
                            </p>
                        </article>
                        <article
                            ref={useScrollAnimation()}
                            className="fade-up bg-white rounded-2xl px-10 py-12 flex flex-col items-center text-center shadow-md"
                        >
	                            <p className="text-5xl font-bold text-blue-600 mb-4">{content.stats[1][0]}</p>
                            <p className="text-lg font-semibold text-gray-700">
	                                {content.stats[1][1]}
                            </p>
                        </article>
                        <article
                            ref={useScrollAnimation()}
                            className="fade-up bg-white rounded-2xl px-10 py-12 flex flex-col items-center text-center shadow-md"
                        >
	                            <p className="text-5xl font-bold text-blue-600 mb-4">{content.stats[2][0]}</p>
                            <p className="text-lg font-semibold text-gray-700">
	                                {content.stats[2][1]}
                            </p>
                        </article>
                    </div>
                </div>
            </section>
            <section
                className="
                    bg-white text-gray-900
                    flex justify-center
                    px-4 sm:px-10 lg:px-16
                    py-32 sm:py-40 snap-start"
            >
                    <div className="w-full max-w-[1600px]">
                        <div className="bg-blue-50 rounded-3xl py-10 px-6 mb-20 text-center">
                            <p className="text-2xl sm:text-4xl font-bold mb-6">
	                                {renderLines(content.enterpriseTitle)}
                            </p>
                            <p className="font-semibold text-base sm:text-xl text-gray-700 leading-relaxed">
	                                {content.enterpriseBody1}
                            </p>
                            <p className="font-semibold text-base sm:text-xl text-gray-700 leading-relaxed">
	                                {content.enterpriseBody2}
                            </p>
                        </div>
                        <p className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-16 leading-snug">
	                            {content.lossesTitle}
                        </p>
                        <div className="grid gap-12 lg:gap-16 md:grid-cols-3">
                            <article
                                ref={useScrollAnimation()}
                                className="fade-up flex flex-col items-center text-center"
                            >
                                <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden shadow-lg">
                                    <div className="absolute inset-0 bg-gray-200">
                                        <img
                                            src={timeImage}
	                                            alt={content.losses[0][0]}
                                            className="w-full h-full object-cover"
                                        />
                                        <a
                                            href="https://www.freepik.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                absolute bottom-2 right-2
                                                text-[11px] sm:text-xs
                                                text-white/70 hover:text-white
                                                px-2 py-0.5 rounded
                                                transition-colors
                                            "
                                        >
	                                            {content.source}
                                        </a>
                                    </div>

                                    <div className="absolute inset-0 bg-black/40" />

                                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
                                        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
	                                            {content.losses[0][0]}
                                        </h3>
	                                        <p className="text-white font-semibold">{content.losses[0][1]}</p>
                                    </div>
                                </div>
                            </article>
                            <article
                                ref={useScrollAnimation()}
                                className="fade-up flex flex-col items-center text-center"
                            >
                                <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden shadow-lg">
                                    <div className="absolute inset-0 bg-gray-200">
                                        <img
                                            src={productiveImage}
	                                            alt={content.losses[1][0]}
                                            className="w-full h-full object-cover"
                                        />
                                        <a
                                            href="https://www.freepik.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                absolute bottom-2 right-2
                                                text-[11px] sm:text-xs
                                                text-white/70 hover:text-white
                                                px-2 py-0.5 rounded
                                                transition-colors
                                            "
                                        >
	                                            {content.source}
                                        </a>
                                    </div>

                                    <div className="absolute inset-0 bg-black/40" />

                                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
                                        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
	                                            {content.losses[1][0]}
                                        </h3>
	                                        <p className="text-white font-semibold">{content.losses[1][1]}</p>
                                    </div>
                                </div>
                            </article>
                            <article
                                ref={useScrollAnimation()}
                                className="fade-up flex flex-col items-center text-center"
                            >
                                <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden shadow-lg">
                                    <div className="absolute inset-0 bg-gray-200">
                                        <img
                                            src={moneyImage}
	                                            alt={content.losses[2][0]}
                                            className="w-full h-full object-cover"
                                        />
                                        <a
                                            href="https://www.freepik.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                absolute bottom-2 right-2
                                                text-[11px] sm:text-xs
                                                text-white/70 hover:text-white
                                                px-2 py-0.5 rounded
                                                transition-colors
                                            "
                                        >
	                                            {content.source}
                                        </a>
                                    </div>

                                    <div className="absolute inset-0 bg-black/40" />

                                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
                                        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
	                                            {content.losses[2][0]}
                                        </h3>
	                                        <p className="text-white font-semibold">{content.losses[2][1]}</p>
                                    </div>
                                </div>
                            </article>
                            
                        </div>
                    </div>
            </section>
            <section
                className="
                    bg-white text-gray-900
                    snap-start
                    w-full
                    min-h-screen
                    flex
                "
            >
                <div className="w-full flex items-start justify-center px-4 sm:px-10 lg:px-16">
                    <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center 
                        pt-20 sm:pt-24 lg:pt-36
                        pb-20                    
                    ">
                        <p className="text-lg sm:text-xl font-semibold text-blue-600 mb-6">
	                            {content.smartLead}
                        </p>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-14 leading-snug">
	                            {renderLines(content.smartTitle).slice(0, 1)}
	                            <span className="text-blue-600">{content.smartTitle.split("\n")[1]}</span>
                        </h2>

                        <div className="space-y-6 sm:space-y-8 mb-20">
                            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
	                                {content.tags.slice(0, 5).map((tag, index) => (
	                                    <span key={tag} className={`tag-chip tag-float-${index + 1}`}>{tag}</span>
	                                ))}
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
	                                {content.tags.slice(5).map((tag, index) => (
	                                    <span key={tag} className={`tag-chip tag-float-${index + 6}`}>{tag}</span>
	                                ))}
                            </div>
                        </div>

                        <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 leading-relaxed">
	                            {renderLines(content.smartBody)}
                        </p>
                    </div>
                </div>
            </section>
            <section
                className="
                    bg-white text-gray-900
                    snap-start
                    w-full
                    min-h-screen
                    flex items-center      
                    justify-center
                    px-4 sm:px-10 lg:px-16
                    py-24 sm:py-32
                "
            >
                <div className="w-full max-w-6xl grid gap-10 lg:gap-16 lg:grid-cols-2 items-center">
                    <div className="flex justify-center">
                        <div className="w-full max-w-md">
                                <div
                                    className="
                                        mx-auto
                                        rounded-3xl
                                        bg-slate-900
                                        shadow-[0_18px_60px_rgba(15,23,42,0.55)]
                                        border border-slate-700
                                        px-4 pt-4 pb-6
                                    "
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-2 w-2 rounded-full bg-red-400" />
                                            <span className="h-2 w-2 rounded-full bg-yellow-400" />
                                            <span className="h-2 w-2 rounded-full bg-green-400" />
                                        </div>
                                        <div className="h-1.5 w-10 rounded-full bg-slate-700" />
                                    </div>

                                    <div className="relative w-full rounded-2xl bg-black overflow-hidden">
                                        <div className="relative w-full pt-[56.25%]">
                                            <video
                                                ref={videoRef}
                                                src={dragVideo}
                                                className="absolute inset-0 h-full w-full object-cover"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                controls={autoplayFailed}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-col items-center gap-1">
                                    <div className="h-1.5 w-10 rounded-full bg-slate-300" />
                                    <div className="h-2.5 w-28 rounded-full bg-slate-200 shadow-inner" />
                                </div>
                        </div>
                    </div>

                    <div
                        ref={useScrollAnimation()}
                        className="fade-up text-center lg:text-left"
                    >
                        <h2 className="text-3xl text-right sm:text-4xl md:text-5xl font-extrabold mb-6 leading-snug">
	                            {renderLines(content.dragTitle)}
                        </h2>
                        <p className="text-base font-semibold text-right sm:text-lg md:text-xl text-gray-600 leading-relaxed">
	                            {renderLines(content.dragBody)}
                        </p>
                    </div>
                </div>
            </section>
            <section
                className="
                    bg-slate-50 text-gray-900
                    snap-start
                    w-full
                    flex justify-center
                    px-4 sm:px-10 lg:px-16
                    py-24 sm:py-32
                "
            >
                <div className="w-full max-w-6xl">
                    <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold mb-12 sm:mb-16 leading-snug">
	                        {content.solutionTitle}
                    </h2>

                    <div className="grid gap-8 mb-20">
                        <article
                            ref={useScrollAnimation()}
                            className="
                                fade-up
                                bg-white rounded-3xl shadow-xl
                                px-10 sm:px-14 py-12 sm:py-16
                                flex items-start gap-8
                                max-w-4xl mx-auto
                                border border-gray-100
                            "
                        >
                            <div
                                className="
                                    flex items-center justify-center
                                    w-16 h-16 sm:w-20 sm:h-20
                                    rounded-3xl bg-blue-100
                                    text-blue-600
                                    shrink-0
                                "
                            >
                                <Box className="w-8 h-8 sm:w-10 sm:h-10" />
                            </div>

                            <div className="text-left flex-1">
                                <h3 className="text-2xl sm:text-3xl font-extrabold mb-6 text-gray-900">
                                    B2B
                                </h3>

                                <ul className="space-y-3 text-base font-semibold sm:text-lg text-gray-700 leading-relaxed">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
	                                        <span>{content.b2bItems[0]}</span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
	                                        <span>{content.b2bItems[1]}</span>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
	                                        <span>{content.b2bItems[2]}</span>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </div>

                    <div className="grid gap-6 lg:gap-10 lg:grid-cols-2">
                        <article
                            ref={useScrollAnimation()}
                            className="
                                fade-up
                                bg-white rounded-3xl shadow-md
                                px-6 sm:px-10 py-8 sm:py-10
                                flex flex-col justify-between
                            "
                        >
                            <p className="text-base sm:text-lg font-semibold text-gray-500 mb-6">
	                                {content.resultTitle}
                            </p>
                            <div className="flex items-center justify-between gap-6">
                                <div>
	                                    <p className="text-xs sm:text-sm text-gray-600 mb-1">{content.before}</p>
                                    <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">
	                                        {content.timeBefore}
                                    </p>
                                </div>
                                <span className="text-2xl sm:text-3xl text-gray-800">→</span>
                                <div className="text-right">
	                                    <p className="text-xs sm:text-sm text-black mb-1">{content.after}</p>
                                    <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">
	                                        {content.timeAfter}
                                    </p>
                                </div>
                            </div>
                        </article>

                        <article
                            ref={useScrollAnimation()}
                            className="
                                fade-up
                                bg-white rounded-3xl shadow-md
                                px-6 sm:px-10 py-8 sm:py-10
                                flex flex-col justify-between
                            "
                        >
                            <p className="text-base sm:text-lg font-semibold text-gray-500 mb-6">
	                                {content.laborTitle}
                            </p>
                            <div className="flex items-center justify-between gap-6">
                                <div>
	                                    <p className="text-xs sm:text-sm text-gray-600 mb-1">{content.before}</p>
                                    <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">
	                                        {content.teamBefore}
                                    </p>
                                </div>
                                <span className="text-2xl sm:text-3xl text-gray-800">→</span>
                                <div className="text-right">
	                                    <p className="text-xs sm:text-sm text-black mb-1">{content.after}</p>
                                    <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">
	                                        {content.teamAfter}
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <section
                className="
                    bg-white text-gray-900
                    snap-start
                    w-full
                    flex justify-center
                    px-4 sm:px-10 lg:px-16
                    py-14 sm:py-20
                "
            >
                <div className="w-full max-w-6xl">
                    <div
                    ref={useScrollAnimation()}
                    className="
                        fade-up
                        rounded-3xl
                        border border-gray-100
                        bg-gradient-to-br from-blue-50 via-white to-slate-50
                        shadow-md
                        px-6 sm:px-10 lg:px-14
                        py-10 sm:py-12
                        flex flex-col lg:flex-row
                        items-start lg:items-center
                        justify-between
                        gap-8
                    "
                    >
                    <div className="text-left">
                        <p className="text-sm sm:text-base font-semibold text-blue-600 mb-2">
	                        {content.inquiryLabel}
                        </p>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug">
	                        {content.inquiryTitle}
                        </h3>
                        <p className="mt-3 text-sm sm:text-base md:text-lg font-semibold text-gray-600 leading-relaxed">
	                        {content.inquiryBody}
                        </p>
                    </div>

                    <Link
                        to="/inquiry"
                        className="
                        group
                        inline-flex items-center justify-center
                        rounded-2xl
                        bg-blue-600 text-white
                        px-6 py-3 sm:px-7 sm:py-3.5
                        text-sm sm:text-base font-extrabold
                        shadow-lg shadow-blue-600/20
                        hover:bg-blue-500
                        transition-colors
                        w-full lg:w-auto
                        "
                    >
	                        {content.inquiryButton}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    </div>
                </div>
                </section>
            <section
                className="
                    bg-white text-gray-900
                    snap-start
                    w-full
                    flex justify-center
                    px-4 sm:px-10 lg:px-16
                    py-12 sm:py-16
                "
            >
                <div className="w-full max-w-4xl flex flex-col items-center text-center">
                    
                    <div className="mb-6 flex items-center justify-center">
                        <svg
                            viewBox="0 0 24 24"
                            className="w-20 h-20 sm:w-24 sm:h-24 text-blue-500"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 3L6 5V11C6 14.866 8.686 18.299 12 19C15.314 18.299 18 14.866 18 11V5L12 3Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <p className="text-base sm:text-xl md:text-2xl font-medium text-gray-900 mb-3 leading-snug">
	                        {content.dataTitle}
                    </p>

                    <p className="text-sm sm:text-base md:text-lg text-gray-900 leading-relaxed">
	                        {content.dataBody}
                    </p>
                </div>
            </section>
            <Footer/>
        </div>
    )
}
export default BlokitAIPage;
