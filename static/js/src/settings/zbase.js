class Settings{
    constructor(root){
        this.root = root;
        this.platform = "WEB";
        if (this.root.AcWingOS) this.platform = 'ACAPP';
        this.username = '';
        this.photo = '';

        this.$settings = $(`
<div class="ac-game-settings">
    <div class="ac-game-settings-login">
        <div class="ac-game-settings-title">
            Sign In
        </div>
        <div class="ac-game-settings-username">
            <div class="ac-game-settings-item">
                <input type="text" placeholder="Username">
            </div>
        </div>
        <div>
            <div class="ac-game-settings-password">
                <div class="ac-game-settings-item">
                    <input type="password" placeholder="Password">
                </div>
            </div>
            <div class="ac-game-settings-submit">
                <div class="ac-game-settings-item">
                    <button>Sign In</button>
                </div>
            </div>
            <div class="ac-game-settings-error-messages"></div>
            <div class="ac-game-settings-option">Create Account
            <div>
            <br> <br> <br>
            <div class="ac-game-settings-acwing">
                <img width="30" src="https://app5736.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
                <div>
                    Login Through Partner - ACWing
                </div>
                <br>
            </div>
    </div>
    <div class="ac-game-settings-register">

    </div>
</div>            
    `);

        this.$login = this.$settings.find(".ac-game-settings-login");
        this.$login.hide();

        this.$register = this.$settings.find(".ac-game-settings-register");
        this.$register.hide();

        this.root.$ac_game.append(this.$settings);

        this.start();
    }

    start(){
        this.getinfo();
    }

    register(){ // open the register page
        this.$login.hide();
        this.$register.show();
    }

    login(){ // open the login page
        this.$register.hide();
        this.$login.show();
    }

    getinfo(){
        let outer = this;
        $.ajax({
            url: "https://app5736.acapp.acwing.com.cn/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform,

            },
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success"){
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.hide();
                    outer.root.menu.show();

                } else {
                    outer.login();
                }
            }

        });
    }
    hide(){
        this.$settings.hide();
    }

    show(){
        this.$settings.show();
    }
}
