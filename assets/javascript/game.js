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
        players: [
            new Fighter('Bastila', 'assets/images/bastila.jpg', 120, 6, 20),
            new Fighter('Kreia', 'assets/images/kreia.jpg', 150, 5, 10),
            new Fighter('Darth Malak', 'assets/images/darth_malak.jpg', 100, 6, 25),
            new Fighter('Darth Nihilus', 'assets/images/darth_nihilus.png', 200, 4, 10)
        ],

        initGame: function() {
            
            this.currentPlayer = false;

            $(this.players).each(function(idx) {
                this.currentHealth = this.maxHealth;
                this.currentAttackPower = this.startingAttackPower;
                
                var imgDiv = $('<div>').data('idx', idx).addClass('character').html(
                    '<p>' + this.name + '</p><img src="' + this.imgSrc + '" width="150px" /><p id="health-' + idx + '">' + this.currentHealth + '</p>'
                ).appendTo("#player-select");
                
                $('#player-select').show();
            });
        },

        update: function() {
            
        },

        selectPlayer: function(idx) {
            this.currentPlayer = this.players[idx];
            $('#player-select').hide();
            $('#title').text("Select an Opponent");
        }
    };

    //start game
    game.initGame();

    //define interactions
    $('.character').on('click', function() {

        if (!game.currentPlayer) {
            game.selectPlayer($(this).data('idx'));
        }
    });
});