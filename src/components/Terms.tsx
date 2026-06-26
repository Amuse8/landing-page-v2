import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLanguage, legalContent } from "../localizedContent";

const Terms = () => {
    const { i18n } = useTranslation();
    const content = legalContent[getLanguage(i18n.language)];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                <h1 className="text-2xl mt-6 sm:text-3xl font-bold mb-6 sm:mb-8 leading-tight">
                    {content.termsTitle}
                </h1>
                <div className="bg-white rounded-lg shadow-sm p-5 sm:p-8 space-y-6 break-words">
                    {content.termsSections.map(([title, body]) => (
                        <section key={title}>
                            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                                {title}
                            </h2>
                            <p className="leading-relaxed text-gray-800">
                                {body}
                            </p>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Terms;
