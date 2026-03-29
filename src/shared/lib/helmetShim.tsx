import { Children, ReactNode, isValidElement, useEffect } from "react";

type HelmetProviderProps = {
  children: ReactNode;
};

type HelmetProps = {
  children?: ReactNode;
};

const textFromNode = (node: ReactNode): string => {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(textFromNode).join("");
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textFromNode(node.props.children);
  }
  return "";
};

const extractTitle = (children: ReactNode): string | null => {
  let title: string | null = null;

  Children.forEach(children, (child) => {
    if (title) return;
    if (!isValidElement<{ children?: ReactNode }>(child)) return;

    if (child.type === "title") {
      const nextTitle = textFromNode(child.props.children).trim();
      if (nextTitle) title = nextTitle;
      return;
    }

    if (child.props?.children) {
      title = extractTitle(child.props.children);
    }
  });

  return title;
};

export const HelmetProvider = ({ children }: HelmetProviderProps) => {
  return <>{children}</>;
};

export const Helmet = ({ children }: HelmetProps) => {
  useEffect(() => {
    const nextTitle = extractTitle(children);
    if (!nextTitle) return;
    if (document.title !== nextTitle) {
      document.title = nextTitle;
    }
  }, [children]);

  return null;
};
