class Controls {
    constructor() {
        this.isGoingForward = false;
        this.isGoingBackward = false;
        this.isGoingLeft = false;
        this.isGoingRight = false;
        this.isBreaking = false;

        this.#attachArrowKeyListeners();
    }

    #attachArrowKeyListeners() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.isGoingForward = true;
                    break;
                case 'ArrowDown':
                    this.isGoingBackward = true;
                    break;
                case 'ArrowLeft':
                    this.isGoingLeft = true;
                    break;
                case 'ArrowRight':
                    this.isGoingRight = true;
                    break;
                case ' ':
                    this.isBreaking = true;
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.isGoingForward = false;
                    break;
                case 'ArrowDown':
                    this.isGoingBackward = false;
                    break;
                case 'ArrowLeft':
                    this.isGoingLeft = false;
                    break;
                case 'ArrowRight':
                    this.isGoingRight = false;
                    break;
                case ' ':
                    this.isBreaking = false;
                    break;
            }
        });
    }
}