import Logo from "@/assets/logo.svg";

const Footer = () => {
    return (
        <footer className="w-full bg-[#F3F4F6] text-gray-600 mt-16">
            <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-6 text-sm">
                <div className="flex items-center gap-3">
                    <div className="font-semibold text-gray-600">
                        Amuse8 Company
                    </div>
                    <div className="h-4 w-px bg-gray-400" />
                    <div className="text-gray-800">
                        대표 : 신동민
                    </div>
                </div>
                <div className="space-y-1 leading-relaxed text-gray-800">
                    <p>사업자등록번호 : 225-10-15800</p>
                    <p>이메일 : dongmin@amuse8.kr</p>
                    <p>본사 : 서울특별시 중구 퇴계로36길 2, HAI START TOWN 1, B250호</p>
                    <p>지사 : 서울특별시 양천구 목동동로 309 13층</p>
                </div>
                <div className="pt-4 border-t border-gray-300 flex flex-col items-start gap-2">
                    <img
                        src={Logo}
                        alt="Amuse8 Logo"
                        className="h-6 w-auto opacity-80"
                    />
                    <p className="text-xs text-gray-700">
                        Copyright © {new Date().getFullYear()} Amuse8 Inc.All rights reserved
                    </p>

                </div>
            </div>
        </footer>
    )
}
export default Footer;