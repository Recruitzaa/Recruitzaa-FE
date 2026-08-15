/**
 * Utility functions for generating valid, compilable LaTeX from user input strings.
 */

/**
 * Escapes LaTeX special characters to prevent compilation errors.
 * Special chars: \ { } $ & # ^ _ ~ %
 */
export const escapeLatex = (text: string | undefined | null): string => {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
};

/**
 * Converts multiline text into LaTeX bullet items or clean paragraphs.
 */
export const formatLatexBullets = (items: string[] | undefined): string => {
  if (!items || items.length === 0) return '';
  return items
    .map((item) => `      \\resumeItem{${escapeLatex(item.trim())}}`)
    .join('\n');
};
