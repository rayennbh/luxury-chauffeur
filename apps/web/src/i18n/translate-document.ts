export type Catalog = Record<string, string>;

const attributes = ["aria-label", "alt", "placeholder", "title"];
const excluded = "script, style, svg, title, [translate=no], option:not([value])";

const key = (text: string) => text.trim().replace(/\s+/g, " ");

export function createDocumentTranslator() {
  const originalText = new WeakMap<Text, { source: string; applied: string }>();
  const originalAttributes = new WeakMap<Element, Map<string, { source: string; applied: string }>>();
  let catalog: Catalog = {};
  let observer: MutationObserver | undefined;

  function translated(source: string) {
    const lookup = key(source);
    if (!Object.hasOwn(catalog, lookup)) return source;
    return source.replace(/\S[\s\S]*\S|\S/, () => catalog[lookup]);
  }

  function translateText(node: Text) {
    if (!node.parentElement || node.parentElement.closest(excluded)) return;
    const value = node.data;
    const previous = originalText.get(node);
    const source = previous?.applied === value ? previous.source : value;
    const next = translated(source);
    if (next !== source) originalText.set(node, { source, applied: next });
    else originalText.delete(node);
    if (next !== value) node.data = next;
  }

  function translateAttributes(element: Element) {
    if (element.closest(excluded)) return;
    const previous = originalAttributes.get(element) ?? new Map();
    for (const name of attributes) {
      const value = element.getAttribute(name);
      if (value === null) {
        previous.delete(name);
        continue;
      }
      const entry = previous.get(name);
      const source = entry?.applied === value ? entry.source : value;
      const next = translated(source);
      if (next !== source) previous.set(name, { source, applied: next });
      else previous.delete(name);
      if (next !== value) element.setAttribute(name, next);
    }
    if (previous.size) originalAttributes.set(element, previous);
  }

  function translateTree(root: Node) {
    if (root instanceof Element) translateAttributes(root);
    if (root instanceof Text) {
      translateText(root);
      return;
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node instanceof Element && node.matches(excluded)
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      },
    });
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node instanceof Element) translateAttributes(node);
      if (node instanceof Text) translateText(node);
    }
  }

  function observe() {
    observer?.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: attributes,
    });
  }

  return {
    apply(nextCatalog: Catalog, language: string) {
      observer?.disconnect();
      catalog = nextCatalog;
      translateTree(document.body);
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      if (language === "en") return;

      observer ??= new MutationObserver((records) => {
        observer?.disconnect();
        for (const record of records) {
          if (record.type === "childList") {
            record.addedNodes.forEach(translateTree);
          } else if (record.target instanceof Text) {
            translateText(record.target);
          } else if (record.target instanceof Element) {
            translateAttributes(record.target);
          }
        }
        observe();
      });
      observe();
    },
    disconnect() {
      observer?.disconnect();
    },
  };
}
