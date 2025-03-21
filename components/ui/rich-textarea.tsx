"use client";

import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
} from "draft-js";
import React, { useState, useRef } from "react";
import "draft-js/dist/Draft.css";
import { Button } from "./button";

const RichTextEditor = ({ onChange, placeholder, className, style }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const focusEditor = () => {
    if (editor.current) {
      editor.current.focus();
      setIsFocused(true);
    }
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    if (onChange) {
      const contentState = newEditorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      onChange(rawContent);
    }
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const mapKeyToEditorCommand = (e) => getDefaultKeyBinding(e);

  const toggleInlineStyle = (e, style) => {
    e.preventDefault();
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
    setTimeout(focusEditor, 0);
  };

  const toggleBlockType = (e, blockType) => {
    e.preventDefault();
    handleEditorChange(RichUtils.toggleBlockType(editorState, blockType));
    setTimeout(focusEditor, 0);
  };

  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: "monospace",
      padding: "2px 4px",
      borderRadius: "4px",
    },
  };

  const hasInlineStyle = (style) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  };

  const hasBlockType = (blockType) => {
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const block = editorState.getCurrentContent().getBlockForKey(blockKey);
    return block.getType() === blockType;
  };

  return (
    <div className={`rich-text-editor ${className || ""}`} style={style}>
      <div
        className="editor-container border rounded-lg p-3 min-h-[6rem] focus-within:ring-1 relative bg-background text-foreground font-sans border-secondary"
        onClick={focusEditor}
      >
        <div className="toolbar flex flex-wrap gap-1 justify-start mb-2 pb-2 border-b border-secondary">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={`px-2 py-0.5 text-xs rounded-lg border min-w-[28px] min-h-[24px] ${
              hasInlineStyle("BOLD")
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-foreground border-secondary"
            }`}
            onClick={(e) => toggleInlineStyle(e, "BOLD")}
            onMouseDown={(e) => e.preventDefault()}
          >
            B
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={`px-2 py-0.5 text-xs rounded-lg border min-w-[28px] min-h-[24px] ${
              hasInlineStyle("ITALIC")
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-foreground border-secondary"
            }`}
            onClick={(e) => toggleInlineStyle(e, "ITALIC")}
            onMouseDown={(e) => e.preventDefault()}
          >
            I
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={`px-2 py-0.5 text-xs rounded-lg border min-w-[28px] min-h-[24px] ${
              hasInlineStyle("UNDERLINE")
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-foreground border-secondary"
            }`}
            onClick={(e) => toggleInlineStyle(e, "UNDERLINE")}
            onMouseDown={(e) => e.preventDefault()}
          >
            U
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={`px-2 py-0.5 text-xs rounded-lg border min-w-[28px] min-h-[24px] ${
              hasBlockType("unordered-list-item")
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-foreground border-secondary"
            }`}
            onClick={(e) => toggleBlockType(e, "unordered-list-item")}
            onMouseDown={(e) => e.preventDefault()}
          >
            •
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={`px-2 py-0.5 text-xs rounded-lg border min-w-[28px] min-h-[24px] ${
              hasBlockType("ordered-list-item")
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-foreground border-secondary"
            }`}
            onClick={(e) => toggleBlockType(e, "ordered-list-item")}
            onMouseDown={(e) => e.preventDefault()}
          >
            1.
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={`px-2 py-0.5 text-xs rounded-lg border min-w-[28px] min-h-[24px] ${
              hasInlineStyle("CODE")
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-foreground border-secondary"
            }`}
            onClick={(e) => toggleInlineStyle(e, "CODE")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <code>{"</>"}</code>
          </Button>
        </div>

        <div className="editor-content">
          <Editor
            ref={editor}
            editorState={editorState}
            onChange={handleEditorChange}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            placeholder={placeholder || "Write your thoughts..."}
            customStyleMap={styleMap}
            spellCheck={true}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
