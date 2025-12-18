import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CATEGORIES } from "../constants/customAiCategories";
import { CATEGORY_ICON_LIST } from "../constants/categoryIcons";
import { PROCESS_STEPS } from "../constants/processSteps";
import { PROCESS_ICON_LIST } from "../constants/processIcons";
import customAiVideo from "../assets/si-video.mp4";

const CustomAIPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollRootRef = useRef<HTMLDivElement | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);
    const nextSectionRef = useRef<HTMLDivElement | null>(null);

    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const [isHeroVisible, setIsHeroVisible] = useState(true);

    const processSectionRef = useRef<HTMLElement | null>(null);
    const [processVisible, setProcessVisible] = useState(false);

    const goInquiry = () => {
        navigate("/inquiry", { state: { from: location.pathname }});
    };
    
    const handleScrollDown = () => {
        nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
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
                threshold: 0.3,
            }
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
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

                if (visible) {
                    const id = visible.target.getAttribute("data-category-id");
                    if (id) {
                        setActiveCategory(id);
                    }
                }
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

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const root = scrollRootRef.current;
        if (!root) return;

        const handleScroll = () => {
            setShowScrollTop(root.scrollTop > 300);
        };

        root.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => {
            root.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        if (nextSectionRef.current) {
            nextSectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    useEffect(() => {
        const root = scrollRootRef.current;
        const target = processSectionRef.current;
        if (!root || !target) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (entry.isIntersecting) {
                    setProcessVisible(true);
                } else {
                    setProcessVisible(false);
                }
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

    return (
        <div
            ref={scrollRootRef}
            className="h-screen overflow-y-scroll overflow-x-hidden overscroll-contain snap-y snap-mandatory"
        >
            <section
                ref={heroRef}
                className="relative min-h-screen overflow-hidden
                flex flex-col items-center justify-center text-center text-white snap-start">
                <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src={customAiVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                <div
                    className="
                        absolute bottom-4 right-4
                        text-xs sm:text-sm
                        text-white/70
                        z-10
                    "
                >
                    <a
                        href="https://kr.freepik.com/free-video/%ED%8F%89%ED%8F%89%ED%95%9C-%EB%94%94%EC%9E%90%EC%9D%B8%EC%9D%98-%EA%B8%B0%EC%96%B4%EB%A5%BC-%EA%B0%80%EC%A7%84-%EB%85%B8%EB%9E%80%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%9D%98-%EB%AA%A8%EC%85%98-%EA%B7%B8%EB%9E%98%ED%94%BD_3295223#fromView=search&page=1&position=18&uuid=d8acd457-c461-422e-91d1-6ae79b434123"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white transition-colors"
                    >
                        Video: freepik
                    </a>
                </div>
                <div className="absolute inset-0 bg-black/40"/>
                <div className="relative z-10 flex flex-col items-center">
                    <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold mb-14">
                        필요한 AI가 있으신가요?
                    </h1>
                    <p className="group inline-flex items-center text-white text-lg font-medium mb-12
                        px-4 py-2 rounded-full">
                            <span className="mr-3">원하시는 기능만큼, 원하는 형태로 제작해 드립니다.</span>
                    </p>
                    <button
                        onClick={handleScrollDown}
                        className="text-white/80 text-base animate-bounce uppercase"
                    >
                        Scroll Down
                    </button>
                </div>
            </section>

            <section
                ref={nextSectionRef}
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
                                        className={`px-3 py-1.5 rounded-full text-base sm:text-lg transition-colors
                                            ${
                                                isActive
                                                    ? "bg-primary text-white"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                                <h2 className="text-2xl sm:text-3xl font-semibold">
                                    {cat.label}
                                </h2>
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
                    className="
                        fixed right-5 bottom-6 z-50
                        flex items-center justify-center
                        w-11 h-11 rounded-full
                        bg-primary text-white
                        shadow-lg shadow-black/20
                        text-lg
                    "
                >
                    ↑
                </button>
            )}
            <section ref={processSectionRef} className="relative snap-start overflow-hidden bg-[#EEF3FF] text-gray-900">
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
                            이렇게 진행됩니다.
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
            <section className="bg-white text-gray-900 flex justify-center px-4 sm:px-10 lg:px-16 py-24 sm:py-32 snap-start">
                <div className="w-full max-w-6xl">
                    <div
                        className="
                            rounded-3xl 
                            px-6 sm:px-10 lg:px-16 
                            py-14 sm:py-18 lg:py-20 
                            shadow-sm
                            bg-[#F3F6FF]          /* Primary(#3762E3)의 라이트 톤 */
                            border border-[#E0E7FF]
                        "
                    >
                        <div className="flex flex-col gap-10 sm:gap-12 lg:flex-row lg:items-end lg:justify-between">
                            
                            <div className="space-y-6 max-w-3xl text-left">
                                <p className="text-sm sm:text-base tracking-wide text-[#3762E3] font-semibold">
                                    상담이 필요하신가요?
                                </p>

                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug text-gray-900">
                                    어떤 AI가 필요한지 모르셔도
                                    <br className="sm:block" />
                                    괜찮습니다.
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
                                    className="
                                        inline-flex items-center
                                        text-base sm:text-lg
                                        font-medium
                                        text-white
                                        bg-[#3762E3]
                                        px-6 py-2.5
                                        rounded-full
                                        shadow-md shadow-blue-200
                                        hover:bg-[#2F54C8]
                                        transition
                                    "
                                >
                                    문의하기
                                    <span className="ml-2 text-sm">↗</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default CustomAIPage;
