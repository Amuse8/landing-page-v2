import Header from "./Header";
import Footer from "./Footer";
import { type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import homeIcon from "../assets/amuse-favicon-32x32.png";
import ceepIcon from "../assets/ceep-favicon-32x32.png";
import useFavicon from "../hooks/useFavicon";

type LayoutProps = { children: ReactNode };

const Layout = ({ children }: LayoutProps) => {
    const { pathname } = useLocation();

    let icon = homeIcon;

    if (pathname.startsWith("/services")) {
        icon = ceepIcon;
    }

    useFavicon(icon);

    return (
        <div className="app">
            <Header />
            <main className="page-container">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;