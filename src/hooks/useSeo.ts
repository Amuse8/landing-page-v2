import { useEffect } from "react";

export type JsonLdValue =
    | string
    | number
    | boolean
    | null
    | JsonLdObject
    | JsonLdValue[];

    export type JsonLdObject = {
    [key: string]: JsonLdValue;
    };

    export type OrganizationJsonLd = {
    "@context": "https://schema.org";
    "@type": "Organization";
    name: string;
    url: string;
    logo?: string;
    sameAs?: string[];
    } & JsonLdObject;

    type SeoOptions = {
    title: string;
    description: string;
    canonicalPath?: `/${string}`;
    jsonLd?: JsonLdObject;
    };

    const SITE_URL = "https://amuse8.kr";

    function upsertMeta(name: string, content: string) {
    let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
    }

    function upsertLink(rel: string, href: string) {
    let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
    }

    function upsertJsonLd(id: string, data: JsonLdObject) {
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
        el = document.createElement("script");
        el.type = "application/ld+json";
        el.id = id;
        document.head.appendChild(el);
    }
    el.text = JSON.stringify(data);
    }

    export function useSeo({ title, description, canonicalPath, jsonLd }: SeoOptions) {
    useEffect(() => {
        document.title = title;
        upsertMeta("description", description);

        if (canonicalPath) {
        upsertLink("canonical", `${SITE_URL}${canonicalPath}`);
        }

        if (jsonLd) {
        upsertJsonLd("ld-org", jsonLd);
        }
    }, [title, description, canonicalPath, jsonLd]);
}
