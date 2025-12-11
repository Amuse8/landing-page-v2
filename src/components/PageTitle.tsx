import { useEffect } from "react"

const PageTitle = ({ title }: { title: string }) => {
    useEffect(() => {
        const prev = document.title;
        document.title = title;

        return () => {
            document.title = prev;
        };
    }, [title]);

    return null;
};

export default PageTitle;