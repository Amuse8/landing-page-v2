import { useRef } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

const ServicesPage = () => {
    const nextSectionRef = useRef<HTMLDivElement | null>(null);

    const handleScrollDown = () => {
        nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
            <section
                className="relative min-h-screen
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
                        자료 관리의 시작과 끝
                    </h1>
                    <p className="group inline-flex items-center text-white text-lg font-medium mb-12
                        px-4 py-2 rounded-full">
                            <span className="mr-3">Ceep으로 모든 걸 간편하게.</span>
                            
                    </p>
                    <button
                        onClick={handleScrollDown}
                        className="
                            
                            text-white/80 text-base animate-bounce uppercase
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
                    <p className="text-center text-xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-snug">
                        정보 과잉 시대, <br/> 당신의 디지털 기억력은 안녕하신가요?
                    </p>
                    <p className="text-center text-xs sm:text-sm lg:text-base font-medium mb-16 leading-snug">
                        하루 평균 100개 이상의 알림, 수십 개의 탭, 끝없는 스크롤 속에서 <br className="sm:hidden"/>정작 중요한 것은 기억나지 않습니다.
                    </p>
                    <div className="grid gap-8 md:gap-12 md:grid-cols-3 mt-16">
                        <article
                            ref={useScrollAnimation()}
                            className="fade-up bg-white rounded-2xl px-10 py-12 flex flex-col items-center text-center shadow-md"
                        >
                            <p className="text-5xl font-bold text-blue-600 mb-4">82%</p>
                            <p className="text-lg font-semibold text-gray-700">
                                직장인이 정보 과잉을 경험
                            </p>
                        </article>
                        <article
                            ref={useScrollAnimation()}
                            className="fade-up bg-white rounded-2xl px-10 py-12 flex flex-col items-center text-center shadow-md"
                        >
                            <p className="text-5xl font-bold text-blue-600 mb-4">4.5시간</p>
                            <p className="text-lg font-semibold text-gray-700">
                                하루 평균 정보 수집 시간
                            </p>
                        </article>
                        <article
                            ref={useScrollAnimation()}
                            className="fade-up bg-white rounded-2xl px-10 py-12 flex flex-col items-center text-center shadow-md"
                        >
                            <p className="text-5xl font-bold text-blue-600 mb-4">63%</p>
                            <p className="text-lg font-semibold text-gray-700">
                                수집한 정보를 잊어버림
                            </p>
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
                        <div className="bg-blue-50 rounded-3xl py-10 px-6 mb-20 text-center">
                            <p className="text-2xl sm:text-4xl font-bold mb-6">
                                이러한 문제는 <br className="sm:hidden"/>기업에서 더욱 심각합니다
                            </p>
                            <p className="font-semibold text-base sm:text-xl text-gray-700 leading-relaxed">
                                직장인 <span className="font-bold text-red-500">72.6%</span>가 업무 자료 관리에<br className="sm:hidden"/> 어려움을 겪고 있으며
                            </p>
                            <p className="font-semibold text-base sm:text-xl text-gray-700 leading-relaxed">
                                관리되지 않은 수많은 자료로 인해 <span className="font-bold text-red-500"><br className="sm:hidden"/>35.8%</span>의 업무 효율이 저하되고 있습니다
                            </p>
                        </div>
                        <p className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-16 leading-snug">
                            비효율적 자료 관리가 가져오는 손실
                        </p>
                        <div className="grid gap-12 lg:gap-16 md:grid-cols-3">
                            <article
                                ref={useScrollAnimation()}
                                className="fade-up flex flex-col items-center text-center"
                            >
                                <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden shadow-lg">
                                    {/* 이미지 영역 */}
                                    <div className="absolute inset-0 bg-gray-200">
                                        {/* 실제 이미지 사용할 때 이 부분만 교체 */}
                                        {/* <img
                                            src="..."
                                            alt="뉴스 썸네일"
                                            className="w-full h-full object-cover"
                                        /> */}
                                    </div>

                                    <div className="absolute inset-0 bg-black/40" />

                                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
                                        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                                            시간적 손실
                                        </h3>
                                        <p className="text-white font-semibold">주 평균 <span className="font-extrabold text-red-300">18시간 이상</span> 낭비</p>
                                    </div>
                                </div>
                            </article>
                            <article
                                ref={useScrollAnimation()}
                                className="fade-up flex flex-col items-center text-center"
                            >
                                <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden shadow-lg">
                                    {/* 이미지 영역 */}
                                    <div className="absolute inset-0 bg-gray-200">
                                        {/* 실제 이미지 사용할 때 이 부분만 교체 */}
                                        {/* <img
                                            src="..."
                                            alt="뉴스 썸네일"
                                            className="w-full h-full object-cover"
                                        /> */}
                                    </div>

                                    <div className="absolute inset-0 bg-black/40" />

                                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
                                        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                                            생산성 손실
                                        </h3>
                                        <p className="text-white font-semibold">업무 생산성 <span className="font-extrabold text-red-300">20%</span>감소</p>
                                    </div>
                                </div>
                            </article>
                            <article
                                ref={useScrollAnimation()}
                                className="fade-up flex flex-col items-center text-center"
                            >
                                <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden shadow-lg">
                                    {/* 이미지 영역 */}
                                    <div className="absolute inset-0 bg-gray-200">
                                        {/* 실제 이미지 사용할 때 이 부분만 교체 */}
                                        {/* <img
                                            src="..."
                                            alt="뉴스 썸네일"
                                            className="w-full h-full object-cover"
                                        /> */}
                                    </div>

                                    <div className="absolute inset-0 bg-black/40" />

                                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
                                        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                                            비용적 손실
                                        </h3>
                                        <p className="text-white font-semibold">연간 약 <span className="font-extrabold text-red-300">3천만원</span> 낭비</p>
                                    </div>
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
                <div className="w-full flex items-start justify-center px-4 sm:px-10 lg:px-16">
                    <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center 
                        pt-20 sm:pt-24 lg:pt-36
                        pb-20                    
                    ">
                        <p className="text-lg sm:text-xl font-semibold text-blue-600 mb-6">
                            복잡한 자료 3초만에 정리 끝!
                        </p>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-14 leading-snug">
                            가장 스마트한 <br/>
                            <span className="text-blue-600">AI API Ceep</span>
                        </h2>

                        <div className="space-y-6 sm:space-y-8 mb-20">
                            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
                                <span className="tag-chip tag-float-1">#자동 라벨링</span>
                                <span className="tag-chip tag-float-2">#자동 분류</span>
                                <span className="tag-chip tag-float-3">#자동 정리</span>
                                <span className="tag-chip tag-float-4">#문서 분석</span>
                                <span className="tag-chip tag-float-5">#태그 요약</span>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
                                <span className="tag-chip tag-float-6">#유사 정보 통합</span>
                                <span className="tag-chip tag-float-7">#부분 스크랩</span>
                                <span className="tag-chip tag-float-8">#빠른 검색</span>
                                <span className="tag-chip tag-float-9">#키워드 추출</span>
                            </div>
                        </div>

                        <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 leading-relaxed">
                            AI가 자동으로 분류하고 정리하여 <br />
                            필요한 정보를 더 쉽게 찾을 수 있습니다
                        </p>
                    </div>
                </div>
            </section>
            <section
                className="
                    bg-white text-gray-900
                    snap-start
                    w-full
                    min-h-screen
                    flex items-center      
                    justify-center
                    px-4 sm:px-10 lg:px-16
                    py-24 sm:py-32
                "
            >
                <div className="w-full max-w-6xl grid gap-10 lg:gap-16 lg:grid-cols-2 items-center">
                    {/* 왼쪽 영역: 모니터 / 버튼 UI 넣을 자리 */}
                    <div className="flex justify-center">
                        <div
                            className="
                                w-full max-w-md
                                rounded-3xl shadow-xl bg-white
                                overflow-hidden
                            "
                        >
                            {/* 예시
                            <img
                                src="src/assets/drag-once.png"
                                alt="Ceep 드래그 정리 데모"
                                className="w-full h-auto object-contain"
                            />
                            */}
                        </div>
                    </div>

                    <div
                        ref={useScrollAnimation()}
                        className="fade-up text-center lg:text-left"
                    >
                        <h2 className="text-3xl text-right sm:text-4xl md:text-5xl font-extrabold mb-6 leading-snug">
                            한번의 드래그로 <br className="hidden sm:block" />
                            한번에 정리
                        </h2>
                        <p className="text-base font-semibold text-right sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                            AI가 문서를 분석하고, 적합한 카테고리로 정리합니다. <br className="hidden sm:block" />
                            더 효율적인 작업 환경을 경험해보세요.
                        </p>
                    </div>
                </div>
            </section>
            <section
                className="
                    bg-slate-50 text-gray-900
                    snap-start
                    w-full
                    flex justify-center
                    px-4 sm:px-10 lg:px-16
                    py-24 sm:py-32
                "
            >
                <div className="w-full max-w-6xl">
                    <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12 sm:mb-16 leading-snug">
                        업무 효율을 높이는 똑똑한 솔루션
                    </h2>

                    <div className="grid gap-8 mb-20">
                        <article
                            ref={useScrollAnimation()}
                            className="
                                fade-up
                                bg-white rounded-3xl shadow-xl
                                px-10 sm:px-14 py-12 sm:py-16
                                flex items-start gap-8
                                max-w-4xl mx-auto
                                border border-gray-100
                            "
                        >
                            <div
                                className="
                                    flex items-center justify-center
                                    w-16 h-16 sm:w-20 sm:h-20
                                    rounded-3xl bg-blue-100 text-blue-600
                                    text-3xl sm:text-4xl shrink-0
                                "
                            >
                                📦
                            </div>

                            <div className="text-left flex-1">
                                <h3 className="text-2xl sm:text-3xl font-extrabold mb-6 text-gray-900">
                                    B2B
                                </h3>

                                <ul className="space-y-3 text-base font-semibold sm:text-lg text-gray-700 leading-relaxed">
                                    <li className="flex items-center gap-3">
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        <span>업무 효율 극대화</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        <span>시간 및 비용 절감</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        <span>SaaS 관리 간소화 및 다중 결제 문제 해결</span>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </div>

                    <div className="grid gap-6 lg:gap-10 lg:grid-cols-2">
                        <article
                            ref={useScrollAnimation()}
                            className="
                                fade-up
                                bg-white rounded-3xl shadow-md
                                px-6 sm:px-10 py-8 sm:py-10
                                flex flex-col justify-between
                            "
                        >
                            <p className="text-base sm:text-lg font-semibold text-gray-500 mb-6">
                                기술력 기반의 확실한 성과
                            </p>
                            <div className="flex items-center justify-between gap-6">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-1">기존</p>
                                    <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                                        24시간
                                    </p>
                                </div>
                                <span className="text-2xl sm:text-3xl text-gray-800">→</span>
                                <div className="text-right">
                                    <p className="text-xs sm:text-sm text-black mb-1">서비스 도입</p>
                                    <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                                        약 20분
                                    </p>
                                </div>
                            </div>
                        </article>

                        <article
                            ref={useScrollAnimation()}
                            className="
                                fade-up
                                bg-white rounded-3xl shadow-md
                                px-6 sm:px-10 py-8 sm:py-10
                                flex flex-col justify-between
                            "
                        >
                            <p className="text-base sm:text-lg font-semibold text-gray-500 mb-6">
                                인건비 감소 또는 대체
                            </p>
                            <div className="flex items-center justify-between gap-6">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-1">기존</p>
                                    <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                                        팀 단위
                                    </p>
                                </div>
                                <span className="text-2xl sm:text-3xl text-gray-800">→</span>
                                <div className="text-right">
                                    <p className="text-xs sm:text-sm text-black mb-1">서비스 도입</p>
                                    <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                                        1명
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <section
                className="
                    bg-white text-gray-900
                    snap-start
                    w-full
                    flex justify-center
                    px-4 sm:px-10 lg:px-16
                    py-12 sm:py-16
                "
            >
                <div className="w-full max-w-4xl flex flex-col items-center text-center">
                    
                    <div className="mb-6 flex items-center justify-center">
                        <svg
                            viewBox="0 0 24 24"
                            className="w-20 h-20 sm:w-24 sm:h-24 text-blue-500"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 3L6 5V11C6 14.866 8.686 18.299 12 19C15.314 18.299 18 14.866 18 11V5L12 3Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <p className="text-base sm:text-xl md:text-2xl font-medium text-gray-900 mb-3 leading-snug">
                        자사는 사용자의 데이터 소유권을 <br className="sm:hidden"/><span className="font-extrabold">절대</span> 주장하지 않습니다.
                    </p>

                    <p className="text-sm sm:text-base md:text-lg text-gray-900 leading-relaxed">
                        <span className="font-extrabold">Ceep</span>은 사용자의 데이터를 <br className="sm:hidden"/> AI 기능 개선을 위한 용도로만 활용하며, <br className="sm:hidden"/>
                        다른 목적으로 이를 활용하지 않습니다.
                    </p>
                </div>
            </section>
        </div>
    )
}
export default ServicesPage;