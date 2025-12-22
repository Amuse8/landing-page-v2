import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CATEGORIES } from "../constants/customAiCategories";
import { CATEGORY_ICON_LIST } from "../constants/categoryIcons";
import { PROCESS_STEPS } from "../constants/processSteps";
import { PROCESS_ICON_LIST } from "../constants/processIcons";
import { FAQ_LIST } from "../constants/faqList";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import customAiVideo from "../assets/si-video.mp4";
import Footer from "../components/Footer";
import { REASONS } from "../constants/reasonItem";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useSeo } from "../hooks/useSeo";

const CustomAIPage = () => {
    useSeo({
    title: "Custom AI | Adaptive AI Solutions by Amuse8",
    description: "Amuse8은 기업의 목적과 환경에 맞춰 모델, 데이터, 시스템을 설계하고 실서비스에 적용 가능한 맞춤형 AI 솔루션을 제공합니다.",
    canonicalPath: "/custom-ai",
    });

    const navigate = useNavigate();
    const location = useLocation();

    const scrollRootRef = useRef<HTMLDivElement | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);
    const reasonsSectionRef = useRef<HTMLElement | null>(null);
    const categoriesSectionRef = useRef<HTMLDivElement | null>(null);
    const handleScrollToCategories = () => {
        categoriesSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const [isHeroVisible, setIsHeroVisible] = useState(true);

    const processSectionRef = useRef<HTMLElement | null>(null);
    const [processVisible, setProcessVisible] = useState(false);

    const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
    const [activeReasonId, setActiveReasonId] = useState<string | null>(null);

    const canHover = useMemo(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false;
    }, []);

    const goInquiry = () => {
        navigate("/inquiry", { state: { from: location.pathname } });
    };

    const handleScrollDown = () => {
        reasonsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleCategoryClick = (id: string) => {
        const target = sectionRefs.current[id];
        const root = scrollRootRef.current;
        if (!target || !root) return;

        if (window.innerWidth < 768) {
        const rootRect = root.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const headerEl = document.querySelector("header");
        const headerHeight = headerEl instanceof HTMLElement ? headerEl.offsetHeight : 0;

        const offsetFromRootTop = targetRect.top - rootRect.top;

        root.scrollTo({
            top: root.scrollTop + offsetFromRootTop - headerHeight - 16,
            behavior: "smooth",
        });
        } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const activeCategoryRef = useRef(activeCategory);
    useEffect(() => {
        activeCategoryRef.current = activeCategory;
    }, [activeCategory]);

    const activeCategoryRafRef = useRef<number | null>(null);

    useEffect(() => {
        const root = scrollRootRef.current;
        const hero = heroRef.current;
        if (!root || !hero) return;

        const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            setIsHeroVisible(entry.isIntersecting);
        },
        { root, threshold: 0.3 }
        );

        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent("hero-visibility", { detail: isHeroVisible }));
    }, [isHeroVisible]);

    useEffect(() => {
        const root = scrollRootRef.current;
        if (!root) return;

        const observer = new IntersectionObserver(
        (entries) => {
            if (activeCategoryRafRef.current) return;
            activeCategoryRafRef.current = requestAnimationFrame(() => {
            activeCategoryRafRef.current = null;

            const visible = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

            if (!visible) return;

            const id = visible.target.getAttribute("data-category-id");
            if (!id) return;

            if (activeCategoryRef.current !== id) {
                setActiveCategory(id);
            }
            });
        },
        {
            root,
            threshold: 0.3,
            rootMargin: "-96px 0px 0px 0px",
        }
        );

        Object.values(sectionRefs.current).forEach((el) => {
        if (el) observer.observe(el);
        });

        return () => {
        observer.disconnect();
        if (activeCategoryRafRef.current) cancelAnimationFrame(activeCategoryRafRef.current);
        };
    }, []);

    useEffect(() => {
        const root = scrollRootRef.current;
        if (!root) return;

        let ticking = false;

        const onScroll = () => {
        if (ticking) return;
        ticking = true;

            requestAnimationFrame(() => {
                ticking = false;
                const next = root.scrollTop > 300;
                setShowScrollTop((prev) => (prev === next ? prev : next));
            });
        };

        root.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => root.removeEventListener("scroll", onScroll);
    }, []);

    const handleScrollToTop = () => {
        reasonsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        const root = scrollRootRef.current;
        const target = processSectionRef.current;
        if (!root || !target) return;

        const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            setProcessVisible(entry.isIntersecting);
        },
        {
            root,
            threshold: 0.2,
            rootMargin: "-10% 0px -10% 0px",
        }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    const openFaq = (id: string) => setActiveFaqId(id);
    const closeFaq = (id: string) => {
        setActiveFaqId((prev) => (prev === id ? null : prev));
    };

    const toggleFaq = (id: string) => {
        setActiveFaqId((prev) => (prev === id ? null : id));
    };

    const toggleReason = (id: string) => {
        if (canHover) return;
        setActiveReasonId((prev) => (prev === id ? null : id));
    };

    return (
        <div
        ref={scrollRootRef}
        className="h-screen overflow-y-scroll overflow-x-hidden overscroll-contain snap-y snap-proximity"
        >
        <section
            ref={heroRef}
            className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-center text-white snap-start"
        >
            <video
            className="absolute inset-0 w-full h-full object-cover"
            src={customAiVideo}
            autoPlay
            muted
            loop
            playsInline
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-4 right-4 text-xs sm:text-sm text-white/70 z-10">
            <a
                href="https://kr.freepik.com/free-video/%ED%8F%89%ED%8F%89%ED%95%9C-%EB%94%94%EC%9E%90%EC%9D%B8%EC%9D%98-%EA%B8%B0%EC%96%B4%EB%A5%BC-%EA%B0%80%EC%A7%84-%EB%85%B8%EB%9E%80%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%9D%98-%EB%AA%A8%EC%85%98-%EA%B7%B8%EB%9E%98%ED%94%BD_3295223#fromView=search&page=1&position=18&uuid=d8acd457-c461-422e-91d1-6ae79b434123"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
            >
                Video: freepik
            </a>
            </div>

            <div className="relative z-10 flex flex-col items-center">
            <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold mb-14">
                필요한 AI가 있으신가요?
            </h1>
            <p className="group inline-flex items-center text-white text-lg font-medium mb-12 px-4 py-2 rounded-full">
                <span className="mr-3">원하시는 기능만큼, 원하는 형태로 제작해 드립니다.</span>
            </p>
            <button onClick={handleScrollDown} className="text-white/80 text-base animate-bounce uppercase">
                Scroll Down
            </button>
            </div>
        </section>
        <section
            ref={reasonsSectionRef}
            className="relative snap-start overflow-hidden bg-white text-gray-900"
        >
            <div className="relative flex justify-center px-4 sm:px-10 lg:px-16 py-24 sm:py-32">
                <div className="w-full max-w-6xl">
                    <div className="flex flex-col items-center text-center gap-6">
                        <div className="space-y-3">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                                Custom AI가 필요한 이유는 분명합니다
                            </h2>
                            
                        </div>
                    </div>
                    <div className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {REASONS.map((item) => {
                            const isActiveMobile = !canHover && activeReasonId === item.id;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => toggleReason(item.id)}
                                    className={[
                                        "group relative rounded-3xl border border-gray-200 bg-white shadow-sm",
                                        "px-5 py-6 sm:px-6 sm:py-7",
                                        "transition-all duration-200 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5",
                                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3762E3]/40",
                                        "text-center flex flex-col items-center",
                                        !canHover ? "cursor-pointer" : "cursor-default",
                                    ].join(" ")}
                                    aria-pressed={!canHover ? isActiveMobile : undefined}
                                    >

                                    <div className="relative w-full min-h-[92px] flex items-center justify-center">
                                        <div
                                        className={[
                                            "absolute inset-0 transition-all duration-200",
                                            "flex items-center justify-center",
                                            canHover
                                            ? "opacity-100 translate-y-0 group-hover:opacity-0 group-hover:-translate-y-1"
                                            : isActiveMobile
                                            ? "opacity-0 -translate-y-1 pointer-events-none"
                                            : "opacity-100 translate-y-0",
                                        ].join(" ")}
                                        >
                                        <div className="flex flex-col items-center">
                                            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200">
                                                <AlertTriangle className="w-3.5 h-3.5 text-gray-500" />
                                                문제 상황
                                            </span>

                                            <div className="text-base sm:text-lg font-semibold leading-snug text-gray-900 whitespace-pre-line">
                                            {item.problem}
                                            </div>
                                        </div>
                                    </div>

                                        <div
                                        className={[
                                            "absolute inset-0 transition-all duration-200",
                                            "flex items-center justify-center",
                                            canHover
                                            ? "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                                            : isActiveMobile
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-1 pointer-events-none",
                                        ].join(" ")}
                                        >
                                        <div className="flex flex-col items-center">
                                            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#3762E3] px-2.5 py-1 rounded-full bg-[#3762E3]/10 border border-[#3762E3]/20">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#3762E3]" />
                                                해결 방안
                                            </span>

                                            <div className="text-base sm:text-lg font-bold leading-snug text-gray-900 whitespace-pre-line">
                                                {item.solution}
                                            </div>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-4  border-gray-100 w-full flex justify-center">
                                        <span
                                        className={[
                                            "inline-flex items-center gap-2",
                                            "text-xs sm:text-sm text-gray-500",
                                            "px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200",
                                            "transition-colors duration-200",
                                            canHover ? "group-hover:opacity-0 group-hover:translate-y-1" : "",
                                            !canHover && isActiveMobile ? "opacity-0 translate-y-1 pointer-events-none" : "",
                                        ].join(" ")}
                                        >
                                        {canHover ? "마우스를 올려보세요" : "탭해서 내용을 확인해보세요"}
                                        </span>
                                    </div>
                                    </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
        <section className="relative snap-start overflow-hidden bg-[#F6F7FB] text-gray-900">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full bg-[#3762E3]/15 blur-3xl" />
                <div className="absolute -bottom-32 -right-32 h-[460px] w-[460px] rounded-full bg-indigo-400/15 blur-3xl" />

                <div className="absolute inset-0 opacity-[0.55]">
                <div
                    className="absolute inset-0"
                    style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(55,98,227,0.18) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/60" />
                </div>
            </div>

            <div className="relative flex justify-center px-4 sm:px-10 lg:px-16 py-28 sm:py-36">
                <div className="w-full max-w-6xl">
                <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/70 backdrop-blur shadow-sm px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
                    <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-16 -right-14 h-56 w-56 rounded-full bg-[#3762E3]/10 blur-2xl" />
                    <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-blue-400/10 blur-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/70" />
                    </div>

                    <div className="relative">
                    <div className="flex justify-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#3762E3]/20 bg-[#3762E3]/10 px-3 py-1 text-xs sm:text-sm font-semibold text-[#3762E3]">
                        Custom AI by Amuse8
                        </span>
                    </div>

                    <p className="mt-6 text-center text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-gray-900">
                        Amuse8은
                        <br />
                        상황에 맞는 AI를 설계합니다
                    </p>

                    <p className="mt-5 text-center text-sm sm:text-base md:text-lg leading-relaxed text-gray-600">
                        특정 모델/기능에 갇히지 않고,
                        <br className="hidden sm:block" />
                        목표·데이터·예산·일정에 맞춰 가장 적합한 조합으로 구현합니다.
                    </p>

                    <div className="mt-10 grid gap-3 sm:gap-4 sm:grid-cols-3">
                        {[
                        ["목표 중심 설계", "필요한 성과부터 정의합니다."],
                        ["빠른 PoC", "검증 후 확장으로 리스크를 줄입니다."],
                        ["운영까지 고려", "배포·모니터링·개선까지 연결합니다."],
                        ].map(([title, desc]) => (
                        <div
                            key={title}
                            className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur px-5 py-4 shadow-sm"
                        >
                            <div className="text-sm sm:text-base font-semibold text-gray-900">
                            {title}
                            </div>
                            <div className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {desc}
                            </div>
                        </div>
                        ))}
                    </div>

                    <div className="mt-12 flex justify-center">
                        <button
                        type="button"
                        onClick={handleScrollToCategories}
                        className={[
                            "group inline-flex items-center gap-2 rounded-full",
                            "border border-gray-200 bg-white/70 backdrop-blur",
                            "px-5 py-2.5 text-sm sm:text-base font-semibold text-gray-700",
                            "shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3762E3]/40",
                        ].join(" ")}
                        >
                        <span className="text-gray-700">Scroll Down</span>
                        <span className="animate-bounce text-[#3762E3]">↓</span>
                        </button>
                    </div>
                    </div>
                </div>

                <div className="mt-10 flex justify-center">
                    <div className="h-px w-40 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>
                </div>
            </div>
            </section>


        <section
            ref={categoriesSectionRef}
            className="bg-white text-gray-900 flex justify-center px-4 sm:px-10 lg:px-16 py-32 sm:py-40 snap-start"
        >
            <div className="w-full max-w-6xl">
            <div className="pb-4 mb-10 md:sticky md:top-0 md:z-10 md:bg-white/90 md:backdrop-blur">
                <div className="flex flex-wrap justify-center text-center gap-3">
                {CATEGORIES.map((cat) => {
                    const isActive = cat.id === activeCategory;
                    return (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-base sm:text-lg transition-colors ${
                        isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        {cat.label}
                    </button>
                    );
                })}
                </div>
            </div>

            <div className="space-y-16">
                {CATEGORIES.map((cat) => (
                <div
                    key={cat.id}
                    ref={(el) => {
                    sectionRefs.current[cat.id] = el;
                    }}
                    data-category-id={cat.id}
                    className="min-h-[60vh] flex flex-col justify-center gap-8 border-b border-gray-200 last:border-b-0 pb-12"
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold">{cat.label}</h2>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {cat.examples.map((ex, idx) => {
                        const icons = CATEGORY_ICON_LIST[cat.id] ?? [];
                        const iconSrc = icons.length ? icons[idx % icons.length] : null;

                        return (
                        <div
                            key={ex.title}
                            className="rounded-2xl border border-gray-200 px-6 py-8 shadow-sm bg-white"
                        >
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            {iconSrc ? (
                                <img
                                src={iconSrc}
                                alt={`${cat.label} 아이콘`}
                                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                                loading="lazy"
                                decoding="async"
                                />
                            ) : (
                                <span className="text-gray-400 text-xl">★</span>
                            )}
                            </div>

                            <h3 className="text-lg font-semibold mb-2">{ex.title}</h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            {ex.description}
                            </p>
                        </div>
                        );
                    })}
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {showScrollTop && (
            <button
            onClick={handleScrollToTop}
            className="fixed right-5 bottom-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-primary text-white shadow-lg shadow-black/20 text-lg"
            >
            ↑
            </button>
        )}

        <section
            ref={processSectionRef}
            className="relative snap-start overflow-hidden bg-[#EEF3FF] text-gray-900"
        >
            <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-indigo-400/15 blur-3xl" />
            </div>

            <div className="relative flex justify-center px-4 sm:px-10 lg:px-16 py-24 sm:py-32">
            <div className="w-full max-w-6xl">
                <div
                className={[
                    "mb-10 sm:mb-12 transition-all duration-700 ease-out",
                    processVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                ].join(" ")}
                >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
                    프로세스는
                    <br />
                    이렇게 진행됩니다
                </h2>
                </div>

                <div className="grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-4">
                {PROCESS_STEPS.map((step, idx) => {
                    const iconSrc = PROCESS_ICON_LIST[step.id] ?? null;

                    return (
                    <div
                        key={step.id}
                        style={{ transitionDelay: processVisible ? `${idx * 80}ms` : "0ms" }}
                        className={[
                        "rounded-3xl bg-white/60 backdrop-blur border border-white/70 shadow-sm px-6 py-7 min-h-[190px] flex flex-col",
                        "transition-all duration-700 ease-out",
                        processVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                        ].join(" ")}
                    >
                        <div className="mb-5">
                        <div className="w-14 h-14 rounded-2xl bg-white/70 border border-white shadow-sm flex items-center justify-center">
                            {iconSrc ? (
                            <img
                                src={iconSrc}
                                alt={`${step.id} 단계 아이콘`}
                                className="w-8 h-8 object-contain"
                                loading="lazy"
                                decoding="async"
                            />
                            ) : (
                            <div className="w-8 h-8 rounded-xl bg-blue-200/60 border border-blue-200/60" />
                            )}
                        </div>
                        </div>

                        <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-lg font-semibold text-[#3762E3] leading-none">{step.id}</span>
                        <h3 className="text-xl font-bold leading-none">{step.title}</h3>
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.desc}</p>
                    </div>
                    );
                })}
                </div>
            </div>
            </div>
        </section>

        <section className="relative snap-start overflow-hidden bg-gradient-to-b from-[#22315B] to-[#121B36] text-white">
            <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            </div>

            <div className="relative flex justify-center px-4 sm:px-10 lg:px-16 py-24 sm:py-32">
            <div className="w-full max-w-6xl">
                <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12">
                FAQ
                </h2>

                <div className="space-y-5">
                {FAQ_LIST.map((item) => {
                    const isOpen = activeFaqId === item.id;

                    return (
                    <div
                        key={item.id}
                        className="outline-none"
                        onMouseEnter={canHover ? () => openFaq(item.id) : undefined}
                        onMouseLeave={canHover ? () => closeFaq(item.id) : undefined}
                    >
                        <button
                        type="button"
                        className="w-full text-left"
                        onClick={() => toggleFaq(item.id)}
                        aria-expanded={isOpen}
                        >
                        <div
                            className={[
                            "rounded-2xl border transition-all duration-200",
                            isOpen
                                ? "bg-white border-white shadow-xl shadow-black/10"
                                : "bg-white/10 border-white/10 hover:bg-white hover:border-white hover:shadow-xl hover:shadow-black/10",
                            ].join(" ")}
                        >
                            {!isOpen && (
                            <div className="px-6 sm:px-8 py-6 sm:py-7 flex items-center gap-4">
                                <span className="font-bold text-lg sm:text-xl text-white">Q.</span>
                                <h3 className="font-semibold text-lg sm:text-xl leading-snug text-white">
                                {item.q}
                                </h3>
                            </div>
                            )}

                            {isOpen && (
                            <div className="px-6 sm:px-8 py-7 sm:py-8 grid gap-8 md:gap-10 md:grid-cols-[minmax(260px,420px)_1fr] items-start">
                                <div className="flex items-start gap-4">
                                <span className="shrink-0 font-bold text-xl sm:text-2xl text-[#2F54C8]">
                                    Q.
                                </span>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-xl sm:text-2xl leading-snug text-gray-900">
                                    {item.q}
                                    </h3>
                                </div>
                                </div>

                                <div className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                    p: ({ children }) => <p className="mb-0 last:mb-0">{children}</p>,
                                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                    ul: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                                    ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1">{children}</ol>,
                                    li: ({ children }) => <li>{children}</li>,
                                    a: ({ children, ...props }) => (
                                        <a
                                        {...props}
                                        className="text-[#2F54C8] underline"
                                        target="_blank"
                                        rel="noreferrer"
                                        >
                                        {children}
                                        </a>
                                    ),
                                    }}
                                >
                                    {item.a}
                                </ReactMarkdown>
                                </div>
                            </div>
                            )}
                        </div>
                        </button>
                    </div>
                    );
                })}
                </div>
            </div>
            </div>
        </section>

        <section className="bg-white text-gray-900 flex justify-center px-4 sm:px-10 lg:px-16 py-24 sm:py-32 snap-start">
            <div className="w-full max-w-6xl">
            <div className="rounded-3xl px-6 sm:px-10 lg:px-16 py-14 sm:py-18 lg:py-20 shadow-sm bg-[#F3F6FF] border border-[#E0E7FF]">
                <div className="flex flex-col gap-10 sm:gap-12 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-6 max-w-3xl text-left">
                    <p className="text-sm sm:text-base tracking-wide text-[#3762E3] font-semibold">
                    상담이 필요하신가요?
                    </p>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug text-gray-900">
                    어떤 AI가 필요한지 모르셔도
                    <br className="sm:block" />
                    괜찮습니다
                    </h2>

                    <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                    비즈니스 상황에 가장 적합한 AI 활용 방법을
                    <br className="md:block" />
                    명확하게 안내해드립니다.
                    </p>
                </div>

                <div className="flex lg:flex-col items-start lg:items-end gap-4">
                    <button
                    type="button"
                    onClick={goInquiry}
                    className="inline-flex items-center text-base sm:text-lg font-medium text-white bg-[#3762E3] px-6 py-2.5 rounded-full shadow-md shadow-blue-200 hover:bg-[#2F54C8] transition"
                    >
                    문의하기
                    <span className="ml-2 text-sm">↗</span>
                    </button>
                </div>
                </div>
            </div>
            </div>
        </section>

        <section className="snap-start bg-white">
            <Footer />
        </section>
        </div>
    );
};

export default CustomAIPage;
