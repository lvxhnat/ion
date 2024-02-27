import { FredCategoryEntry, FredSeriesEntry } from "pages/Economic/requests";

export class NodeValue {
  type: "series" | "category"; // Whether this current node is a series or category
  selection: FredCategoryEntry;
  entries: FredCategoryEntry[] | FredSeriesEntry[]; // The entries contained in this current node
}

export class DoublyLinkedListNode {
  public value: NodeValue;
  public next: DoublyLinkedListNode | null;
  public prev: DoublyLinkedListNode | null;

  constructor(value: NodeValue) {
    this.value = value;
  }

  public static fromNode(node: DoublyLinkedListNode): DoublyLinkedListNode {
    let newNode = new DoublyLinkedListNode(node.value);
    newNode.next = node.next;
    newNode.prev = node.prev;
    return newNode;
  }
}
