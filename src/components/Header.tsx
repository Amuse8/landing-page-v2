import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import logo from "@/assets/logo-black.svg";
import logoWhite from "@/assets/logo-white.svg";

const NAV = [
    { label: "Amuse8", href: "/about" },
    { label: "Ceep AI", href: "/ceep-ai" },
    { label: "Custom AI", href: "/custom-ai" },
    {
        label: "WallWall AI",
        href: "https://wallwall.amuse8.kr/",
        external: true,
    }
] as const;

export default function Header() {
    const [open, setOpen] = useState(false);
    const [isHeroVisible, setIsHeroVisible] = useState<boolean>(true);

    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (href: string) =>
        location.pathname === href || (href !== "/" && location.pathname.startsWith(href));

    const isHome = location.pathname === "/";
    const isCeepAI = location.pathname.startsWith("/ceep-ai");
    const isCustomAI = location.pathname.startsWith("/custom-ai");
    const isAbout = location.pathname.startsWith("/about");

    const isTransparent = (isHome || isCeepAI || isCustomAI || isAbout) && isHeroVisible && !open;

    const showDivider = isHeroVisible;

    useEffect(() => {
        const handleHeroVisibility = (event: Event) => {
            const customEvent = event as CustomEvent<boolean>;
            if (typeof customEvent.detail === "boolean") {
                setIsHeroVisible(customEvent.detail);
            }
        };

        window.addEventListener("hero-visibility", handleHeroVisibility);
        return () => {
            window.removeEventListener("hero-visibility", handleHeroVisibility);
        };
    }, []);

    const scrollToTop = () => {
        const homeRoot = document.getElementById("home-scroll-root");

        if (homeRoot) {
            const canScroll = homeRoot.scrollHeight > homeRoot.clientHeight;
            if (canScroll) {
                homeRoot.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
        }

        const scrollingEl = document.scrollingElement;
        if (scrollingEl) scrollingEl.scrollTo({ top: 0, behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleLogoClick = () => {
        if (open) setOpen(false);

        if (location.pathname === "/") {
            requestAnimationFrame(() => scrollToTop());
            return;
        }

        navigate("/");
    };

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 py-3 transition-colors duration-300",
                isTransparent ? "bg-transparent text-white" : "bg-white text-gray-900 shadow"
            )}
        >
            <button 
                type="button"
                onClick={handleLogoClick}
                className="flex items-center gap-2"
                aria-label="홈으로 이동"
            >
                <img
                    src={isTransparent ? logoWhite : logo}
                    alt="Amuse8"
                    className="h-8 w-auto transition-all duration-300"
                />
            </button>

            <nav className="hidden md:flex flex-row gap-6 text-base">
                {NAV.map((item, idx) =>
                    "external" in item && item.external ? (
                        <a
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${item.label} (새 탭에서 열림)`}
                            className={clsx(
                                "group relative pb-1 transition-opacity flex items-center",
                                showDivider && 
                                    idx !== NAV.length - 1 &&
                                    "after:content-['|'] after:absolute after:-right-4 after:top-1/2 after:-translate-y-1/2 after:transition-opacity after:duration-300",
                                isTransparent
                                    ? "text-white/80 hover:text-white after:text-white/40"
                                    : "text-gray-600 hover:text-primary after:text-gray-300"
                            )}
                        >
                            <span>{item.label}</span>
                            <span
                                aria-hidden="true"
                                className="ml-1 inline-block text-[0.75em] opacity-70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100"
                            >
                                ↗
                            </span>
                            <span className="sr-only">새 탭에서 열림</span>
                        </a>
                    ) : (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            className={clsx(
                                "relative pb-1 transition-opacity",
                                showDivider &&
                                    idx !== NAV.length - 1 &&
                                    "after:content-['|'] after:absolute after:-right-4 after:top-1/2 after:-translate-y-1/2 after:transition-opacity after:duration-300",
                                isTransparent
                                    ? isActive(item.href)
                                        ? "text-white font-semibold after:text-white/40"
                                        : "text-white/80 hover:text-white after:text-white/40"
                                    : isActive(item.href)
                                        ? "text-primary font-medium after:text-gray-300"
                                        : "text-gray-600 hover:text-primary after:text-gray-300"
                            )}
                            aria-current={isActive(item.href) ? "page" : undefined}
                        >
                            {item.label}
                        </NavLink>
                    )
                )}
            </nav>
            <button
                type="button"
                aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className="flex flex-row items-center justify-center w-8 h-8 md:w-10 md:h-10 md:hidden"
            >
                {open ? (
                    <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                    </svg>
                ) : (
                    <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>
            <div
                id="mobile-menu"
                className={clsx(
                    "md:hidden absolute left-0 right-0 top-[60px] mx-5 overflow-hidden rounded-lg bg-white shadow-md transition-[max-height,opacity] duration-300 ease-out border border-gray-100",
                    open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <nav className="flex flex-col gap-4 px-5 py-4 text-base">
                    {NAV.map((item) =>
                        "external" in item && item.external ? (
                            <a
                                key={item.href}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${item.label} (새 탭에서 열림)`}
                                onClick={() => setOpen(false)}
                                className="group flex items-center text-left py-1 text-gray-900 hover:text-primary transition-colors"
                            >
                                <span>{item.label}</span>
                                <span aria-hidden="true" className="ml-1 text-[0.75em] opacity-70 group-hover:opacity-100">
                                    ↗
                                </span>
                                <span className="sr-only">새 탭에서 열림</span>
                            </a>
                        ) : (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                onClick={() => setOpen(false)}
                                className={clsx(
                                    "text-left py-1 transition-colors",
                                    isActive(item.href)
                                        ? "text-primary font-semibold"
                                        : "text-gray-900 hover:text-primary"
                                )}
                                aria-current={isActive(item.href) ? "page" : undefined}
                            >
                                {item.label}
                            </NavLink>
                        )
                    )}
                </nav>
            </div>
        </header>
    );
}
