import { visit } from 'unist-util-visit';

// Runs BEFORE rehype-pretty-code. Converts mermaid code blocks
// into <mermaid> elements that rehype-pretty-code won't touch.
export function rehypePreMermaid() {
  return (tree: any) => {
    visit(tree, 'element', (node, index, parent) => {
      if (
        node.tagName === 'pre' &&
        node.children?.length === 1 &&
        node.children[0].tagName === 'code' &&
        Array.isArray(node.children[0].properties?.className) &&
        node.children[0].properties.className.includes('language-mermaid')
      ) {
        const codeNode = node.children[0];
        // Preserve the text content from the code node
        const textContent = codeNode.children || [];
        // Replace the <pre> with a <mermaid> element
        parent.children[index!] = {
          type: 'element',
          tagName: 'mermaid',
          properties: {},
          children: textContent,
          position: node.position,
        };
      }
    });
  };
}
