// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"assets/scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/normalize.css/normalize.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"assets/js/message.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Message =
/*#__PURE__*/
function () {
  function Message() {
    _classCallCheck(this, Message);
  }

  _createClass(Message, [{
    key: "showMsg",

    /**
     * Check whether success or error and show corresponding message
     * @param type
     * @param message
     */
    value: function showMsg(type, message) {
      var successMsgCssClass = ["app-message", "app-message--success"],
          errorMsgCssClass = ["app-message", "app-message--error"]; //TODO: Move variables to separate file as constants for easier management

      switch (type) {
        case "error":
          this.generateMsg(errorMsgCssClass, message);
          break;

        case "success":
          this.generateMsg(successMsgCssClass, message);
          break;
      }
    }
    /**
     * Generate HTML for messages
     * @param cssClass
     * @param message
     */

  }, {
    key: "generateMsg",
    value: function generateMsg(cssClass, message) {
      var _msgContainer$classLi;

      var msgContainer = document.createElement("div");

      (_msgContainer$classLi = msgContainer.classList).add.apply(_msgContainer$classLi, _toConsumableArray(cssClass));

      msgContainer.innerHTML = message;
      document.body.appendChild(msgContainer);
      msgContainer.classList.add("active");
      msgContainer.addEventListener("click", function () {
        msgContainer.remove();
      }, false);
      window.setTimeout(function () {
        msgContainer.remove();
      }, 2500);
    }
  }]);

  return Message;
}();

exports.default = Message;
},{}],"assets/js/markerplacer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _message = _interopRequireDefault(require("./message.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MarkerPlacer =
/*#__PURE__*/
function () {
  function MarkerPlacer() {
    var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var overlay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _message.default();

    _classCallCheck(this, MarkerPlacer);

    this.parent = parent;
    this.overlay = overlay;
    this.message = message;
  }

  _createClass(MarkerPlacer, [{
    key: "init",
    value: function init(parent) {
      var _this = this;

      this.parent = parent;
      this.createOverlay();
      this.parent.addEventListener("click", function (e) {
        return _this.placeMarker(e);
      }, false);
    }
    /**
     * Creates an overlay over an image which houses all markers
     */

  }, {
    key: "createOverlay",
    value: function createOverlay() {
      var _this2 = this;

      var imageOverlay = document.createElement("div");
      imageOverlay.classList.add("app-image-overlay");
      imageOverlay.style.width = this.parent.width + "px";
      imageOverlay.style.height = this.parent.height + "px";
      this.parent.parentNode.appendChild(imageOverlay);
      this.overlay = imageOverlay;

      window.onresize = function () {
        imageOverlay.style.width = _this2.parent.width + "px";
        imageOverlay.style.height = _this2.parent.height + "px";
      };
    }
    /**
     * Places a marker
     * Position of each marker is calculated and 'top' and 'left' are assigned as a percentage of parent element size
     * which ensures responsive behaviour without any additional JS calculations
     * @param e
     */

  }, {
    key: "placeMarker",
    value: function placeMarker(e) {
      var _this3 = this;

      var x = Math.floor(e.pageX - e.target.getBoundingClientRect().left),
          y = Math.floor(e.pageY - e.target.getBoundingClientRect().top),
          marker = document.createElement("div"),
          input = document.createElement("input");
      marker.classList.add('app-image-marker');
      marker.style.left = (x * 100 / e.target.width).toString() + "%";
      marker.style.top = (y * 100 / e.target.height).toString() + "%";
      input.type = "text";
      input.placeholder = "Enter some text...";
      input.addEventListener("keyup", function (e) {
        return _this3.setMarkerText(marker, input.value, e.keyCode);
      }, false);
      marker.appendChild(input);
      this.overlay.appendChild(marker);
    }
    /**
     * Sets marker text
     * @param marker
     * @param text
     * @param keycode
     * @returns {boolean}
     */

  }, {
    key: "setMarkerText",
    value: function setMarkerText(marker, text, keycode) {
      if (keycode === 13) {
        marker.innerHTML = text;
        marker.setAttribute("title", text);
        this.message.showMsg("success", "Marker placed!");
      } else {
        return false;
      }
    }
  }]);

  return MarkerPlacer;
}();

exports.default = MarkerPlacer;
},{"./message.js":"assets/js/message.js"}],"assets/js/imageloader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _markerplacer = _interopRequireDefault(require("./markerplacer.js"));

var _message = _interopRequireDefault(require("./message.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ImageLoader =
/*#__PURE__*/
function () {
  function ImageLoader(loader) {
    var markerPlacer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _markerplacer.default();
    var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _message.default();

    _classCallCheck(this, ImageLoader);

    //Kinda sorta dependency injection without @injectable
    this.loader = loader;
    this.markerPlacer = markerPlacer;
    this.message = message;
  }
  /**
   * Binds an event to image loader
   */


  _createClass(ImageLoader, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.loader.addEventListener("change", function (e) {
        return _this.handleImageUpload(e);
      }, false);
    }
    /**
     * Image uploading method
     */

  }, {
    key: "handleImageUpload",
    value: function handleImageUpload() {
      var _this2 = this;

      var name = this.loader.files[0].name,
          ext = name.substring(name.lastIndexOf('.') + 1).toLowerCase(),
          allowed = ["gif", "jpg", "jpeg", "png", "svg"];

      if (allowed.indexOf(ext) !== -1) {
        //allowed file types
        if (FileReader && this.loader.files && this.loader.files.length) {
          //just for a few unlikely cases
          var fr = new FileReader();

          fr.onload = function () {
            return _this2.generatePreview(fr);
          };

          fr.readAsDataURL(this.loader.files[0]);

          fr.onloadend = function () {
            _this2.message.showMsg("success", "Image uploaded");
          };
        }
      } else {
        this.message.showMsg("error", "Unsupported file type");
      }
    }
    /**
     * Generates preview for uploaded image
     * @param fileReader
     */

  }, {
    key: "generatePreview",
    value: function generatePreview(fileReader) {
      var _this3 = this;

      var previewContainer = document.createElement("div"),
          imageContainer = document.createElement("div"),
          img = document.createElement("img"),
          previewCloseButton = document.createElement("span");
      previewContainer.classList.add("app-image-preview");
      imageContainer.classList.add("app-image-container");
      previewCloseButton.classList.add("app-image-preview__close-button");
      img.src = fileReader.result;
      imageContainer.appendChild(img);
      previewContainer.appendChild(imageContainer);
      previewContainer.appendChild(previewCloseButton);
      document.body.appendChild(previewContainer);
      document.addEventListener("click", function (e) {
        if (e.target === previewCloseButton) {
          e.target.parentNode.remove();
        }
      }, false);
      img.addEventListener("load", function () {
        _this3.loader.value = "";

        _this3.markerPlacer.init(img);
      }, false);
    }
  }]);

  return ImageLoader;
}();

exports.default = ImageLoader;
},{"./markerplacer.js":"assets/js/markerplacer.js","./message.js":"assets/js/message.js"}],"../app.js":[function(require,module,exports) {
"use strict";

require("./src/assets/scss/main.scss");

require("normalize.css");

var _imageloader = _interopRequireDefault(require("./src/assets/js/imageloader.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//remove function polyfill
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }

    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode === null) {
          return;
        }

        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

var imageLoader = new _imageloader.default(document.getElementById("imageLoader"));
imageLoader.init();
},{"./src/assets/scss/main.scss":"assets/scss/main.scss","normalize.css":"../node_modules/normalize.css/normalize.css","./src/assets/js/imageloader.js":"assets/js/imageloader.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52877" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../app.js"], null)
//# sourceMappingURL=/app.871a4408.js.map