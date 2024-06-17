// React
import { FC, useEffect, useRef } from "react";

type OwnProps = {
    html: string;
    css: string;
    js: string;
}

const AcePreview: FC<OwnProps> = ({
    html = '',
    css = '',
    js = '',
}) => {

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        iframeRender(html, css, js);
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            iframeRender(html, css, js);
        }
    }, [html, css, js]);

    const iframeRender = (html: string, css: string, js: string) => {

        while (containerRef.current.hasChildNodes()) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }

        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '200px';

        containerRef.current.appendChild(iframe);

        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;

        iframe.contentDocument.head.appendChild(style);

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = js;

        iframe.contentDocument.head.appendChild(script);
        iframe.contentDocument.body.innerHTML = html;
    };

    return (
        <div
            ref={containerRef}
            id="code-preview"
            style={{ width: '100%', height: 200 }}
        />
    );
}

export { AcePreview };

export default AcePreview;
