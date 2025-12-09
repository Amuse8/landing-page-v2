import { useEffect, useRef, useState } from "react";

const AboutPage = () => {
    const heroWrapperRef = useRef<HTMLDivElement | null>(null);
    const afterHeroRef = useRef<HTMLDivElement | null>(null);

    const [progress, setProgress] = useState(0);
    const [lineProgress, setLineProgress] = useState(0);

    const handleScrollDown = () => {
        afterHeroRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;

            if (heroWrapperRef.current) {
                const rect = heroWrapperRef.current.getBoundingClientRect();
                const raw = -rect.top / viewportHeight;
                const clamped = Math.max(0, Math.min(raw,1));
                setProgress(clamped);
            }

            if (afterHeroRef.current) {
                const rect = afterHeroRef.current.getBoundingClientRect();
                const raw2 = 1 - rect.top / viewportHeight;
                const clamped2 = Math.max(0, Math.min(raw2, 1));
                setLineProgress(clamped2);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const eased = ease(progress);

    const logoScale = 1 + eased * 2.2;
    const logoTranslateY = eased * -60;
    const logoOpacity = 1 - eased * 0.9;
    const whiteOverlayOpacity = progress;

    const secondOpacity = Math.max(0, (progress - 0.4) / 0.6);
    const secondTranslateY = (1 - secondOpacity) * 20;

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
                            <h1
                                className="
                                    font-normal
                                    text-[20vw] sm:text-7xl md:text-9xl lg:text-[10rem]
                                "
                            >
                                AI∞
                            </h1>
                        </div>

                        <p
                            className="
                                text-white/80
                                text-base sm:text-lg md:text-xl
                                tracking-wide
                                mt-4
                            "
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
                            items-center sm:items-center
                            justify-center sm:justify-between
                            px-6 sm:px-12 lg:px-20
                            gap-6 sm:gap-10
                            text-center sm:text-left
                        "
                        style={{
                            opacity: secondOpacity,
                            transform: `translateY(${secondTranslateY}px)`,
                        }}
                    >
                <h2
                    className="
                        text-black font-extrabold
                        text-3xl sm:text-4xl lg:text-5xl
                        leading-tight
                        w-full sm:max-w-[40%]
                    "
                >
                    <span className="block">AI for Every</span>
                    <span className="block text-primary">Possibility</span>
                </h2>

                <p
                    className="
                        mt-4 sm:mt-0
                        text-gray-800
                        text-base sm:text-lg
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

            <section
                ref={afterHeroRef}
                className="relative min-h-screen bg-white text-gray-900 flex items-center"
            >
                <div className="absolute inset-0 pointer-events-none">
                    <div
                    className="
                        absolute bottom-10 left-0 right-0
                        h-[1px] bg-black
                        origin-left
                        transition-transform duration-300
                        z-10
                    "
                    style={{ transform: `scaleX(${lineProgress})` }}
                    />
                    <div
                    className="
                        absolute top-10 bottom-2
                        left-1/3
                        w-[1px] bg-black
                        origin-top
                        transition-transform duration-300
                        z-20
                    "
                    style={{ transform: `scaleY(${lineProgress})` }}
                    />
                </div>

                <div className="relative w-full max-w-6xl mx-auto px-8 lg:px-12 py-20 lg:py-28 flex flex-col lg:flex-row gap-16">
                    <div className="w-full lg:w-1/3">
                    <p className="text-6xl font-bold mb-10">AI</p>
                    <div className=" text-3xl leading-relaxed">
                        <p className="font-medium">Data discovers</p>
                        <p className="font-medium">your Possibilities</p>
                    </div>
                    </div>

                    <div className="w-full lg:w-2/3 space-y-6">
                    <h3 className="text-xl sm:text-2xl font-semibold leading-relaxed">
                        AI는 <span className="text-primary font-bold">데이터(Data)</span> 속에 숨은{" "}
                        <span className="text-primary font-bold">가능성(Possibility)</span>을 <br/>현실로 바꾸는 가장 확장적인 기술입니다.
                    </h3>

                    <div className="space-y-3 text-sm sm:text-base leading-relaxed text-gray-700">
                        <p>
                        오늘의 기업들은 복잡한 데이터와 비효율적인 시스템 속에서 무엇이 문제인지, <br/>어떻게 AI를 적용해야 하는지조차 알기 어려운 상황에 놓여 있습니다.
                        </p>
                        <p>Amuse8은 이 간극을 메웁니다.</p>
                        <p>우리는 사용자의 경험을 중심에 두고, 정보를 분석해 잠재력을 발견하며 <br/>필요한 순간 바로 활용할 수 있는 AI 제품을 만들어<br/>모든 기업이 AI의 가능성을 현실로 바꿀 수 있는 세상을 만들어 갑니다.</p>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
