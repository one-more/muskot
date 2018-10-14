// @flow

import type {TemplateHandler} from "./interfaces"
import {getStorage, storageKeys} from "./storage"
import {matchTagArg, replaceTagArg, tagNameToProp} from "./utils";
import {isCustomComponent} from "./web-components";

const propsStorage = getStorage(storageKeys.PROPS);
const eventsStorage = getStorage(storageKeys.EVENTS);

const EventsTagHandler: TemplateHandler = {
    call: (node: any, args: any[]) => {
        const attributes = node.attributes || [];
        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            if (attribute.nodeName.startsWith("on")) {
                const match = matchTagArg(attribute.nodeValue);
                if (match && match[1]) {
                    const index = Number(match[1]);
                    const listener = args[index];
                    if (typeof listener === "function") {
                        node.removeAttribute(
                            attribute.nodeName
                        );
                        const eventName = attribute.nodeName.toLowerCase().slice(2);
                        node.addEventListener(
                            eventName,
                            listener
                        );

                        const listeners = eventsStorage.get(node) || {};
                        eventsStorage.set(
                            node,
                            {
                                ...listeners,
                                [eventName]: listener
                            }
                        )
                    }
                }
            }
        }
    }
};

const MapHandler: TemplateHandler = {
    call: (node: Node, args: any[]) => {
        if (node instanceof HTMLTemplateElement) {
            if (node.hasAttribute("map")) {
                const match = matchTagArg(String(node.getAttribute("map")));
                if (match && match[1]) {
                    const index = Number(match[1]);
                    const arr = args[index];
                    const tpl = node.innerHTML;
                    const fragment = document.createElement("template");
                    const nodes = arr.map(el => {
                        return replaceTagArg(tpl, (match, index) => {
                            const arg = args[index];
                            if (typeof arg === "function") {
                                const tplCall = arg(el);
                                if (tplCall instanceof HTMLTemplateElement) {
                                    return tplCall.innerHTML
                                } else {
                                    if (Array.isArray(tplCall)) {
                                        return tplCall.join('');
                                    } else {
                                        return tplCall;
                                    }
                                }
                            }
                            return arg
                        })
                    });
                    fragment.innerHTML = nodes.join('');
                    // $FlowFixMe
                    node.parentNode.replaceChild(
                        fragment.content,
                        node
                    )
                }
            }
        }
    }
};

function shouldSetPropToStorage(value: any, node: Node): boolean {
    return typeof value === "function" || typeof value === "object" || isCustomComponent(node)
}

function parseAttribute(attribute: Node, node: Node, args: any[]) {
    const match = matchTagArg(attribute.nodeValue);
    if (match && match[1]) {
        const index = Number(match[1]);
        const nodeName = attribute.nodeName;
        const propName = tagNameToProp(nodeName);
        const value = args[index];
        return [propName, value]
    }
    return [attribute.nodeName, attribute.nodeValue]
}

const PropsHandler: TemplateHandler = {
    call: (node: any, args: any[]) => {
        const attributes = node.attributes || [];
        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            const [propName, value] = parseAttribute(
                attribute,
                node,
                args
            );
            if (shouldSetPropToStorage(value, node)) {
                const props = propsStorage.get(node) || {};
                node.removeAttribute(
                    attribute.nodeName,
                );
                propsStorage.set(
                    node,
                    {
                        ...props,
                        [propName]: value
                    }
                )
            }
        }
    }
};

const coreHandlers = {
    events: EventsTagHandler,
    map: MapHandler,
    props: PropsHandler
};

const customHandlers = {};

let handlers: Array<Function> = [
    coreHandlers.map.call,
    coreHandlers.events.call,
    coreHandlers.props.call,
];

export function callHandlers(element: DocumentFragment | Node, args: any[]): void {
    if (((element: any).attributes || []).length) {
        handlers.forEach(handler => {
            handler(element, args);
        });
    }
    for (let i = 0; i < element.childNodes.length; i++) {
        callHandlers(
            element.childNodes[i],
            args
        )
    }
}

export function addTemplateHandler(key:string, handler: TemplateHandler): void {
    customHandlers[key] = handler;
    // $FlowFixMe
    handlers.unshift(handler.call)
}

export function accessHandler(key: string): TemplateHandler {
    return customHandlers[key]
}

export function unloadHandler(key: string): void {
    const handler = customHandlers[key];
    handlers = handlers.filter(el => el !== handler.call)
}

export function setCoreHandler(key: string, handler: TemplateHandler): void {
    coreHandlers[key] = handler
}