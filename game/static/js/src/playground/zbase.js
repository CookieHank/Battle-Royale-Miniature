class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div> game </div>`);
        this.root.$ac_game.append(this.$playground);
        this.start();
    }


    start(){

    }

    show() { // open the playground
        this.$playground.show();
    }


    hide(){ // hide the playground
        this.$playground.hide();
    }
}
