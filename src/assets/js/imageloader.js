import MarkerPlacer from './markerplacer.js';
import Message from './message.js';

export default class ImageLoader {

    constructor ( loader, markerPlacer = new MarkerPlacer(), message = new Message() ) { //Kinda sorta dependency injection without @injectable
        this.loader = loader;
        this.markerPlacer = markerPlacer;
        this.message = message;
    }

    /**
     * Binds an event to image loader
     */
    init() {
        this.loader.addEventListener( "change", e => this.handleImageUpload(e), false );
    }

    /**
     * Image uploading method
     */
    handleImageUpload() {
        let name = this.loader.files[0].name,
            ext = name.substring( name.lastIndexOf('.') + 1 ).toLowerCase(),
            allowed = ["gif", "jpg", "jpeg", "png", "svg"];

        if ( allowed.indexOf( ext ) !== -1 ) { //allowed file types

            if ( FileReader && this.loader.files && this.loader.files.length ) { //just for a few unlikely cases
                let fr = new FileReader();
                fr.onload = () => this.generatePreview( fr );
                fr.readAsDataURL( this.loader.files[0] );
                fr.onloadend = () => {
                    this.message.showMsg( "success", "Image uploaded" );
                }
            }

        } else {
            this.message.showMsg( "error", "Unsupported file type" );
        }
    }

    /**
     * Generates preview for uploaded image
     * @param fileReader
     */
    generatePreview( fileReader ) {
        let previewContainer = document.createElement( "div" ),
            imageContainer = document.createElement( "div" ),
            img = document.createElement( "img" ),
            previewCloseButton = document.createElement( "span" );

        previewContainer.classList.add( "app-image-preview" );
        imageContainer.classList.add( "app-image-container" );
        previewCloseButton.classList.add ( "app-image-preview__close-button" );
        img.src = fileReader.result;
        imageContainer.appendChild( img );
        previewContainer.appendChild( imageContainer );
        previewContainer.appendChild( previewCloseButton );
        document.body.appendChild( previewContainer );
        document.addEventListener( "click", (e) => {
            if ( e.target === previewCloseButton ) {
                e.target.parentNode.remove();
            }
        }, false );

        img.addEventListener( "load", () => {
            this.loader.value = "";
            this.markerPlacer.init( img );
        }, false );
    }

}