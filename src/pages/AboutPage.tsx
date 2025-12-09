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

    const easedSection = 1 - Math.pow(1 - sectionProgress, 3);

    const lineScale = Math.max(0, Math.min((easedSection - 0.05) / 0.2, 1));
    const aboutSlideOpacity = easedSection <= 0.85 ? 1 : 1 - (easedSection - 0.85) / 0.15;
    const possibilitySlideOpacity = easedSection <= 0.9 ? 0 : (easedSection - 0.9) / 0.1;
    const aboutTranslateX = -(1 - aboutSlideOpacity) * 40;
    const possTranslateX = (1 - possibilitySlideOpacity) * 40;

    const easeHero = (t: number) => 1 - Math.pow(1 - t, 3);
    const easedHero = easeHero(progress);

    const logoScale = 1 + easedHero * 2.2;
    const logoTranslateY = easedHero * -60;
    const logoOpacity = 1 - easedHero * 0.9;
    const whiteOverlayOpacity = progress;

    const secondOpacity = Math.max(0, (progress - 0.4) / 0.6);
    const secondTranslateY = (1- secondOpacity) * 20;

    return (
        <div className="bg-black text-white">
            <div ref={heroWrapperRef} className="relative h-[200vh]">
                <div className="sticky top-0 h-screen overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('src/assets/logo.png')" }}
                    />
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
                className="relative h-[260vh] bg-white text-gray-900"
            >
                <div className="sticky top-0 h-screen overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none z-10 hidden sm:block">

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
                    className="absolute inset-0 flex items-start"
                    style={{
                        opacity: aboutSlideOpacity,
                        pointerEvents: aboutSlideOpacity > 0.05 ? "auto" : "none",
                        transform: `translateX(${aboutTranslateX}px)`,
                        transition: "opacity 400ms ease-out, transform 400ms ease-out",
                    }}
                    >
                    <div className="relative w-full max-w-6xl mx-auto px-8 lg:px-12 py-20 lg:py-28 flex flex-col lg:flex-row gap-16">
                        <div className="w-full lg:w-1/3">
                        <div className="mb-10 -mt-12">
                            <p className="text-6xl font-bold">AI</p>
                        </div>
                        <div className="text-3xl leading-relaxed">
                            <p className="font-medium">Data discovers</p>
                            <p className="font-medium">your Possibilities</p>
                        </div>
                        </div>

                        <div className="w-full lg:w-2/3 space-y-6">
                        <h3 className="text-xl sm:text-2xl font-semibold leading-relaxed">
                            AI는{" "}
                            <span className="text-primary font-bold">데이터(Data)</span>{" "}
                            속에 숨은{" "}
                            <span className="text-primary font-bold">
                            가능성(Possibility)
                            </span>
                            을 <br />
                            현실로 바꾸는 가장 확장적인 기술입니다.
                        </h3>

                        <div className="space-y-3 text-sm sm:text-base leading-relaxed text-gray-700">
                            <p>
                            오늘의 기업들은 복잡한 데이터와 비효율적인 시스템 속에서
                            무엇이 문제인지, <br />
                            어떻게 AI를 적용해야 하는지조차 알기 어려운 상황에 놓여
                            있습니다.
                            </p>
                            <p>Amuse8은 이 간극을 메웁니다.</p>
                            <p>
                            우리는 사용자의 경험을 중심에 두고, 정보를 분석해
                            잠재력을 발견하며 <br />
                            필요한 순간 바로 활용할 수 있는 AI 제품을 만들어
                            <br />
                            모든 기업이 AI의 가능성을 현실로 바꿀 수 있는 세상을
                            만들어 갑니다.
                            </p>
                        </div>
                        </div>
                    </div>
                    </section>

                    <section
                    className="absolute inset-0 flex items-stretch z-20"
                    style={{
                        opacity: possibilitySlideOpacity,
                        pointerEvents: possibilitySlideOpacity > 0.05 ? "auto" : "none",
                        transform: `translateX(${possTranslateX}px)`,
                        transition: "opacity 400ms ease-out, transform 400ms ease-out",
                    }}
                    >
                    <div className="relative w-full max-w-6xl mx-auto px-8 lg:px-12 py-20 lg:py-24 flex flex-col lg:flex-row gap-16">
                        <div className="w-full lg:w-1/3">
                        <div className="mb-10 -mt-10">
                            <p className="text-5xl font-bold">Possibility</p>
                        </div>
                        <div className="text-2xl leading-relaxed">
                            <p className="font-medium">
                            <span className="text-primary font-semibold">Amuse8</span>는 모두가<br /> AI의 가능성을 활용할 수 있는<br /> 미래를 만듭니다.
                            </p>
                        </div>
                        </div>

                        <div className="hidden lg:block w-px" />

                        <div className="w-full lg:w-2/3 flex items-center lg:pl-12">
                        <div className="w-full bg-black text-white rounded-3xl px-8 py-10 lg:px-12 lg:py-12 shadow-xl">
                            <div className="inline-flex items-center px-4 py-1 rounded-full bg-white text-black text-sm font-medium mb-6">
                            Problem
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
                            막막한 AI 적용
                            </h3>
                            <p className="text-base lg:text-base leading-relaxed text-white">
                            AI 기술은 빠르게 발전하는데, <br />
                            왜 기업은 여전히 어려움을 겪을까요? <br />
                            복잡한 데이터와 시스템 속에서 문제를 파악하기 어렵고, <br/>AI의 실제 업무 적용 방식도 명확하지 않기 때문입니다.
                            </p>
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
