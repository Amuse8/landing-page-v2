import Header from "./Header";
import { useMemo, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import useFavicon, { type FaviconSet } from "../hooks/useFavicon";

type LayoutProps = { children: ReactNode };

const ICON_V = "2025-12-19";

const Layout = ({ children }: LayoutProps) => {
    const { pathname } = useLocation();
    const isBlokitAI = pathname.startsWith("/blokit-ai");

    const amuse8FaviconSet = useMemo<FaviconSet>(() => ({
        icons: [
            { href: `/amuse8-favicon-32x32.png?v=${ICON_V}`, type: "image/png", sizes: "32x32" },
            { href: `/amuse8-favicon-16x16.png?v=${ICON_V}`, type: "image/png", sizes: "16x16" },
        ],
        appleTouchIcons: [
            { href: `/amuse8-apple-touch-icon.png?v=${ICON_V}`, sizes: "180x180" },
        ],
    }), []);
        
    const blokitFaviconSet = useMemo<FaviconSet>(() => ({
        icons: [
            { href: `/blokit-favicon-32x32.png?v=${ICON_V}`, type: "image/png", sizes: "32x32" },
            { href: `/blokit-favicon-16x16.png?v=${ICON_V}`, type: "image/png", sizes: "16x16" },
        ],
        appleTouchIcons: [
            { href: `/blokit-apple-touch-icon.png?v=${ICON_V}`, sizes: "180x180" },
        ],
    }), []);

    useFavicon(isBlokitAI ? blokitFaviconSet : amuse8FaviconSet);

    return (
        <div className="app">
            <Header />
            <main className="page-container">{children}</main>
        </div>
    );
};

export default Layout;
