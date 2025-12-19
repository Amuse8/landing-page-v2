import Header from "./Header";
import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import useFavicon, { type FaviconSet } from "../hooks/useFavicon";

type LayoutProps = { children: ReactNode };

const ICON_V = "2025-12-19";

const Layout = ({ children }: LayoutProps) => {
    const { pathname } = useLocation();
    const isCeep = pathname.startsWith("/ceep-ai");

    const amuse8FaviconSet: FaviconSet = {
        icons: [
            { href: `/amuse8-favicon-32x32.png?v=${ICON_V}`, type: "image/png", sizes: "32x32" },
            { href: `/amuse8-favicon-16x16.png?v=${ICON_V}`, type: "image/png", sizes: "16x16" },
        ],
        appleTouchIcons: [
            { href: `/amuse8-apple-touch-icon.png?v=${ICON_V}`, sizes: "180x180" },
        ],
    };

    const ceepFaviconSet: FaviconSet = {
        icons: [
            { href: `/ceep-favicon-32x32.png?v=${ICON_V}`, type: "image/png", sizes: "32x32" },
            { href: `/ceep-favicon-16x16.png?v=${ICON_V}`, type: "image/png", sizes: "16x16" },
        ],
        appleTouchIcons: [
            { href: `/ceep-apple-touch-icon.png?v=${ICON_V}`, sizes: "180x180" },
        ],
    };

    useFavicon(isCeep ? ceepFaviconSet : amuse8FaviconSet);

    return (
        <div className="app">
            <Header />
            <main className="page-container">{children}</main>
        </div>
    );
};

export default Layout;