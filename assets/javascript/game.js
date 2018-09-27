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
            $('#title').text('Select a Fighter');
            $('#subtitle').html('&nbsp; <br> &nbsp;');
            $('#player-select').show();
            $('#enemy-select').hide();
            $('#attacker-area').hide();
            $('#attacker-area').css('opacity', 1.0);
            $('#defender-area').hide();

            this.update();
        },

        clear: function() {
            $('#title').text('May the Force be With You');
            $('#subtitle').text('Click anywhere to play');
            $('#player-select').hide();
            $('#enemy-select').hide();
            $('#attacker-area').hide();
            $('#defendet-area').hide();
        },

        update: function() {

            if(this.currentPlayer && this.currentPlayer.currentHealth <= 0) {
                
                $('#attacker-area').animate({opacity: 0}, 500, function() {
                    game.isActive = false;
                    $('#subtitle').html('Lethal damage to ' + game.currentPlayer.name + '<br>Click to play again');
                });
                return;
            }

            if(this.currentEnemy && this.currentEnemy.currentHealth <= 0) {

            }

            if (this.currentPlayer === false || this.currentEnemy === false) {
                
                var selectDiv = (this.currentPlayer === false) ? '#player-select .character' : '#enemy-select .character';
                $(selectDiv).each(function(idx) {
                        
                    $(this).children('.name').text(game.players[idx].name);
                    $(this).children('img').attr('src', game.players[idx].imgSrc);
                    $(this).children('.health').text(game.players[idx].currentHealth);
                });

            } else {                
                
                $('#attacker-area img').attr('src', this.currentPlayer.imgSrc);
                $('#attacker-area .health').text(this.currentPlayer.currentHealth);
                $('#defender-area img').attr('src', this.currentEnemy.imgSrc);
                $('#defender-area .health').text(this.currentEnemy.currentHealth);
            }
        },

        selectPlayer: function(idx) {

            this.currentPlayer = this.players.splice(idx, 1)[0];
            $('#player-select').hide();
            $('#enemy-select').show();
            $('#title').text("Select an Opponent");
            this.update();
        },

        selectEnemy: function(idx) {

            this.currentEnemy = this.players.splice(idx, 1)[0];
            $('#enemy-select').hide();
            $('#attacker-area').show();
            $('#defender-area').show();
            $('#title').text("Fight!");
            this.update();
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

    game.clear();

    //define interactions
    $('#game-area').on('click', function() {

        if (!game.isActive) {
            game.initGame();
        }
    });
    $('#player-select .character').on('click', function() {

        if (!game.currentPlayer) {
            game.selectPlayer($(this).data('idx'));
        }
    });

    $('#enemy-select .character').on('click', function() {

        if (!game.currentEnemy) {
            game.selectEnemy($(this).data('idx'));
        }
    });

    $('#attack').on('click', function() {

        if (game.currentPlayer && game.currentEnemy) {
            game.attack();
        }
    });
});