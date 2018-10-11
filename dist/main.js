module.exports=function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e){p.driver=p.driver.migrate(e)}function i(e){return p.driver.getItem(e)}function u(e,t){p.driver.setItem(e,t)}function a(e){p.driver.removeItem(e)}Object.defineProperty(t,"__esModule",{value:!0});var c;t.setStorageDriver=o,t.getStorage=i,t.addStorage=u,t.removeStorage=a;var l=new Map,s=new Map,f=t.storageKeys={PROPS:"props",EVENTS:"events"},d={items:Object.create((c={},n(c,f.PROPS,l),n(c,f.EVENTS,s),c)),setItem:function(e,t){this.items[e]=t},getItem:function(e){return this.items[e]},removeItem:function(e){delete this.items[e]},migrate:function(e){for(var t in this.items)e.setItem(t,this.items[t]);return e}},p=t.storage={driver:d}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={registerComponent:function(e,t){"customElements"in window?customElements.define(e,t):u().then(function(){i(e,t)})},isCustomComponent:function(e){return e.nodeName.includes("-")}},o=n,i=function(e,t){return o.registerComponent(e,t)},u=(t.setImplementation=function(e){o=e},function(){return Promise.resolve()});t.componentsReady=function(){return u()},t.setReadyCheck=function(e){u=e};t.default=i;t.isCustomComponent=function(e){return o.isCustomComponent(e)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={reducers:{},subscriptions:{},addReducer:function(e,t){this.reducers[e]=t},removeReducer:function(e){return delete this.reducers[e],!1},subscribe:function(e,t){var r=this;return this.subscriptions[e]||(this.subscriptions[e]=[]),this.subscriptions[e].push(t),{unsubscribe:function(){r.subscriptions[e]=r.subscriptions[e].filter(function(e){return e!==t})}}},getState:function(e){},migrate:function(e){for(var t in this.reducers){var r=this.reducers[t];e.addReducer(t,r)}for(var n in this.subscriptions){var o=!0,i=!1,u=void 0;try{for(var a,c=this.subscriptions[n][Symbol.iterator]();!(o=(a=c.next()).done);o=!0){var l=a.value;e.subscribe(n,l)}}catch(e){i=!0,u=e}finally{try{!o&&c.return&&c.return()}finally{if(i)throw u}}}return e}},o={currentImplementation:n};t.setImplementation=function(e){o.currentImplementation=o.currentImplementation.migrate(e)},t.registerReducer=function(e,t){o.currentImplementation.addReducer(e,t)},t.removeReducer=function(e){o.currentImplementation.removeReducer(e)},t.subscribe=function(e,t){return o.currentImplementation.subscribe(e,t)},t.getState=function(e){return o.currentImplementation.getState(e)}},function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){h.forEach(function(r){r(e,t);for(var n=0;n<e.childNodes.length;n++)o(e.childNodes[n],t)})}function i(e,t){g[e]=t,h.unshift(t.call)}function u(e){return g[e]}function a(e){var t=g[e];h=h.filter(function(e){return e!==t.call})}function c(e,t){v[e]=t}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.callHandlers=o,t.addTemplateHandler=i,t.accessHandler=u,t.unloadHandler=a,t.setCoreHandler=c;var s=r(0),f=r(8),d=(0,s.getStorage)(s.storageKeys.PROPS),p=(0,s.getStorage)(s.storageKeys.EVENTS),m={call:function(e,t){for(var r=e.attributes||[],o=0;o<r.length;o++){var i=r[o];if(i.nodeName.startsWith("on")){var u=i.nodeValue.match(/__ARG__(\d+)/);if(u&&u[1]){var a=Number(u[1]),c=t[a];if("function"==typeof c){e.removeAttribute(i.nodeName);var s=i.nodeName.toLowerCase().slice(2);e.addEventListener(s,c);var f=p.get(e)||{};p.set(e,l({},f,n({},s,c)))}}}}}},y={call:function(e,t){if(e instanceof HTMLTemplateElement&&e.hasAttribute("map")){var r=String(e.getAttribute("map")).match(/__ARG__(\d+)/);if(r&&r[1]){var n=Number(r[1]),o=t[n],i=e.innerHTML,u=document.createDocumentFragment();o.forEach(function(e){return i.replace(/__ARG__(\d+)/g,function(r,n){var o=t[n];if("function"==typeof o){var i=o(e);if(i instanceof HTMLTemplateElement)u.appendChild(i.content);else{var a=document.createElement("template");a.innerHTML=i,u.appendChild(a.content)}}return o})}),e.parentNode.replaceChild(u,e)}}}},b={call:function(e,t){for(var r=e.attributes||[],o=0;o<r.length;o++){var i=r[o],u=i.nodeValue.match(/__ARG__(\d+)/);if(u&&u[1]){var a=Number(u[1]),c=d.get(e)||{};e.removeAttribute(i.nodeName);var s=i.nodeName,p=(0,f.tagNameToProp)(s);d.set(e,l({},c,n({},p,t[a])))}}}},v={events:m,map:y,props:b},g={},h=[v.map.call,v.events.call,v.props.call]},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(1);Object.defineProperty(t,"changeWebComponentsImplemenation",{enumerable:!0,get:function(){return o.setImplementation}}),Object.defineProperty(t,"componentsReady",{enumerable:!0,get:function(){return o.componentsReady}}),Object.defineProperty(t,"changeWebComponentsReadyCheck",{enumerable:!0,get:function(){return o.setReadyCheck}}),Object.defineProperty(t,"registerComponent",{enumerable:!0,get:function(){return n(o).default}});var i=r(2);Object.defineProperty(t,"changeStoreImplementation",{enumerable:!0,get:function(){return i.setImplementation}}),Object.defineProperty(t,"registerReducer",{enumerable:!0,get:function(){return i.registerReducer}}),Object.defineProperty(t,"removeReducer",{enumerable:!0,get:function(){return i.removeReducer}}),Object.defineProperty(t,"subscribe",{enumerable:!0,get:function(){return i.subscribe}}),Object.defineProperty(t,"getState",{enumerable:!0,get:function(){return i.getState}});var u=r(3);Object.defineProperty(t,"addTemplateHandler",{enumerable:!0,get:function(){return u.addTemplateHandler}}),Object.defineProperty(t,"setCoreHandler",{enumerable:!0,get:function(){return u.setCoreHandler}}),Object.defineProperty(t,"unloadHandler",{enumerable:!0,get:function(){return u.unloadHandler}}),Object.defineProperty(t,"accessHandler",{enumerable:!0,get:function(){return u.accessHandler}});var a=r(5);Object.defineProperty(t,"html",{enumerable:!0,get:function(){return a.html}}),Object.defineProperty(t,"css",{enumerable:!0,get:function(){return a.css}});var c=r(0);Object.defineProperty(t,"getStorage",{enumerable:!0,get:function(){return c.getStorage}}),Object.defineProperty(t,"addStorage",{enumerable:!0,get:function(){return c.addStorage}}),Object.defineProperty(t,"removeStorage",{enumerable:!0,get:function(){return c.removeStorage}}),Object.defineProperty(t,"setStorageDriver",{enumerable:!0,get:function(){return c.setStorageDriver}});var l=r(11);Object.defineProperty(t,"bind",{enumerable:!0,get:function(){return l.bind}});var s=r(6);Object.defineProperty(t,"Component",{enumerable:!0,get:function(){return n(s).default}})},function(e,t,r){"use strict";function n(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];if(!r.length)return e[0];for(var o="",a=0;a<e.length;a++)o+=e[a],a<e.length-1&&("function"==typeof r[a]||"object"===i(r[a])?o+="__ARG__"+a:o+=r[a]);var c=document.createElement("template");return c.innerHTML=o,(0,u.callHandlers)(c.content,r),c}function o(e){for(var t="",r=arguments.length,n=Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];for(var i=0;i<e.length;i++)t+=e[i],i<e.length-1&&("function"==typeof n[i]?t+=n[i]():t+=n[i]);return t}Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.html=n,t.css=o;var u=r(3)},function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){var t={},r=!0,n=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done);r=!0){var a=i.value;t[a.name]=a.value}}catch(e){n=!0,o=e}finally{try{!r&&u.return&&u.return()}finally{if(n)throw o}}return t}Object.defineProperty(t,"__esModule",{value:!0});var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),f=r(2),d=r(7),p=r(0),m=r(8),y=function(e){var t=e.getPrototypeOf||function(e){return e.__proto__},r=e.setPrototypeOf||function(e,t){return e.__proto__=t,e},n="object"===("undefined"==typeof Reflect?"undefined":c(Reflect))?Reflect.construct:function(e,t,n){var o,i=[null];return i.push.apply(i,t),o=e.bind.apply(e,i),r(new o,n.prototype)};return function(e){var o=t(e);return r(e,r(function(){return n(o,arguments,t(this).constructor)},o))}}(Object),b=(0,p.getStorage)(p.storageKeys.PROPS),v=y(function(e){function t(){var e,r,n,u;o(this,t);for(var a=arguments.length,c=Array(a),l=0;l<a;l++)c[l]=arguments[l];return r=n=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),n.__defaultProps={},n.subscriptions=[],n.state={},n.mounted=!1,u=r,i(n,u)}return u(t,e),s(t,[{key:"render",value:function(){return""}},{key:"subscribeToStore",value:function(){var e=this,t=!0,r=!1,n=void 0;try{for(var o,i=this.keys[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var u=o.value;!function(t){e.subscriptions.push((0,f.subscribe)(t,function(r){e.state[t]=r,d.render.call(e)})),e.state[t]=(0,f.getState)(t)}(u)}}catch(e){r=!0,n=e}finally{try{!t&&i.return&&i.return()}finally{if(r)throw n}}}},{key:"connectedCallback",value:function(){this.subscribeToStore(),d.render.call(this),this.connected()}},{key:"connected",value:function(){}},{key:"disconnectedCallback",value:function(){var e=!0,t=!1,r=void 0;try{for(var n,o=this.subscriptions[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){n.value.unsubscribe()}}catch(e){t=!0,r=e}finally{try{!e&&o.return&&o.return()}finally{if(t)throw r}}(0,m.clearPropsStorage)(),(0,m.clearEventsStorage)(),this.disconnected()}},{key:"disconnected",value:function(){}},{key:"adoptedCallback",value:function(){this.subscribeToStore(),d.render.call(this),this.adopted()}},{key:"adopted",value:function(){}},{key:"attributeChangedCallback",value:function(e,t,r){this.mounted&&t!=r&&(this.propsChanged(l({},this.props,n({},e,r))),d.render.call(this))}},{key:"propsChanged",value:function(e){}},{key:"name",get:function(){return Object.getPrototypeOf(this).constructor.name}},{key:"isShadow",get:function(){return!0}},{key:"props",get:function(){return l({},this.__defaultProps,a(this.attributes),b.get(this)||{})},set:function(e){this.__defaultProps=e}},{key:"keys",get:function(){return[]}},{key:"styles",get:function(){return""}}],[{key:"observedAttributes",get:function(){return this.observableProps.map(function(e){for(var t="",r=0;r<e.length;r++)e[r]===e[r].toUpperCase()?t+="-"+e[r].toLowerCase():t+=e[r];return t})}},{key:"observableProps",get:function(){return[]}}]),t}(HTMLElement));t.default=v},function(e,t,r){"use strict";function n(e,t){var r=e.cloneNode(!1),n=t.cloneNode(!1);return r.isEqualNode(n)}function o(e,t){return!1===e.isEqualNode(t)}function i(e,t){if(e.length>t.length)for(var r=0;r<e.length;r++){if(e[r]&&!t[r])return[e[r]].concat(i(Array.from(e).slice(r+1),Array.from(t).slice(r)));if(!n(e[r],t[r])){var o=i(Array.from(e).slice(r+1),Array.from(t).slice(r));if(0===o.length)return[e[r]]}}return[]}function u(e,t){if(e.length>t.length)return t.length;for(var r=0,o=0;o<e.length;o++){var i=e[o].cloneNode(!1),u=t[o].cloneNode(!1);n(e[o],t[o])||s(i)||s(u)||r++}return r}function a(e,t,r){for(var n=document.createDocumentFragment(),o=t.length;o<r.length;o++)n.appendChild(r[o]);e.appendChild(n)}function c(e,t){var r=t.attributes||[],n=e.attributes||[];if(n.length>r.length)for(var o=0;o<n.length;o++){var i=n[o];t.hasAttribute(i.nodeName)||e.removeAttribute(i.nodeName)}for(var u=0;u<r.length;u++){var a=r[u];e.setAttribute(a.nodeName,a.nodeValue)}if(h.get(t)){var c=h.get(e),l=h.get(t);h.set(e,l),(0,g.default)(c,l)||m.call(e)}}function l(e,t){if((0,y.isCustomComponent)(e))return c(e,t);n(e,t)||c(e,t),d(e,t)}function s(e){return e.nodeType===Node.TEXT_NODE&&(!e.childNodes.length&&(e.innerText?!1===Boolean(e.innerText.trim()):e.innerHTML?!1===Boolean(e.innerHTML.trim()):!e.textContent||!1===Boolean(e.textContent.trim())))}function f(e){return!!e&&((e.nodeType===Node.ELEMENT_NODE||e.nodeType===Node.TEXT_NODE)&&"STYLE"!==e.nodeName&&!s(e))}function d(e,t){var r=Array.from(e.childNodes).filter(f),n=Array.from(t.childNodes).filter(f);if(r.length!==n.length){var c=i(r,n);return 1===c.length?(c[0].parentNode.removeChild(c[0]),d(e,t)):u(r,n)>0?e.parentNode.replaceChild(t,e):a(e,r,n)}if(0===r.length&&0===n.length&&o(e,t))return e.parentNode.replaceChild(t,e);for(var s=0;s<r.length;s++)l(r[s],n[s])}function p(e){var t=document.createElement("template");return t.innerHTML=e,t}function m(){this.isShadow&&!this.shadowRoot&&this.attachShadow({mode:"open"});var e=this.render(),t=this.isShadow?this.shadowRoot:this,r="string"==typeof e?p(e):e;if(this.mounted){var n=document.createElement("style");n.innerHTML=this.styles,r.content.insertBefore(n,r.content.firstChild),d(t,r.content)}else t.innerHTML="<style>"+this.styles+"</style>",t.appendChild(r.content),this.mounted=!0}Object.defineProperty(t,"__esModule",{value:!0}),t.render=m;var y=r(1),b=r(0),v=r(12),g=function(e){return e&&e.__esModule?e:{default:e}}(v),h=(0,b.getStorage)(b.storageKeys.PROPS);(0,b.getStorage)(b.storageKeys.EVENTS)},function(e,t,r){"use strict";function n(){setTimeout(function(){var e=!0,t=!1,r=void 0;try{for(var n,o=a.keys()[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var i=n.value;i.isConnected||a.delete(i)}}catch(e){t=!0,r=e}finally{try{!e&&o.return&&o.return()}finally{if(t)throw r}}})}function o(){setTimeout(function(){var e=!0,t=!1,r=void 0;try{for(var n,o=c.keys()[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var i=n.value;i.isConnected||c.delete(i)}}catch(e){t=!0,r=e}finally{try{!e&&o.return&&o.return()}finally{if(t)throw r}}})}function i(e){return e.split("-").reduce(function(e,t){return t?e+t[0].toUpperCase()+t.slice(1):e})}Object.defineProperty(t,"__esModule",{value:!0}),t.clearPropsStorage=n,t.clearEventsStorage=o,t.tagNameToProp=i;var u=r(0),a=(0,u.getStorage)(u.storageKeys.PROPS),c=(0,u.getStorage)(u.storageKeys.EVENTS)},,,function(e,t,r){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function o(e,t){var r=(0,u.getStorage)(a);if(r.size===c){var n=r.keys();r.delete(n.next().value)}r.set(e,t)}function i(e){for(var t=(0,u.getStorage)(a),r=t.get(e),i=arguments.length,c=Array(i>1?i-1:0),l=1;l<i;l++)c[l-1]=arguments[l];var s=c[0],f=e.bind.apply(e,[null].concat(n(c)));if(r)return r.get(s)?r.get(s):(r.set(s,f),f);var d=new Map;return d.set(s,f),o(e,d),f}Object.defineProperty(t,"__esModule",{value:!0}),t.bind=i;var u=r(0),a="BOUNDS",c=100;(0,u.addStorage)(a,new Map)},function(e,t,r){"use strict";function n(e,t){return e===t?0!==e||0!==t||1/e==1/t:e!==e&&t!==t}function o(e,t){if(n(e,t))return!0;if("object"!==(void 0===e?"undefined":i(e))||null===e||"object"!==(void 0===t?"undefined":i(t))||null===t)return!1;var r=Object.keys(e),o=Object.keys(t);if(r.length!==o.length)return!1;for(var a=0;a<r.length;a++)if(!u.call(t,r[a])||!n(e[r[a]],t[r[a]]))return!1;return!0}Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=Object.prototype.hasOwnProperty;t.default=o}]);