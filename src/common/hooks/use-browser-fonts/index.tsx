// React
import { useEffect, useState } from "react";

const useBrowserFonts = () => {

    const [fonts, setFonts] = useState<string[]>([]);

    useEffect(() => {
        const fontList = document.fonts;

        const fontFamilies = Array.from(fontList).map(
            (font) => font.family
        );

        const fontFaceList = [...new Set(fontFamilies)]

        setFonts(fontFaceList);
    }, []);

    return {
        fonts
    };
};

export { useBrowserFonts };

export default useBrowserFonts;