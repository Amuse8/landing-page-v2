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

function upsertLink(
    selector: string,
    create: () => HTMLLinkElement,
    attrs: Record<string, string>
) {
    let link = document.head.querySelector<HTMLLinkElement>(selector);

    if (!link) {
        link = create();
        document.head.appendChild(link);
    }

    Object.entries(attrs).forEach(([k, v]) => {
        link!.setAttribute(k, v);
    });
}

function buildIconSelector(rel: string, item: IconLink) {
    const parts: string[] = [`link[rel="${rel}"]`];

    if (item.sizes) parts.push(`[sizes="${item.sizes}"]`);

    if (item.type) parts.push(`[type="${item.type}"]`);

    return parts.join("");
}

export default function useFavicon(set: FaviconSet) {
    useEffect(() => {
        const icons = set.icons ?? [];
        const appleIcons = set.appleTouchIcons ?? [];

        icons.forEach((item) => {
            const selector = buildIconSelector("icon", item);

            upsertLink(
                selector,
                () => {
                    const link = document.createElement("link");
                    link.rel = "icon";
                    return link;
                },
                {
                    href: item.href,
                    ...(item.type ? { type: item.type } : {}),
                    ...(item.sizes ? { sizes: item.sizes } : {}),
                }
            );
        });

        appleIcons.forEach((item) => {
            const selector = buildIconSelector("apple-touch-icon", item);

            upsertLink(
                selector,
                () => {
                    const link = document.createElement("link");
                    link.rel = "apple-touch-icon";
                    return link;
                },
                {
                    href: item.href,
                    ...(item.sizes ? { sizes: item.sizes } : {}),
                }
            );
        });
    }, [set]);
}