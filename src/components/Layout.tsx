import Header from "./Header";
import Footer from "./Footer";
import { type ReactNode } from "react";

type LayoutProps = { children: ReactNode };

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="app">
        <Header />
        <main className="page-container">{children}</main>
        <Footer />
        </div>
    );
};

export default Layout;