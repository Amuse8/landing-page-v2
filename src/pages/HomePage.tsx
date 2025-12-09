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
                        AI와 정보 혁신을 통해 기업의 운영 방식과 미래 경쟁력을 재정의하고 있습니다.
                    </p>
                    
                    </div>
            </section>
        </div>
    )
}
export default HomePage;