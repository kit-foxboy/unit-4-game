class Fighter {
    
    constructor(name, imgSrc, health, attackPower, counterAttackPower) {
        this.name = name;
        this.imgSrc = imgSrc;
        this.maxHealth = health;
        this.currentHealth = health;
        this.startingAttackPower = attackPower;
        this.currentAttackPower = attackPower;
        this.counterAttackPower = counterAttackPower;
        this.isActive = true;
    }
}



$(document).ready(function() {

    //define game
    var game = {
        currentPlayer: false,
        currentEnemy: false,
        players: [],

        initGame: function() {
            
            this.isActive = true;
            this.currentPlayer = false;
            this.currentEnemy = false;
            this.players = [
                new Fighter('Bastila', 'assets/images/bastila.jpg', 120, 6, 20),
                new Fighter('Kreia', 'assets/images/kreia.jpg', 150, 5, 10),
                new Fighter('Darth Malak', 'assets/images/darth_malak.jpg', 100, 6, 25),
                new Fighter('Darth Nihilus', 'assets/images/darth_nihilus.png', 200, 4, 10)
            ]
            $('#game-area').css('background', 'url(assets/images/kotorGray.png)');

            this.update();
        },

        update: function() {
            
            $('.ui').html('');

            if(this.currentPlayer && this.currentPlayer.currentHealth <= 0) {
                this.killPlayer();
                return;
            }

            if(this.currentEnemy && this.currentEnemy.currentHealth <= 0) {
                this.killEnemy();
            }

            if (this.currentPlayer === false || this.currentEnemy === false) {

                if (this.currentPlayer === false) {
                    this.showPlayerSelect();
                } else {
                    this.showEnemySelect();
                }

            } else {                
                this.showBattlefield();
            }
        },

        showPlayerSelect: function() {

            $('#title').text('Select a Fighter');

            for (var i = 0; i < this.players.length; i++) {
                
                var character = '\
                    <div class="character" data-idx="' + i + '">\
                        <p class="name">' + game.players[i].name + '</p>\
                            <img src="' + game.players[i].imgSrc + '" width="150">\
                        <p class="health">' + game.players[i].currentHealth + '</p>\
                    </div>';
                $('#player-select').append(character);
            }

            $('#player-select .character').on('click', function() {
                if (!game.currentPlayer) {
                    game.selectPlayer($(this).data('idx'));
                }
            });
        },

        showEnemySelect: function() {
            
            $('#title').text('Select an Opponent');

            for (var i = 0; i < this.players.length; i++) {
                
                var character = '\
                    <div class="character" data-idx="' + i + '">\
                        <p class="name">' + game.players[i].name + '</p>\
                            <img src="' + game.players[i].imgSrc + '" width="150">\
                        <p class="health">' + game.players[i].currentHealth + '</p>\
                    </div>';
                $('#enemy-select').append(character);
            }

            $('#enemy-select .character').on('click', function() {

                if (!game.currentEnemy) {
                    game.selectEnemy($(this).data('idx'));
                }
            });
        },

        showBattlefield: function() {

            $('#title').text('Fight!');

            var attacker = '\
                <div class="character no-border">\
                    <p class="name">' + this.currentPlayer.name + '</p>\
                        <img src="' + this.currentPlayer.imgSrc + '" width="150">\
                    <p class="health">' + this.currentPlayer.currentHealth + '</p>\
                    <button type="button" id="attack">Attack</button>\
                </div>';
            var defender = '\
                <div class="character enemy no-border">\
                    <p class="name">' + this.currentEnemy.name + '</p>\
                        <img src="' + this.currentEnemy.imgSrc + '" width="150">\
                    <p class="health">' + this.currentEnemy.currentHealth + '</p>\
                </div>';

            $('#attacker-area').append(attacker);
            $('#defender-area').append(defender);
            $('#attacker-area').show();
            $('#defender-area').show();

            $('#attack').on('click', function() {

                if (game.currentPlayer && game.currentEnemy) {
                    game.attack();
                }
            });
        },

        selectPlayer: function(idx) {

            this.currentPlayer = this.players.splice(idx, 1)[0];
            this.update();
        },

        selectEnemy: function(idx) {

            this.currentEnemy = this.players.splice(idx, 1)[0];
            this.update();
        },

        killPlayer: function () {

            $('#attacker-area').fadeOut(500, function() {
                $('#subtitle').html('Lethal damage to ' + game.currentPlayer.name + '<br>Click to play again');
                game.isActive = false;
            });
            $('#defender-area').fadeOut(500);
        },

        killEnemy: function() {

            $('#attack').attr('disabled', 'disabled');
            $('#attacker-area').fadeOut(500);
            $('#defender-area').fadeOut(500, function() {
                $('#title').text("Select an Opponent");
                $('#subtitle').html('Lethal damage to ' + game.currentEnemy.name + '<br>&nbsp;');
                game.currentEnemy = false;
                game.showEnemySelect();
            });
        },

        attack: function() {

            this.currentEnemy.currentHealth -= this.currentPlayer.currentAttackPower;
            this.currentPlayer.currentHealth -= this.currentEnemy.counterAttackPower;
            
            var desc = this.currentPlayer.name + ' deals ' + this.currentPlayer.currentAttackPower + ' damage to ' + this.currentEnemy.name;
            desc += '<br>' + this.currentEnemy.name + ' deals ' + this.currentEnemy.counterAttackPower + ' damage to ' + this.currentPlayer.name;
            
            this.currentPlayer.currentAttackPower += this.currentPlayer.startingAttackPower;

            $('#subtitle').html(desc);
            
            this.update();
        }
    };

    //define interactions
    $('#game-area').on('click', function() {

        if (!game.isActive) {
            game.initGame();
        }
    });
});