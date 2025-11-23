import React from 'react';

/**
 * 从 React 节点中提取纯文本内容
 */
export function getTextContent(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(getTextContent).join('');
  }
  if (children && typeof children === 'object') {
    if ('props' in children && children.props) {
      return getTextContent(children.props.children);
    }
  }
  return '';
}

