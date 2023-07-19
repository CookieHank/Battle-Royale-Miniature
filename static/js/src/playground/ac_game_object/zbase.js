let AC_GAME_OBJECTS = [];


class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);
        this.has_called_start = false; // to see if we have used start function
        this.timedelta = 0; // Current frame time interval from the previous frame
    }
    
    start() { // It will only be executed on the first frame once
    }

    update() { // It is executed once per frame

    }
    on_destroy(){ // execute before destroy
    }

    destroy(){ // delete the item
        for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
            if (AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i,1);
                    break;
            }
        }
    }
}

let last_timestamp;

let AC_GAME_ANIMATION = function(timestamp){
    for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ){
        let obj = AC_GAME_OBJECTS[i];
        if (!obj.has_called_start){
            obj.start();
            obj.has_called_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
    
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(AC_GAME_ANIMATION);
}

requestAnimationFrame(AC_GAME_ANIMATION);
