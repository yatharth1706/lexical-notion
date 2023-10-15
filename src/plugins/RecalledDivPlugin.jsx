import {
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  DecoratorNode,
  ElementNode,
  createCommand,
} from "lexical";
import RecallComponent from "../components/RecallComponent";
import { $setBlocksType } from "@lexical/selection";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function convertRecallElement(domNode) {
  const node = $createRecallNode();
  return { node };
}

export class RecallNode extends DecoratorNode {
  __id;

  static getType() {
    return "RecallDiv";
  }

  static clone(node) {
    return new RecallNode(node.__id, node.__key);
  }

  constructor(id, key) {
    super(key);
    this.__id = id;
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return <RecallComponent />;
  }

  static importDOM() {
    return {
      div: (domNode) => {
        return {
          conversion: convertRecallElement,
          priority: 2,
        };
      },
    };
  }

  exportDOM() {
    const element = document.createElement("div");
    return { element };
  }

  createDOM() {
    const elem = document.createElement("span");
    elem.style.display = "inline-block";
    return elem;
  }
}

export function $createRecallNode(id) {
  return new RecallNode(id);
}

export function $isVideoNode(node) {
  return node instanceof RecallNode;
}

export const ADD_RECALL_DIV = createCommand("Add recall div");

export const RecallPlugin = () => {
  const [editor] = useLexicalComposerContext();

  editor.registerCommand(
    ADD_RECALL_DIV,
    (payload, editor) => {
      const recallNode = $createRecallNode();
      $insertNodes([recallNode]);
      return true;
    },
    COMMAND_PRIORITY_LOW
  );
  return null;
};
