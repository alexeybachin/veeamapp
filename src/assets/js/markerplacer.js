import Message from "./message.js";

export default class MarkerPlacer {

    constructor( parent = null, overlay = null, message = new Message ) {
        this.parent = parent;
        this.overlay = overlay;
        this.message = message;
    }

    init( parent ) {
        this.parent = parent;
        this.createOverlay();
        this.parent.addEventListener( "click", e => this.placeMarker(e), false );
    }

    /**
     * Creates an overlay over an image which houses all markers
     */
    createOverlay() {
        let imageOverlay = document.createElement( "div" );

        imageOverlay.classList.add( "app-image-overlay" );
        imageOverlay.style.width = this.parent.width + "px";
        imageOverlay.style.height = this.parent.height + "px";
        this.parent.parentNode.appendChild( imageOverlay );
        this.overlay = imageOverlay;
        window.onresize = () => {
            imageOverlay.style.width = this.parent.width + "px";
            imageOverlay.style.height = this.parent.height + "px";
        }
    }

    /**
     * Places a marker
     * Position of each marker is calculated and 'top' and 'left' are assigned as a percentage of parent element size
     * which ensures responsive behaviour without any additional JS calculations
     * @param e
     */
    placeMarker( e ) {
        let x = Math.floor( e.pageX - e.target.getBoundingClientRect().left ),
            y = Math.floor( e.pageY - e.target.getBoundingClientRect().top ),
            marker = document.createElement( "div" ),
            input = document.createElement( "input" );

        marker.classList.add( 'app-image-marker' );
        marker.style.left = ( (x * 100) / e.target.width ).toString() + "%";
        marker.style.top = ( (y * 100) / e.target.height ).toString() + "%";

        input.type = "text";
        input.placeholder = "Enter some text...";
        input.addEventListener( "keyup", e => this.setMarkerText( marker, input.value, e.keyCode ), false );
        marker.appendChild( input );

        this.overlay.appendChild( marker );
    }

    /**
     * Sets marker text
     * @param marker
     * @param text
     * @param keycode
     * @returns {boolean}
     */
    setMarkerText( marker, text, keycode ) {
        if ( keycode === 13 ) {
            marker.innerHTML = text;
            marker.setAttribute( "title", text );
            this.message.showMsg( "success", "Marker placed!" );
        } else {
            return false;
        }
    }
}