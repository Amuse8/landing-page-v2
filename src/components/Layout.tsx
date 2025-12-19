import Header from "./Header";
import { type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import useFavicon, { type FaviconSet } from "../hooks/useFavicon";

type LayoutProps = { children: ReactNode };

const Layout = ({ children }: LayoutProps) => {
    const { pathname } = useLocation();
    const isCeep = pathname.startsWith("/ceep-ai");

    const amuse8FaviconSet: FaviconSet = {
        icons: [
            { href: "/amuse8-favicon.svg", type: "image/svg+xml" },
            { href: "/amuse8-favicon-32x32.png", type: "image/png", sizes: "32x90" },
            { href: "/amuse8-favicon-16x16.png", type: "image/png", sizes: "16x45" },
        ],
        appleTouchIcons: [
            { href: "/amuse8-apple-touch-icon.png", sizes: "180x508" },
        ],
    };

    const ceepFaviconSet: FaviconSet = {
        icons: [
            { href: "/ceep-favicon.svg", type: "image/svg+xml" },
            { href: "/ceep-favicon-32x32.png", type: "image/png", sizes: "32x33" },
            { href: "/ceep-favicon-16x16.png", type: "image/png", sizes: "16x16" },
        ],
        appleTouchIcons: [
            { href: "/ceep-apple-touch-icon.png", sizes: "180x186" },
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