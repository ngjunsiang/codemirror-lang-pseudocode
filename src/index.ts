// https://kubixlezermars.codemirror.net/examples/lang-package/

import {parser} from "./pscode.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const pscodeLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        Boolean: t.bool,
        Char: t.character,
        Identifier: t.variableName,
        Keyword: t.keyword,
        Null: t.null,
        Float: t.float,
        Integer: t.integer,
        String: t.string,
        Operator: t.operator,
        Comment: t.lineComment,
        "( )": t.paren
      })
    ]
  }),
  languageData: {
    commentTokens: {line: "//"}
  }
})

export function pseudocode() {
  return new LanguageSupport(pscodeLanguage)
}
