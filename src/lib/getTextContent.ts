import React from 'react';

/**
 * 从 React 节点中提取纯文本内容
 */
export function getTextContent(children: React.ReactNode): string {
  if (children === null || children === undefined) {
    return '';
  }
  
  if (typeof children === 'string') {
    return children;
  }
  
  if (typeof children === 'number') {
    return String(children);
  }
  
  if (typeof children === 'boolean') {
    return '';
  }
  
  if (Array.isArray(children)) {
    const texts = children.map(getTextContent).filter((text): text is string => text.length > 0);
    return texts.join('');
  }
  
  if (typeof children === 'object') {
    if (React.isValidElement(children)) {
      const props = children.props as { children?: React.ReactNode } | null;
      if (props && props.children !== undefined) {
        return getTextContent(props.children);
      }
    } else if ('props' in children) {
      const obj = children as { props?: { children?: React.ReactNode } };
      if (obj.props && obj.props.children !== undefined) {
        return getTextContent(obj.props.children);
      }
    }
  }
  
  return '';
}

