import { Link } from "react-router-dom";
import { useRef } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

const HomePage = () => {
    const nextSectionRef = useRef<HTMLDivElement | null>(null);

    const handleScrollDown = () => {
        nextSectionRef.current?.scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className="home-page h-screen overflow-y-scroll snap-y snap-mandatory">
            <section
                className="
                    relative min-h-screen
                    flex flex-col items-center justify-center
                    text-center text-white snap-start 
                "
            >
                <div
                    className="pointer-events-none absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('src/assets/logo.png')"}}
                />
                <div className="absolute inset-0 bg-black/40"/>
                <div className="relative z-10 flex flex-col items-center">
                    <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold mb-14">
                        The New Era Of Infinite AI
                    </h1>
                    <Link
                        to="/about"
                        className="group inline-flex items-center text-white text-lg font-medium mb-12 cursor-pointer
                        px-4 py-2 rounded-full transition hover:bg-white/20">
                            <span className="mr-3 transition group-hover:opacity-80">우리의 비전에 대해 알아보기</span>
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
                        className="
                            
                            text-white/80 text-xl animate-bounce
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
                    <p className="text-3xl sm:text-3xl lg:text-4xl font-semibold mb-16 leading-snug">
                        정보의 잠재력을 드러내고<br/> 비즈니스에 최적화된 AI를 제공합니다.
                    </p>
                    <div className="grid gap-16 md:grid-cols-2">
                        <article
                            ref={useScrollAnimation()}
                            className="fade-up border border-gray-300 rounded-2xl px-10 py-14 flex flex-col shadow-sm">
                            <div className="mb-10">
                                {/* <img src="..." alt="Ceep" className="w-full h-auto object-cover" /> */}
                                <div className="w-full h-72 bg-gray-200 rounded-xl"/>
                            </div>
                            <p className="text-xl leading-relaxed text-gray-700 mb-10">
                                흩어진 문서를 자동으로 분석해 명확한 구조로 정리해줍니다.
                                <br />
                                Ceep을 통해 복잡한 자료 관리 없이 필요한 순간 즉시 활용할 수 있는
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
                            {/* 이미지 자리 */}
                            <div className="mb-10">
                                {/* <img src="..." alt="Custom AI" className="w-full h-auto object-cover" /> */}
                                <div className="w-full h-72 bg-gray-200 rounded-xl"  />
                            </div>
                            <p className="text-xl leading-relaxed text-gray-700 mb-10">
                                기업의 고유한 문제를 분석해 목적에 맞는 AI 솔루션을 설계·구현합니다.
                                <br />
                                Custom AI를 통해 복잡한 업무를 자동화하고, 실제 현장에서 바로 적용
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
                    <p className="text-3xl sm:text-3xl lg:text-4xl font-semibold mb-16 leading-snug">
                        AI와 정보 혁신을 통해<br/>기업의 운영 방식과 미래 경쟁력을<br className="md:hidden"/> 재정의하고 있습니다.
                    </p>
                    <div className="grid gap-12 lg:gap-16 md:grid-cols-3">
                        <article
                            ref={useScrollAnimation()}
                            className="fade-up flex flex-col items-center text-center">
                            <div className="w-full h-52 sm:h-60 bg-gray-200 rounded-lg mb-8">
                                {/* <img src="..." alt="뉴스 썸네일" className="w-full h-full object-cover rounded-lg" /> */}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold mb-4"> 
                                기사 제목
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2 text-base sm:text-lg text-primary">
                                <span>#해시태그</span>
                                <span>#테크</span>
                                <span>#인공지능</span>
                            </div>   
                        </article>
                        <article
                            ref={useScrollAnimation()}
                            className="fade-up flex flex-col items-center text-center">
                            <div className="w-full h-52 sm:h-60 bg-gray-200 rounded-lg mb-8">
                                {/* <img src="..." alt="뉴스 썸네일" className="w-full h-full object-cover rounded-lg" /> */}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold mb-4"> 
                                기사 제목
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2 text-base sm:text-lg text-primary">
                                <span>#해시태그</span>
                                <span>#테크</span>
                                <span>#인공지능</span>
                            </div>   
                        </article>
                        <article
                            ref={useScrollAnimation()}
                            className="fade-up flex flex-col items-center text-center">
                            <div className="w-full h-52 sm:h-60 bg-gray-200 rounded-lg mb-8">
                                {/* <img src="..." alt="뉴스 썸네일" className="w-full h-full object-cover rounded-lg" /> */}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold mb-4"> 
                                기사 제목
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2 text-base sm:text-lg text-primary">
                                <span>#해시태그</span>
                                <span>#테크</span>
                                <span>#인공지능</span>
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
        w-full              /* 화면 너비 전체 사용 */
        min-h-screen        /* 화면 높이 전체 사용 */
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
                Amuse8와 함께 미래의 서비스를 만들어보세요.
            </p>
            <a
            href="mailto:supports@amuse8.kr"
            className="
                group
                mt-6
                inline-flex items-center
                px-6 py-2.5
                rounded-full
                bg-gray-900 text-white text-base
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