
export const editor = SUNEDITOR.create(document.querySelector(".txtarea-promotion"), {
    value: "Comments...",
    codeMirror: CodeMirror,
    katex: katex,
    buttonList: [
      // default
      ["undo", "redo"],
      [
        ":p-More Paragraph-default.more_paragraph",
        "font",
        "fontSize",
        "formatBlock",
        "paragraphStyle",
        "blockquote",
      ],
      ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ["fontColor", "hiliteColor", "textStyle"],
      ["removeFormat"],
      ["outdent", "indent"],
      ["align", "horizontalRule", "list", "lineHeight"],
      [
        "-right",
        ":i-More Misc-default.more_vertical",
        "fullScreen",
        "showBlocks",
        "codeView",
        "preview",
        "print",
        "save",
        "template",
      ],
      [
        "-right",
        ":r-More Rich-default.more_plus",
        "table",
        "math",
        "imageGallery",
      ],
      ["-right", "image", "video", "audio", "link"],
      // (min-width: 992)
      [
        "%992",
        [
          ["undo", "redo"],
          ["bold", "underline", "italic", "strike"],
          [
            ":t-More Text-default.more_text",
            "subscript",
            "superscript",
            "fontColor",
            "hiliteColor",
            "textStyle",
          ],
          ["removeFormat"],
          ["outdent", "indent"],
          ["align", "horizontalRule", "list", "lineHeight"],
          [
            ":p-More Paragraph-default.more_paragraph",
            "font",
            "fontSize",
            "formatBlock",
            "paragraphStyle",
            "blockquote",
          ],
          [
            "-right",
            ":i-More Misc-default.more_vertical",
            "fullScreen",
            "showBlocks",
            "codeView",
            "preview",
            "print",
            "save",
            "template",
          ],
          [
            "-right",
            ":r-More Rich-default.more_plus",
            "table",
            "link",
            "image",
            "video",
            "audio",
            "math",
            "imageGallery",
          ],
        ],
      ],
      // (min-width: 767)
      [
        "%767",
        [
          ["undo", "redo"],
          [
            ":p-More Paragraph-default.more_paragraph",
            "font",
            "fontSize",
            "formatBlock",
            "paragraphStyle",
            "blockquote",
          ],
          [
            ":t-More Text-default.more_text",
            "bold",
            "underline",
            "italic",
            "strike",
            "subscript",
            "superscript",
            "fontColor",
            "hiliteColor",
            "textStyle",
          ],
          ["removeFormat"],
          ["outdent", "indent"],
          [
            ":e-More Line-default.more_horizontal",
            "align",
            "horizontalRule",
            "list",
            "lineHeight",
          ],
          [
            ":r-More Rich-default.more_plus",
            "table",
            "link",
            "image",
            "video",
            "audio",
            "math",
            "imageGallery",
          ],
          [
            "-right",
            ":i-More Misc-default.more_vertical",
            "fullScreen",
            "showBlocks",
            "codeView",
            "preview",
            "print",
            "save",
            "template",
          ],
        ],
      ],
      // (min-width: 480)
      [
        "%480",
        [
          [
            ":p-More Paragraph-default.more_paragraph",
            "font",
            "fontSize",
            "formatBlock",
            "paragraphStyle",
          ],
          [
            ":t-More Text-default.more_text",
            "bold",
            "underline",
            "italic",
            "strike",
            "subscript",
            "superscript",
            "fontColor",
            "hiliteColor",
            "textStyle",
            "removeFormat",
          ],
          [
            ":e-More Line-default.more_horizontal",
            "outdent",
            "indent",
            "align",
            "horizontalRule",
            "list",
            "lineHeight",
          ],
          [
            ":r-More Rich-default.more_plus",
            "table",
            "link",
            "image",
            "video",
            "audio",
            "math",
            "imageGallery",
          ],
          [
            "-right",
            ":i-More Misc-default.more_vertical",
            "fullScreen",
            "showBlocks",
            "codeView",
            "preview",
            "print",
            "save",
            "template",
          ],
        ],
      ],
    ],
  
    width: "100%",
  
    lang: SUNEDITOR_LANG["en"],
  });
  editor.setDefaultStyle("font-family: Arial; font-size: 13px;");