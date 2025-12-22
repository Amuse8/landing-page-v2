import { useEffect } from "react";

export type IconLink = {
    href: string;
    sizes?: string;
    type?: string;
};

export type FaviconSet = {
    icons?: IconLink[];
    appleTouchIcons?: IconLink[];
};

const MARK_ATTR = "data-route-favicon";

export default function useFavicon(set: FaviconSet) {
    useEffect(() => {
        const icons = set.icons ?? [];
        const appleIcons = set.appleTouchIcons ?? [];

        document    
            .querySelectorAll<HTMLLinkElement>(`link[${MARK_ATTR}="1"]`)
            .forEach((el) => el.parentNode?.removeChild(el));
        
            const created: HTMLLinkElement[] = [];

            icons.forEach((item) => {
                const link = document.createElement("link");
                link.rel = "icon";
                link.href = item.href;
                if (item.type) link.type = item.type;
                if (item.sizes) link.sizes = item.sizes;

                link.setAttribute(MARK_ATTR, "1");
                document.head.appendChild(link);
                created.push(link);
            });

            appleIcons.forEach((item) => {
                const link = document.createElement("link");
                link.rel = "apple-touch-icon";
                link.href = item.href;
                if (item.sizes) link.sizes = item.sizes;

                link.setAttribute(MARK_ATTR, "1");
                document.head.appendChild(link);
                created.push(link);
            });

            return () => {
                created.forEach((el) => el.parentNode?.removeChild(el));
            };
    }, [set]);
}