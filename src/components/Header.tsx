import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import Logo from "@/assets/logo.png";

const NAV = [
    { label: "회사소개", href: "/about" },
    { label: "서비스", href: "/services" },
    { label: "Custom AI", href: "/custom-ai"},
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const isActive = (href: string) => 
        location.pathname === href || (href !== "/" && location.pathname.startsWith(href));

    return (
        <header
      className="
        fixed top-0 left-0 w-full
        z-50
        flex items-center justify-between
        px-4 sm:px-8 py-3
      "
    >
            <Link to="/" className="flex items-center gap-2">
                <img src={Logo} alt="회사 로고" className="h-8 w-auto" />
            </Link>
            <nav className="hidden md:flex flex-row gap-6 text-base">
                {NAV.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        className={clsx(
                            "relative pb-1 hover:text-primary transition-opacity text-gray-600",
                            
                        )}
                        aria-current={isActive(item.href) ? "page" : undefined}
                    >
                        {item.label}
                    </NavLink>
                ))}
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
                        <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                )
            }
            </button>
            <div
                id="mobile-menu"
                className={clsx(
                "md:hidden absolute left-0 right-0 top-[60px] mx-5 overflow-hidden rounded-lg bg-white shadow-md transition-[max-height,opacity] duration-300 ease-out border border-gray-100",
                open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <nav className="flex flex-col gap-4 px-5 py-4 text-base">
                {NAV.map((item) => (
                    <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                        "text-left py-1 hover:text-primary"
                    )}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    >
                    {item.label}
                    </NavLink>
                ))}
                </nav>
            </div>
        </header>
    )

    
};

