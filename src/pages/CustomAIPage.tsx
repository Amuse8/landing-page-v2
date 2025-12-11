import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "../constants/customAiCategories";

const CustomAIPage = () => {
    const scrollRootRef = useRef<HTMLDivElement | null>(null);
    const nextSectionRef = useRef<HTMLDivElement | null>(null);
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);
    const [showScrollTop, setShowScrollTop] = useState(false);

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
        const headerHeight =
            headerEl instanceof HTMLElement ? headerEl.offsetHeight : 0;

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

    return (
        <div
            ref={scrollRootRef}
            className="h-screen overflow-y-scroll snap-y snap-mandatory"
        >
            <section
                className="relative min-h-screen
                flex flex-col items-center justify-center text-center text-white snap-start">
                <div
                    className="pointer-events-none absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('src/assets/logo.png')"}}
                />
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
                                    {cat.examples.map((ex) => (
                                        <div
                                            key={ex.title}
                                            className="rounded-2xl border border-gray-200 px-6 py-8 shadow-sm bg-white"
                                        >
                                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                                <span className="text-gray-400 text-xl">★</span>
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2">
                                                {ex.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                                {ex.description}
                                            </p>
                                        </div>
                                    ))}
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
                        fixed right-5 bottom-6
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
                            
                            {/* 텍스트 영역 */}
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

                            {/* 버튼 영역 */}
                            <div className="flex lg:flex-col items-start lg:items-end gap-4">
                                <button
                                    type="button"
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
