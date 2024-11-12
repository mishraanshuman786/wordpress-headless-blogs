// components/CodeBlock.tsx

"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={prism}
      showLineNumbers
      wrapLines
      customStyle={{
        borderRadius: "8px",
        padding: "1em",
        fontSize: "0.9em",
      }}
    >
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
