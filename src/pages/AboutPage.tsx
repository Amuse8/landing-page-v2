import { useEffect, useRef, useState } from "react";

const AboutPage = () => {
    const heroWrapperRef = useRef<HTMLDivElement | null>(null);
    const aboutWrapperRef = useRef<HTMLDivElement | null>(null);
    
    const [progress, setProgress] = useState(0);
    const [sectionProgress, setSectionProgress] = useState(0);
    
    const handleScrollDown = () => {
        aboutWrapperRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;

            if (heroWrapperRef.current) {
                const rect = heroWrapperRef.current.getBoundingClientRect();
                const raw = -rect.top / viewportHeight;
                const clamped = Math.max(0, Math.min(raw, 1));
                setProgress(clamped);
            }

            if (aboutWrapperRef.current) {
                const rect = aboutWrapperRef.current.getBoundingClientRect();
                const raw = -rect.top / viewportHeight;
                const clamped = Math.max(0, Math.min(raw, 1));
                setSectionProgress(clamped);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const easeHero = (t: number) => 1 - Math.pow(1 - t, 3);
    const easedHero = easeHero(progress);

    const logoScale = 1 + easedHero * 2.2;
    const logoTranslateY = easedHero * -60;
    const logoOpacity = 1 - easedHero * 0.9;
    const whiteOverlayOpacity = progress;

    const secondOpacity = Math.max(0, (progress - 0.4) / 0.6);
    const secondTranslateY = (1- secondOpacity) * 20;

    const easedSection = 1 - Math.pow(1 - sectionProgress, 3);

    const lineScale = Math.max(0, Math.min((easedSection - 0.05) / 0.2, 1));
    const aboutSlideOpacity = easedSection <= 0.5 ? 1 : 1 - (easedSection - 0.5) / 0.2;

    const rawPossibilityOpacity = easedSection <= 0.55 ? 0 : (easedSection - 0.55) / 0.25;
    const possibilitySlideOpacity = Math.max(0, Math.min(rawPossibilityOpacity, 1));

    const aboutTranslateX = -(1 - aboutSlideOpacity) * 40;
    const possTranslateX = (1 - possibilitySlideOpacity) * 40;

    const slideRaw = (easedSection - 0.75) / 0.25;
    const slideClamped = Math.max(0, Math.min(slideRaw, 1));
    const problemSlideProgress = 1 - Math.pow(1 - slideClamped, 3);

    const maxProblemWidth = 100;
    const minProblemWidth = 0;
    const maxSolutionWidth = 100;

    const problemWidth = maxProblemWidth - (maxProblemWidth - minProblemWidth) * problemSlideProgress;
    const solutionWidth = maxSolutionWidth * problemSlideProgress;

    const problemBgGrey = Math.round(problemSlideProgress * 200);
    const problemBgColor = `rgb(${problemBgGrey}, ${problemBgGrey}, ${problemBgGrey})`;
    const problemTextOpacity = problemSlideProgress <= 0.2 ? 1 : Math.max(0, 1 - (problemSlideProgress - 0.2) / 0.6);
    
    const problemTranslateX = -problemSlideProgress * 40;
    const solutionTranslateX = (1 - problemSlideProgress) * 20;
    const solutionOpacity = problemSlideProgress <= 0.3 ? 0 : Math.max(0, (problemSlideProgress - 0.3)/ 0.7);
    
    return (
        <div className="bg-black text-white">
            <div ref={heroWrapperRef} className="relative h-[200vh]">
                <div className="sticky top-0 h-screen">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('src/assets/logo.png')" }}
                    />
                    <div className="absolute inset-0 bg-black/40"/>
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
                            flex flex-col sm:flex-row
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
                        <h2 className="text-black font-extrabold text-4xl sm:text-4xl lg:text-5xl
                                leading-tight w-full sm:max-w-[40%]">
                            <span className="block">AI for Every</span>
                            <span className="block text-primary">Possibility</span>
                        </h2>

                        <p
                            className="text-gray-800 text-base sm:text-lg
                                leading-relaxed
                                w-full sm:max-w-[35%]
                            "
                        >
                            문제를 정의하고 AI로 해결하며<br />
                            제품으로 만들어냅니다.
                        </p>

                        <div
                            className="
                                mt-4 sm:mt-0
                                text-gray-800
                                text-sm sm:text-base
                                whitespace-nowrap
                                hidden xs:block sm:block uppercase
                            "
                        >
                            scroll down
                        </div>
                    </div>
                </div>
            </div>

            <div
                ref={aboutWrapperRef}
                className="relative bg-white text-gray-900 lg:h-[260vh]"
            >
                <div className="relative lg:sticky lg:top-0 lg:h-screen">
                    <div className="pointer-events-none z-10 hidden sm:block lg:absolute lg:inset-0">
                        <div
                            className="
                            hidden lg:block
                            absolute bottom-10 left-0 right-0
                            h-[1px] bg-black origin-left
                            "
                            style={{ transform: `scaleX(${lineScale})` }}
                        />

                        <div
                            className="
                            hidden lg:block
                            absolute top-10 bottom-2
                            left-1/3 w-[1px] bg-black origin-top
                            "
                            style={{ transform: `scaleY(${lineScale})` }}
                        />
                    </div>
                    <section
                        className="flex items-start lg:absolute lg:inset-0"
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
                            <div className="w-full lg:w-1/3 pr-0 lg:pr-10">
                                <div className="mb-6 sm:mb-10">
                                    <p className="text-4xl sm:text-5xl md:text-6xl font-bold">AI</p>
                                </div>
                                <div className="text-xl sm:text-2xl md:text-3xl leading-snug sm:leading-relaxed">
                                    <p className="font-medium">Data discovers</p>
                                    <p className="font-medium">your Possibilities</p>
                                </div>
                            </div>

                            <div className="w-full lg:w-2/3 space-y-5 sm:space-y-6">
                            <h3 className="text-base sm:text-xl md:text-2xl font-semibold leading-relaxed">
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

                                <div className="space-y-3 text-base sm:text-sm md:text-base leading-relaxed text-gray-700">
                                    <p>
                                    오늘의 기업들은 복잡한 데이터와 비효율적인 시스템 속에서
                                    무엇이 문제인지,
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
                                    모든 기업이 AI의 가능성을 현실로 바꿀 수 있는 세상을 만들어 갑니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                    className="flex items-stretch z-20 lg:absolute lg:inset-0"
                    style={{
                        opacity: possibilitySlideOpacity,
                        pointerEvents: possibilitySlideOpacity > 0.05 ? "auto" : "none",
                        transform: `translateX(${possTranslateX}px)`,
                        transition: "opacity 400ms ease-out, transform 400ms ease-out",
                    }}
                    >
                    <div className="relative w-full max-w-6xl mx-auto  py-20 lg:py-24 flex flex-col lg:flex-row gap-16 lg:gap-0">
                        <div className="w-full lg:w-1/3 pr-0 lg:pr-10">
                            <div className="mb-10">
                                <p className="text-5xl font-bold">Possibility</p>
                            </div>
                            <div className="text-2xl leading-relaxed">
                                <p className="font-medium">
                                <span className="text-primary font-semibold">Amuse8</span>는 모두가<br /> AI의 가능성을 활용할 수 있는<br /> 미래를 만듭니다.
                                </p>
                            </div>
                        </div>

                        <div className="hidden lg:block w-px" />

                        <div className="w-full lg:w-2/3 flex items-center">
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
                                                    "width 300ms ease-out, transform 300ms ease-out, background-color 300ms ease-out",
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
                                                    "width 300ms ease-out, transform 300ms ease-out, opacity 300ms ease-out",
                                        }}
                                    >
                                        <div
                                            className="h-full px-10 py-12 flex flex-col">
                                                <div className="inline-flex self-start items-center px-5 py-1.5 rounded-full bg-primary text-white text-sm font-medium mb-6">
                                                    Solution
                                                </div>
                                                <div className="mt-auto">
                                                    <h3 className="text-3xl font-semibold mb-4">
                                                        명확한 AI 해법
                                                    </h3>
                                                    <p className="text-base leading-relaxed text-gray-800">
                                                        Amuse8은 문제를 먼저 정의하고,<br/>
                                                        그에 가장 적합한 AI 해결책을 제품 형태로 제공합니다.
                                                        <br />
                                                        누구나 필요한 순간 바로 사용할 수 있는
                                                        실질적인 AI 경험을 만드는 것이 <br/>우리의 방식입니다.
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
                                    <h3 className="text-xl font-semibold mb-3 text-white">
                                        막막한 AI 적용
                                    </h3>
                                    <p className="text-sm leading-relaxed text-white/90"> 
                                        AI 기술은 빠르게 발전하는데, <br/>
                                            왜 기업은 여전히 어려움을 겪을까요? <br/>
                                            복잡한 데이터와 시스템 속에서 문제를 파악하기 어렵고,
                                            <br/>
                                            AI의 실제 업무 적용 방식도 명확하지 않기 때문입니다.
                                    </p>
                                </div>
                                <div className="bg-[#F3F3F3] text-black rounded-3xl px-6 py-8">
                                    <div className="inline-flex items-center px-4 py-1 rounded-full bg-primary text-white text-xs font-medium mb-4">
                                        Solution
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        손쉬운 AI 경험
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-800">
                                        Amuse8은 문제를 먼저 정의하고,
                                            그에 가장 적합한 AI 해결책을 제품 형태로 제공합니다.
                                            <br/>누구나 필요한 순간 바로 사용할 수 있는
                                            실질적인 AI 경험을 만드는 것이 우리의 방식입니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </section>
                </div>
            </div>

        </div>
    );
};

export default AboutPage;
