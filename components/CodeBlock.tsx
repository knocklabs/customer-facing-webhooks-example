"use client";
import ReactJson from "@microlink/react-json-view";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);

export default function CodeBlock({ code }: { code: string }) {
  const myHtml = hljs.highlight(code, { language: "json" }).value;
  return (
    <div>
      <ReactJson src={JSON.parse(code)} />
    </div>
  );
}
