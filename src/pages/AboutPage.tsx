import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ceepIcon from "@/assets/about-icons/Ceep-icon.png";
import customAiIcon from "@/assets/about-icons/Wrench-icon.png";
import Footer from "../components/Footer";
import { useSeo } from "../hooks/useSeo";

const AboutPage = () => {
    useSeo({
    title: "About Amuse8 | Our Vision & Team",
    description: "Amuse8의 비전과 히스토리, 그리고 우리가 만드는 AI 제품/솔루션을 소개합니다.",
    canonicalPath: "/about",
    });
    const location = useLocation();
    const navigate = useNavigate();

    const scrollRootRef = useRef<HTMLDivElement | null>(null);

    const heroWrapperRef = useRef<HTMLDivElement | null>(null);
    const aboutWrapperRef = useRef<HTMLDivElement | null>(null);

    const [progress, setProgress] = useState(0);
    const [sectionProgress, setSectionProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isHeroVisible, setIsHeroVisible] = useState(true);

    const [isCeepExpanded, setIsCeepExpanded] = useState(false);
    const [isCustomExpanded, setIsCustomExpanded] = useState(false);
    const [isContactExpanded, setIsContactExpanded] = useState(false);

    useEffect(() => {
        const updateIsMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        updateIsMobile();
        window.addEventListener("resize", updateIsMobile);
        return () => window.removeEventListener("resize", updateIsMobile);
    }, []);

    const handleScrollDown = () => {
        aboutWrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        const root = scrollRootRef.current;
        const hero = heroWrapperRef.current;
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

        const handleScroll = () => {
            const viewportHeight = root.clientHeight;

            const rootRect = root.getBoundingClientRect();

            if (heroWrapperRef.current) {
                const rect = heroWrapperRef.current.getBoundingClientRect();
                const top = rect.top - rootRect.top;
                const raw = -top / viewportHeight;
                const clamped = Math.max(0, Math.min(raw, 1));
                setProgress(clamped);
            }

            if (aboutWrapperRef.current) {
                const rect = aboutWrapperRef.current.getBoundingClientRect();
                const top = rect.top - rootRect.top;
                const raw = -top / viewportHeight;
                const clamped = Math.max(0, Math.min(raw, 1));
                setSectionProgress(clamped);
            }
        };

        root.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => root.removeEventListener("scroll", handleScroll);
    }, []);

    const easeHero = (t: number) => 1 - Math.pow(1 - t, 3);
    const easedHero = easeHero(progress);

    const logoScale = 1 + easedHero * 2.2;
    const logoTranslateY = easedHero * -60;
    const logoOpacity = 1 - easedHero * 0.9;
    const whiteOverlayOpacity = progress;

    const secondOpacity = Math.max(0, (progress - 0.4) / 0.6);
    const secondTranslateY = (1 - secondOpacity) * 20;

    const easedSection = 1 - Math.pow(1 - sectionProgress, 3);

    const clamp01 = (t: number) => Math.max(0, Math.min(t, 1));

    const lineScale = Math.max(0, Math.min((easedSection - 0.05) / 0.2, 1));
    const aboutSlideOpacity = easedSection <= 0.5 ? 1 : 1 - (easedSection - 0.5) / 0.2;

    const rawPossibilityOpacity = easedSection <= 0.55 ? 0 : (easedSection - 0.55) / 0.25;
    const possibilitySlideOpacity = Math.max(0, Math.min(rawPossibilityOpacity, 1));

    const aboutTranslateX = -(1 - aboutSlideOpacity) * 40;
    const possTranslateX = (1 - possibilitySlideOpacity) * 40;

    const problemPhaseStart = 0.66;
    const problemPhaseEnd = 0.97;

    const problemHoldRatio = 0.65;
    
    const solutionHoldRatio = 0.25;

    const problemRaw = (easedSection - problemPhaseStart) / (problemPhaseEnd - problemPhaseStart);
    const t = clamp01(problemRaw);

    let moveT = 0;

    if (t <= problemHoldRatio) {
        moveT = 0;
    } else if (t >= 1 - solutionHoldRatio) {
        moveT = 1;
    } else {
        moveT = (t - problemHoldRatio) / ((1 - solutionHoldRatio) - problemHoldRatio);
    }

    const smoothstep = (t: number) => t * t * (3 - 2 * t);
    const problemSlideProgress = smoothstep(moveT);

    const maxProblemWidth = 100;
    const minProblemWidth = 0;
    const maxSolutionWidth = 100;

    const problemWidth = maxProblemWidth - (maxProblemWidth - minProblemWidth) * problemSlideProgress;
    const solutionWidth = maxSolutionWidth * problemSlideProgress;

    const problemBgColor = "#111111";
    const problemTextOpacity =
        problemSlideProgress <= 0.5
            ? 1
            : Math.max(0, 1 - (problemSlideProgress - 0.5) / 0.5);

    const problemTranslateX = -problemSlideProgress * 22;
    const solutionTranslateX = (1 - problemSlideProgress) * 12;
    const solutionOpacity =
        problemSlideProgress <= 0.6
            ? 0
            : Math.max(0, (problemSlideProgress - 0.6) / 0.4);

    const infinitePhaseStart = 0.995;
    const infinitePhaseEnd = 1.0;

    const rawInfiniteOpacity =
        (easedSection - infinitePhaseStart) / (infinitePhaseEnd - infinitePhaseStart);
    const infiniteSlideOpacity = clamp01(rawInfiniteOpacity);

    const possibilitySectionOpacity = isMobile
        ? possibilitySlideOpacity
        : possibilitySlideOpacity * (1 - infiniteSlideOpacity);
    const possibilitySectionTranslateY = infiniteSlideOpacity * -20;

    return (
        <div
            ref={scrollRootRef}
            className="h-screen overflow-y-scroll overflow-x-hidden overscroll-contain bg-black text-white"
        >
            <div className="pt-16 lg:pt-0">
                <div ref={heroWrapperRef} className="relative h-auto lg:h-[200vh]">
                    <div className="min-h-screen lg:sticky lg:top-0 lg:h-screen">
                        <div className="absolute inset-0 bg-black" />
                        <div className="absolute inset-0 bg-black/40" />
                        <div
                            className="absolute inset-0 bg-white pointer-events-none"
                            style={{ opacity: whiteOverlayOpacity }}
                        />
                        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
                            <div
                                style={{
                                    transform: `scale(${logoScale}) translateY(${logoTranslateY}px)`,
                                    transformOrigin: "center center",
                                    opacity: logoOpacity,
                                }}
                            >
                                <h1 className="font-normal text-[20vw] sm:text-7xl md:text-9xl lg:text-[10rem]">
                                    AI∞
                                </h1>
                            </div>
                            <p
                                className="text-white/80 text-base sm:text-lg md:text-xl tracking-wide mt-4"
                                style={{ opacity: logoOpacity }}
                            >
                                (AI Infinite)
                            </p>

                            <button
                                onClick={handleScrollDown}
                                className="mt-10 text-white/70 text-sm tracking-[0.2em] uppercase"
                                style={{ opacity: logoOpacity }}
                            >
                                Scroll
                            </button>
                        </div>

                        <div
                            className="
                                absolute inset-0
                                hidden lg:flex
                                flex-col sm:flex-row
                                justify-center sm:justify-between
                                items-center px-6 sm:px-12 lg:px-20
                                gap-6 sm:gap-10
                                text-center sm:text-left
                            "
                            style={{
                                opacity: secondOpacity,
                                transform: `translateY(${secondTranslateY}px)`,
                            }}
                        >
                            <h2
                                className="text-black font-extrabold text-4xl sm:text-4xl lg:text-5xl
                                leading-tight w-full sm:max-w-[40%]"
                            >
                                <span className="block">
                                    Finding <span className="text-primary">Muse</span> in AI
                                </span>
                            </h2>

                            <p className="text-gray-800 text-base sm:text-lg leading-relaxed w-full sm:max-w-[35%]">
                                <span className="block">
                                    At Amuse8, we build AI inspired by our own muse, 
                                    <br />
                                    with the mission of automating information management.
                                </span>

                                <span className="block mt-4">
                                    Amuse8(아뮤즈8)은 ‘정보관리 자동화’를 미션으로,
                                    <br />
                                    우리만의 영감을 담은 AI를 만듭니다.
                                </span>
                            </p>
                            <div
                                className="mt-4 sm:mt-0 text-gray-800 text-sm sm:text-base
                                whitespace-nowrap hidden xs:block sm:block uppercase"
                            >
                                scroll down
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:hidden bg-white text-gray-900 px-6 py-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
                            <span className="block">
                                Finding <span className="text-primary">Muse</span> in AI
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                            <span className="block">
                                At Amuse8, we build AI inspired by our own muse, 
                                <br />
                                with the mission of automating information management.
                            </span>

                            <span className="block mt-4">
                                Amuse8(아뮤즈8)은 ‘정보관리 자동화’를 미션으로,
                                <br />
                                우리만의 영감을 담은 AI를 만듭니다.
                            </span>
                        </p>
                    </div>
                </div>

                <div ref={aboutWrapperRef} className="relative bg-white text-gray-900 lg:h-[200vh]">
                    <div className="relative lg:sticky lg:top-0 lg:h-screen">
                        <div className="pointer-events-none hidden lg:block absolute inset-0">
                            <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 h-full">
                                <div
                                    className="absolute bottom-10 left-0 right-0 h-[1px] bg-black origin-left"
                                    style={{
                                        transform: `scaleX(${lineScale * (1 - infiniteSlideOpacity)})`,
                                        opacity: 1 - infiniteSlideOpacity,
                                    }}
                                />
                                <div
                                    className="absolute top-10 bottom-2 w-[1px] bg-black origin-top"
                                    style={{
                                        left: "33.3333%",
                                        transform: `scaleY(${lineScale * (1 - infiniteSlideOpacity)})`,
                                        opacity: 1 - infiniteSlideOpacity,
                                    }}
                                />
                            </div>
                        </div>

                        <section
                            className="flex items-start lg:items-center lg:absolute lg:inset-0"
                            style={{
                                opacity: aboutSlideOpacity,
                                pointerEvents: aboutSlideOpacity > 0.05 ? "auto" : "none",
                                transform: `translateX(${aboutTranslateX}px)`,
                                transition: "opacity 400ms ease-out, transform 400ms ease-out",
                            }}
                        >
                            <div
                                className="
                                    relative w-full max-w-6xl mx-auto
                                    px-4 sm:px-8 lg:px-12
                                    py-12 sm:py-16 lg:py-28
                                    flex flex-col lg:flex-row
                                    gap-10 lg:gap-0
                                "
                            >
                                <div className="w-full lg:w-1/3 pr-0 lg:pr-10 min-w-0">
                                    <div className="mb-6 sm:mb-10">
                                        <p className="text-4xl sm:text-5xl md:text-6xl font-bold">AI</p>
                                    </div>
                                    <div className="text-xl sm:text-2xl md:text-3xl leading-snug sm:leading-relaxed">
                                        <p className="font-medium">Data discovers</p>
                                        <p className="font-medium">your Possibilities</p>
                                    </div>
                                </div>
                                <div className="w-full lg:w-2/3 space-y-5 sm:space-y-6 min-w-0">
                                    <h3 className="text-base sm:text-xl md:text-2xl font-semibold leading-relaxed break-words">
                                        AI는{" "}
                                        <span className="text-primary font-bold">데이터(Data)</span>{" "}
                                        속에 숨은{" "}
                                        <span className="text-primary font-bold">가능성(Possibility)</span>
                                        을{" "}
                                        <span className="hidden sm:inline">
                                            <br />
                                        </span>
                                        현실로 바꾸는 가장 확장적인 기술입니다.
                                    </h3>
                                    <div className="space-y-3 text-base sm:text-sm md:text-base leading-relaxed text-gray-700 break-words">
                                        <p>
                                            오늘의 기업들은 복잡한 데이터와 비효율적인 시스템 속에서 무엇이
                                            문제인지,
                                            <span className="hidden sm:inline">
                                                <br />
                                            </span>
                                            <span className="inline sm:hidden"> </span>
                                            어떻게 AI를 적용해야 하는지조차 알기 어려운 상황에 놓여 있습니다.
                                        </p>
                                        <p>Amuse8은 이 간극을 메웁니다.</p>
                                        <p>
                                            우리는 사용자의 경험을 중심에 두고, 정보를 분석해 잠재력을
                                            발견하며
                                            <span className="hidden sm:inline">
                                                <br />
                                            </span>
                                            <span className="inline sm:hidden"> </span>
                                            필요한 순간 바로 활용할 수 있는 AI 제품을 만들어
                                            <span className="hidden sm:inline">
                                                <br />
                                            </span>
                                            <span className="inline sm:hidden"> </span>
                                            모든 기업이 AI의 가능성을 현실로 바꿀 수 있는 세상을 만들어
                                            갑니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            className="flex items-stretch lg:items-center lg:absolute lg:inset-0"
                            style={{
                                opacity: possibilitySectionOpacity,
                                pointerEvents: possibilitySectionOpacity > 0.05 ? "auto" : "none",
                                transform: `translateX(${possTranslateX}px) translateY(${possibilitySectionTranslateY}px)`,
                                transition: "opacity 400ms ease-out, transform 400ms ease-out",
                            }}
                        >
                            <div
                                className="
                                    relative w-full max-w-6xl mx-auto
                                    px-4 sm:px-8 lg:px-12
                                    py-20 lg:py-24
                                    flex flex-col lg:flex-row
                                    gap-16 lg:gap-0
                                "
                            >
                                <div className="w-full lg:w-1/3 pr-0 lg:pr-10 min-w-0 flex flex-col justify-center lg:translate-y-[2px]">
                                    <div className="mb-10">
                                        <p className="text-5xl font-bold">Possibility</p>
                                    </div>
                                    <div className="text-2xl leading-relaxed">
                                        <p className="font-medium">
                                            <span className="text-primary font-semibold">Amuse8</span>는 모두가
                                            <br /> AI의 가능성을 활용할 수 있는
                                            <br /> 미래를 만듭니다.
                                        </p>
                                    </div>
                                </div>

                                <div className="hidden lg:block w-px" />

                                <div className="w-full lg:w-2/3 flex items-center min-w-0">
                                    <div className="relative h-[420px] w-full hidden lg:block">
                                        <div className="relative flex h-[420px] overflow-hidden">
                                            <div
                                                className="rounded-3xl shadow-xl overflow-hidden mr-0"
                                                style={{
                                                    width: `${problemWidth}%`,
                                                    right: `calc(66.666% - ${problemWidth}%)`,
                                                    transform: `translateX(${problemTranslateX}px)`,
                                                    backgroundColor: problemBgColor,
                                                    marginLeft: `${-6 * problemSlideProgress}px`,
                                                    transition:
                                                        "width 300ms ease-out, transform 600ms ease-out, background-color 300ms ease-out",
                                                }}
                                            >
                                                <div className="h-full px-10 py-12 flex flex-col">
                                                    <div
                                                        className="inline-flex self-start px-5 py-1.5 rounded-full bg-white text-black text-sm font-medium mb-6"
                                                        style={{ opacity: problemTextOpacity }}
                                                    >
                                                        Problem
                                                    </div>
                                                    <div className="mt-auto">
                                                        <h3
                                                            className="text-3xl text-white font-semibold mb-4"
                                                            style={{ opacity: problemTextOpacity }}
                                                        >
                                                            AI 적용의 난제
                                                        </h3>
                                                        <p
                                                            className="text-base leading-relaxed text-white"
                                                            style={{ opacity: problemTextOpacity }}
                                                        >
                                                            AI 기술은 빠르게 발전하는데, <br />
                                                            왜 기업은 여전히 어려움을 겪을까요? <br />
                                                            복잡한 데이터와 시스템 속에서 문제를 파악하기 어렵고,
                                                            <br />
                                                            AI의 실제 업무 적용 방식도 명확하지 않기 때문입니다.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className="rounded-3xl bg-[#F3F3F3] text-black shadow-xl overflow-hidden ml-[3%]"
                                                style={{
                                                    width: `${solutionWidth}%`,
                                                    opacity: solutionOpacity,
                                                    transform: `translateX(${solutionTranslateX}px)`,
                                                    transition:
                                                        "width 500ms ease-out, transform 500ms ease-out, opacity 500ms ease-out",
                                                }}
                                            >
                                                <div className="h-full px-10 py-12 flex flex-col">
                                                    <div className="inline-flex self-start items-center px-5 py-1.5 rounded-full bg-primary text-white text-sm font-medium mb-6">
                                                        Solution
                                                    </div>
                                                    <div className="mt-auto">
                                                        <h3 className="text-3xl font-semibold mb-4">명확한 AI 해법</h3>
                                                        <p className="text-base leading-relaxed text-gray-800">
                                                            Amuse8은 문제를 먼저 정의하고,<br />
                                                            그에 가장 적합한 AI 해결책을 제품 형태로 제공합니다.
                                                            <br />
                                                            누구나 필요한 순간 바로 사용할 수 있는 실질적인 AI 경험을 만드는 것이{" "}
                                                            <br />
                                                            우리의 방식입니다.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full space-y-6 lg:hidden">
                                        <div className="bg-black text-white rounded-3xl px-6 py-8">
                                            <div className="inline-flex items-center px-4 py-1 rounded-full bg-white text-black text-xs font-medium mb-4">
                                                Problem
                                            </div>
                                            <h3 className="text-xl font-semibold mb-3 text-white">막막한 AI 적용</h3>
                                            <p className="text-sm leading-relaxed text-white/90">
                                                AI 기술은 빠르게 발전하는데, <br />
                                                왜 기업은 여전히 어려움을 겪을까요? <br />
                                                복잡한 데이터와 시스템 속에서 문제를 파악하기 어렵고,
                                                <br />
                                                AI의 실제 업무 적용 방식도 명확하지 않기 때문입니다.
                                            </p>
                                        </div>
                                        <div className="bg-[#F3F3F3] text-black rounded-3xl px-6 py-8">
                                            <div className="inline-flex items-center px-4 py-1 rounded-full bg-primary text-white text-xs font-medium mb-4">
                                                Solution
                                            </div>
                                            <h3 className="text-xl font-semibold mb-3">손쉬운 AI 경험</h3>
                                            <p className="text-sm leading-relaxed text-gray-800">
                                                Amuse8은 문제를 먼저 정의하고, 그에 가장 적합한 AI 해결책을 제품 형태로 제공합니다.
                                                <br />
                                                누구나 필요한 순간 바로 사용할 수 있는 실질적인 AI 경험을 만드는 것이 우리의 방식입니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            className="flex items-stretch lg:absolute lg:inset-0"
                            style={{
                                opacity: infiniteSlideOpacity,
                                pointerEvents: infiniteSlideOpacity > 0.05 ? "auto" : "none",
                                transform: `translateY(${(1 - infiniteSlideOpacity) * 20}px)`,
                                transition: "opacity 400ms ease-out, transform 400ms ease-out",
                            }}
                        >
                            <div className="relative w-full max-w-6xl mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-0">
                                <div className="relative rounded-[32px] overflow-hidden bg-black">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: "url('/images/ax-experience-bg.jpg')" }}
                                    />
                                    <div className="absolute inset-0 bg-black/55" />
                                    <div className="relative z-10 px-8 sm:px-10 lg:px-12 py-10 lg:py-12 flex flex-col gap-10 lg:gap-12">
                                        <div className="text-white max-w-xl">
                                            <p className="text-xs font-medium text-white/60 mb-3">Our Product</p>
                                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                                                <span className="text-primary">AI∞</span>{" "}
                                                <span>
                                                    : Infinite AI <br />
                                                    Possibilities
                                                </span>
                                                <br />
                                                <span>직접 경험해 보세요</span>
                                            </h2>
                                            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                                                AI로 비즈니스의 한계를 넘어서고 싶다면,
                                                <br />
                                                지금 Amuse8과 함께 <br /> 무한한 AI 경험을 시작해보세요.
                                            </p>
                                        </div>

                                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                                            <div className="flex-1">
                                                <div className="relative h-full rounded-3xl bg-white/95 shadow-xl px-6 py-8 flex flex-col overflow-hidden">
                                                    <div
                                                        className="
                                                            absolute right-6 top-6
                                                            w-12 h-12
                                                            flex items-center justify-center
                                                            pointer-events-none
                                                        "
                                                        >
                                                        <img
                                                            src={ceepIcon}
                                                            alt="Ceep Icon"
                                                            className="w-full h-full object-contain opacity-90"
                                                        />
                                                    </div>

                                                    <p className="text-xs font-medium text-primary mb-4">Ceep AI</p>

                                                    <p className="text-base sm:text-lg font-medium leading-relaxed mb-8 pr-14">
                                                        흩어진 정보를
                                                        <br />
                                                        즉시 활용 가능한 지식으로 바꿉니다.
                                                    </p>

                                                    <button
                                                        onClick={() => {
                                                            if (!isCeepExpanded) {
                                                                setIsCeepExpanded(true);
                                                            } else {
                                                                navigate("/ceep-ai");
                                                            }
                                                        }}
                                                        className={`
                                                            mt-auto self-start rounded-full border border-gray-900
                                                            flex items-center justify-center
                                                            text-xs sm:text-sm font-medium
                                                            transition-all duration-200
                                                            ${isCeepExpanded ? "px-4 h-10" : "w-10 h-10 text-xl"}
                                                        `}
                                                    >
                                                        {isCeepExpanded ? "Ceep AI 더 알아보기" : "+"}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <div className="relative h-full rounded-3xl bg-white/90 shadow-xl px-6 py-8 flex flex-col overflow-hidden">
                                                    <div
                                                        className="
                                                            absolute right-6 top-6
                                                            w-10 h-10
                                                            flex items-center justify-center
                                                            pointer-events-none
                                                        "
                                                        >
                                                        <img
                                                            src={customAiIcon}
                                                            alt="Custom AI Icon"
                                                            className="w-full h-full object-contain opacity-90"
                                                        />
                                                    </div>

                                                    <p className="text-xs font-medium text-primary mb-4">Custom AI</p>

                                                    <p className="text-base sm:text-lg font-medium leading-relaxed mb-8 pr-14">
                                                        비즈니스에 필요한 AI를
                                                        <br />
                                                        원하는 형태로 만들어 드립니다.
                                                    </p>

                                                    <button
                                                        onClick={() => {
                                                            if (!isCustomExpanded) {
                                                                setIsCustomExpanded(true);
                                                            } else {
                                                                navigate("/custom-ai");
                                                            }
                                                        }}
                                                        className={`
                                                            mt-auto self-start rounded-full border border-gray-900
                                                            flex items-center justify-center
                                                            text-xs sm:text-sm font-medium
                                                            transition-all duration-200
                                                            ${isCustomExpanded ? "px-4 h-10" : "w-10 h-10 text-xl"}
                                                        `}
                                                    >
                                                        {isCustomExpanded ? "Custom AI 더 알아보기" : "+"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                if (!isContactExpanded) {
                                                    setIsContactExpanded(true);
                                                } else {
                                                    navigate("/inquiry", {
                                                        state: { from: location.pathname },
                                                    });
                                                }
                                            }}
                                            className={`
                                                hidden lg:flex
                                                items-center justify-center
                                                rounded-full
                                                bg-primary text-white text-xl font-medium
                                                shadow-lg
                                                absolute bottom-8 right-8
                                                transition-all duration-300
                                                ${isContactExpanded ? "px-6 h-14 w-auto text-base" : "w-14 h-14"}
                                            `}
                                        >
                                            {isContactExpanded ? "문의하기" : "?"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <Footer/>                                
            </div>
        </div>
    );
};

export default AboutPage;
