import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import mainArticle1 from "@/assets/main-article-1.jpg";
import mainArticle2 from "@/assets/main-article-2.jpg";
import mainCustom1200 from "@/assets/main-custom-1200.webp";
import mainCustom2000 from "@/assets/main-custom-2000.webp";
import mainCeep1200 from "@/assets/main-ceep-1200.webp";
import mainCeep2000 from "@/assets/main-ceep-2000.webp";
import mainFirstImage from "@/assets/main-first-image.webp";

const HomePage = () => {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const nextSectionRef = useRef<HTMLDivElement | null>(null);

    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const [showAmuseTitle, setShowAmuseTitle] = useState(true);

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsHeroVisible(entry.isIntersecting);
                });
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
        const timer = setTimeout(() => {
            setShowAmuseTitle(false);
        }, 1400);

        return () => clearTimeout(timer);
    }, []);

    const handleScrollDown = () => {
        nextSectionRef.current?.scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className="home-page h-screen overflow-y-scroll snap-y snap-mandatory">
            <section
                ref={heroRef}
                className="
                    relative min-h-screen
                    flex flex-col items-center justify-center
                    text-center text-white snap-start
                    overflow-hidden
                "
                style={{
                    backgroundImage: `url(${mainFirstImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
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
                                ${showAmuseTitle
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 -translate-y-4"
                                }
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
                                ${showAmuseTitle
                                    ? "opacity-0 translate-y-4"
                                    : "opacity-100 translate-y-0"
                                }
                            `}
                        >
                            Finding Muse In AI
                        </span>
                    </h1>

                    <Link
                        to="/about"
                        className="group inline-flex items-center text-white text-lg font-medium mb-12 cursor-pointer
                        px-4 py-2 rounded-full transition hover:bg-white/20"
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
                    <p className="text-2xl  sm:text-3xl lg:text-4xl font-bold mb-16 leading-snug">
                        정보의 잠재력을 드러내고<br/> 비즈니스에 최적화된 AI를 <br/> 제공합니다.
                    </p>
                    <div className="grid gap-16 md:grid-cols-2">
                        <article
                            ref={useScrollAnimation()}
                            className="fade-up border border-gray-300 rounded-2xl px-10 py-14 flex flex-col shadow-sm">
                            <div className="mb-10">
                                <img 
                                    src={mainCeep1200} 
                                    srcSet={`
                                        ${mainCeep1200} 1200w,
                                        ${mainCeep2000} 2000w
                                    `}
                                    sizes="(max-width: 768px) 90vw, 1068px"
                                    alt="custom"
                                />
                            </div>
                            <p className="text-xl leading-relaxed text-gray-700 mb-10">
                                흩어진 문서를 자동으로 분석해 명확한 구조로 정리해줍니다.
                                <br />
                                Ceep을 통해 복잡한 자료 관리 없이 필요한 순간 <br/> 즉시 활용할 수 있는
                                업무 환경을 경험해보세요.
                            </p>
                            <Link
                                to="/services"
                                className="
                                    mt-auto
                                    inline-flex items-center justify-center
                                    text-xl font-semibold
                                    text-gray-900
                                    hover:opacity-70
                                "
                            >
                                <span>Ceep 알아보기</span>
                                <span className="ml-2 text-2xl">→</span>
                            </Link>
                        </article>
                        <article
                            ref={useScrollAnimation()}
                            className="fade-up border border-gray-300 rounded-2xl px-10 py-14 flex flex-col shadow-sm">
                            <div className="mb-10">
                                <img 
                                    src={mainCustom1200} 
                                    srcSet={`
                                        ${mainCustom1200} 1200w,
                                        ${mainCustom2000} 2000w
                                    `}
                                    sizes="(max-width: 768px) 90vw, 1068px"
                                    alt="custom"
                                />
                            </div>
                            <p className="text-xl leading-relaxed text-gray-700 mb-10">
                                기업의 문제를 분석해 목적에 맞는 AI 솔루션을 설계·구현합니다.
                                <br />
                                Custom AI를 통해 복잡한 업무를 자동화하고,<br/> 실제 현장에서 바로 적용
                                가능한 AI 경험을 만들어 보세요.
                            </p>

                            <Link
                                to="/custom-ai"
                                className="
                                    mt-auto
                                    inline-flex items-center justify-center
                                    text-xl font-semibold
                                    text-gray-900
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
                ref={nextSectionRef}
                className="
                    bg-white text-gray-900
                    flex justify-center
                    px-4 sm:px-10 lg:px-16
                    py-32 sm:py-40 snap-start"
            >
                    <div className="w-full max-w-[1600px]">
                    <p className="text-2xl font-bold sm:text-2xl lg:text-4xl mb-16 leading-snug">
                        AI와 정보 혁신을 통해<br/>기업의 운영 방식과 미래 경쟁력을<br/> 재정의하고 있습니다.
                    </p>
                    <div className="grid gap-12 lg:gap-16 md:grid-cols-3">
                        <article
                            ref={useScrollAnimation()}
                            className="fade-up flex flex-col items-center">
                            <div className="w-full h-52 sm:h-60 rounded-lg mb-8 overflow-hidden bg-gray-200">
                                <img
                                    src={mainArticle1}
                                    alt="뉴스 썸네일"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-base sm:text-xl font-semibold mb-4"> 
                                AI 기반 스마트 클라우드 서비스를 제공하는 기업 ‘아뮤즈8’
                            </h3>
                            <div className="flex flex-wrap gap-2 text-base sm:text-lg text-primary self-start">
                                <span>#AI</span>
                                <span>#클라우드</span>
                            </div>   
                        </article>
                        <article
                            ref={useScrollAnimation()}
                            className="fade-up flex flex-col items-center">
                            <div className="w-full h-52 sm:h-60 rounded-lg mb-8 overflow-hidden bg-gray-200">
                                <img
                                    src={mainArticle2}
                                    alt="뉴스 썸네일"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-base sm:text-xl font-semibold mb-4"> 
                                아뮤즈8 “AI 데이터 자동 태깅 기술로 정보관리, 데이터 처리 혁신”
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2 text-base sm:text-lg text-primary self-start">
                                <span>#정보관리</span>
                                <span>#데이터</span>
                            </div>   
                        </article>
                        
                    </div>
                    </div>
            </section>
            <section
                ref={nextSectionRef}
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
                            Our Partners
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                            {[1,2,3,4,5,6,7,8,9].map(i => (
                                <div
                                    key={i}
                                    className="
                                        h-24 bg-gray-100 rounded-xl
                                        flex items-center justify-center
                                        text-gray-700 text-lg font-semibold
                                    "
                                >
                                    파트너 {i}
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
                        <h3 className="
                            font-bold text-gray-900 leading-snug
                            text-2xl sm:text-3xl md:text-4xl
                        ">
                            AI로 확장되는<br />새로운 비즈니스 기회
                        </h3>

                        <p className="
                            text-gray-600 font-semibold leading-relaxed mt-5
                            text-lg sm:text-xl md:text-2xl
                        ">
                            Amuse8와 함께 <br/>미래의 서비스를 만들어보세요.
                        </p>
                        <a
                        href="mailto:supports@amuse8.kr"
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
                    </a>




                    </div>

                </div>
            </section>
        </div>
    )
}
export default HomePage;