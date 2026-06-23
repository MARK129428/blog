import { visit } from 'unist-util-visit';
import { renderTikz } from './tikzRenderer';

export function rehypeTikz() {
  return async (tree: any) => {
    const transforms: Promise<void>[] = [];

    visit(tree, 'element', (node, index, parent) => {
      if (
        node.tagName === 'pre' &&
        node.children?.length === 1 &&
        node.children[0].tagName === 'code' &&
        Array.isArray(node.children[0].properties?.className) &&
        node.children[0].properties.className.includes('language-tikz')
      ) {
        const codeNode = node.children[0];
        const textContent =
          codeNode.children
            ?.map((child: any) => child.value || '')
            .join('') || '';

        transforms.push(
          (async () => {
            const svg = await renderTikz(textContent);
            parent.children[index!] = {
              type: 'element',
              tagName: 'TikzSvg',
              properties: {},
              children: [
                {
                  type: 'raw',
                  value: svg,
                },
              ],
              position: node.position,
            };
          })(),
        );
      }
    });

    await Promise.all(transforms);
  };
}
