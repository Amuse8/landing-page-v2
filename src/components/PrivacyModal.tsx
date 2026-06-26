import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLanguage, privacyModalContent } from "../localizedContent";

export default function PrivacyModal({
    open,
    onClose,
    }: {
    open: boolean;
    onClose: () => void;
	    }) {
	    const { i18n } = useTranslation();
	    const content = privacyModalContent[getLanguage(i18n.language)];

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
        <button
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
	            aria-label={content.close}
        />

        <div className="absolute left-1/2 top-1/2 w-[min(720px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
	            <h2 className="text-lg font-semibold">{content.title}</h2>
            <button
                onClick={onClose}
                className="rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
            >
	                {content.close}
            </button>
            </div>

            <div className="max-h-[70vh] overflow-auto px-6 py-5 text-sm leading-6 text-gray-700">
	            <div className="space-y-6">
	                {content.sections.map(([title, body, items], index) => (
	                    <section key={title} className="space-y-2">
	                        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
	                        <p>{body}</p>
	                        {items.length > 0 && (
	                            <ul className="list-disc pl-5 space-y-1">
	                                {items.map((item) => <li key={item}>{item}</li>)}
	                            </ul>
	                        )}
	                        {index < content.sections.length - 1 && <hr className="border-gray-200 mt-6" />}
	                    </section>
	                ))}
	            </div>
            </div>
        </div>
        </div>
    );
}
