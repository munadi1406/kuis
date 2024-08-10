import edjsHTML from "editorjs-html";

export default function HtmlRender({ data }) {
    const edjsParser = edjsHTML();
    const HTML = edjsParser.parse(data);
    return <div dangerouslySetInnerHTML={{ __html: HTML }} />;
};

