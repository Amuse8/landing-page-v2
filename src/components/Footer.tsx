import logo from "@/assets/logo-black.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { footerContent, getLanguage } from "../localizedContent";

const Footer = () => {
    const { i18n } = useTranslation();
    const content = footerContent[getLanguage(i18n.language)];

    return (
        <footer className="w-full bg-[#F3F4F6] text-gray-600">
            <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-6 text-xs sm:text-sm md:text-base">
                <div className="flex flex-wrap items-center gap-2 text-gray-700">
                    <Link
                        to="/terms"
                        className="hover:underline underline-offset-4 font-medium"
                    >
                        {content.terms}
                    </Link>
                    <div className="h-4 w-px bg-gray-400" />
                    <Link
                        to="/privacy"
                        className="hover:underline underline-offset-4 font-medium"
                    >
                        {content.privacy}
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <div className="font-semibold text-gray-600 text-sm sm:text-base md:text-lg">
                        Amuse8 Company
                    </div>
                    <div className="h-4 w-px bg-gray-400" />
                    <div className="text-gray-800 text-xs sm:text-sm md:text-base">
                        {content.ceo}
                    </div>
                </div>
                <div className="space-y-1 leading-relaxed text-gray-800 text-xs sm:text-sm md:text-base">
                    <p>{content.businessNumber}</p>
                    <p>{content.email}</p>
                    <p>{content.address}</p>
                </div>
                <div className="pt-4 border-t border-gray-300 flex flex-col items-start gap-2">
                    <img
                        src={logo}
                        alt="Amuse8 Logo"
                        className="h-6 w-auto opacity-80"
                    />
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-700">
                        Copyright © {new Date().getFullYear()} Amuse8 Inc. {content.copyright}
                    </p>

                </div>
            </div>
        </footer>
    )
}
export default Footer;
