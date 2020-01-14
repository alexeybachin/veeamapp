export default class Message {

    /**
     * Check whether success or error and show corresponding message
     * @param type
     * @param message
     */
    showMsg( type, message ) {
        let successMsgCssClass = ["app-message", "app-message--success"],
            errorMsgCssClass = ["app-message", "app-message--error"]; //TODO: Move variables to separate file as constants for easier management

        switch ( type ) {
            case "error":
                this.generateMsg( errorMsgCssClass, message );
                break;
            case "success":
                this.generateMsg( successMsgCssClass, message );
                break;
        }
    }

    /**
     * Generate HTML for messages
     * @param cssClass
     * @param message
     */
    generateMsg( cssClass, message ) {
        let msgContainer = document.createElement( "div" );

        msgContainer.classList.add( ...cssClass );
        msgContainer.innerHTML = message;
        document.body.appendChild( msgContainer );
        msgContainer.classList.add( "active" );
        msgContainer.addEventListener( "click", () => {
            msgContainer.remove();
        }, false );
        window.setTimeout( () => {
            msgContainer.remove();
        }, 2500 );
    }

}