import './src/assets/scss/main.scss';
import 'normalize.css';
import ImageLoader from './src/assets/js/imageloader.js';

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

const imageLoader = new ImageLoader( document.getElementById( "imageLoader" ) );

imageLoader.init();