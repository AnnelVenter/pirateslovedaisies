(function(e) {
  function c() {}
  c.DAMAGE = 1;
  c.RANGE = 2;
  c.SPLASH_RANGE = 4;
  c.RATE_OF_FIRE = 8;
  c.SLOW = 16;
  c.pirates = {
    sabre: [{
        rateOfFire: 1.4,
        projectileDelay: 5,
        damage: 70,
        range: 60,
        splashRange: 0,
        cost: 75,
        motivate: c.RATE_OF_FIRE
      }, {
        rateOfFire: 1.25,
        projectileDelay: 5,
        damage: 140,
        range: 67,
        splashRange: 0,
        cost: 125,
        motivate: c.RATE_OF_FIRE
      }, {
        rateOfFire: 1.05,
        projectileDelay: 6,
        damage: 210,
        range: 85,
        splashRange: 0,
        cost: 150,
        motivate: c.RATE_OF_FIRE | c.DAMAGE
      }
    ],
    cannon: [{
        projectile: "cannon",
        projectileDelay: 2,
        projectileOffset: [28, 20, 23, 28, 23, 41],
        rateOfFire: 1.8,
        damage: 60,
        range: 120,
        splashRange: 50,
        cost: 150,
        motivate: c.SPLASH_RANGE
      }, {
        projectile: "cannon",
        projectileDelay: 2,
        projectileOffset: [28, 20, 23, 28, 23, 41],
        rateOfFire: 1.65,
        damage: 85,
        range: 135,
        splashRange: 60,
        cost: 200,
        motivate: c.SPLASH_RANGE
      }, {
        projectile: "cannon",
        projectileDelay: 2,
        projectileOffset: [28, 20, 23, 28, 23, 41],
        rateOfFire: 1.5,
        damage: 140,
        range: 150,
        splashRange: 70,
        cost: 250,
        motivate: c.SPLASH_RANGE | c.RATE_OF_FIRE
      }
    ],
    cabinBoy: [{
        projectile: "sponge",
        projectileDelay: 13,
        protectileDuration: 16,
        projectileOffset: [12,
          33, 24, 30, 24, 30
        ],
        rateOfFire: 1.4,
        damage: 6,
        range: 95,
        splashRange: 0,
        slowAmount: 0.55,
        slowDuration: 50,
        cost: 100,
        motivate: c.DAMAGE
      }, {
        projectile: "sponge",
        projectileDelay: 13,
        protectileDuration: 16,
        projectileOffset: [12, 43, 24, 30, 24, 30],
        rateOfFire: 1.25,
        damage: 12,
        range: 100,
        splashRange: 0,
        slowAmount: 0.8,
        slowDuration: 70,
        cost: 125,
        motivate: c.DAMAGE
      }, {
        projectile: "sponge",
        projectileDelay: 13,
        protectileDuration: 16,
        projectileOffset: [12, 43, 24, 30, 24, 30],
        rateOfFire: 1.35,
        damage: 20,
        range: 115,
        splashRange: 40,
        slowAmount: 0.7,
        slowDuration: 65,
        cost: 150,
        motivate: c.DAMAGE | c.RANGE
      }
    ],
    shooter: [{
        rateOfFire: 1.2,
        projectileDelay: 12,
        damage: 9,
        range: 128,
        splashRange: 0,
        cost: 50,
        motivate: c.RANGE
      }, {
        rateOfFire: 1.15,
        projectileDelay: 9,
        damage: 14,
        range: 145,
        splashRange: 0,
        cost: 100,
        motivate: c.RANGE
      }, {
        rateOfFire: 1.1,
        projectileDelay: 6,
        damage: 40,
        range: 160,
        splashRange: 0,
        cost: 175,
        motivate: c.RANGE | c.RATE_OF_FIRE
      }
    ],
    captain: [{
        motivation: 1.1,
        range: 60,
        cost: 300
      }, {
        motivation: 1.22,
        range: 60,
        cost: 400
      }, {
        motivation: 1.35,
        range: 100,
        cost: 500
      }
    ]
  };
  c.getPirate = function(a, b) {
    var d = c.pirates[a][b - 1];
    d.resale = d.cost * GameInfo.PIRATE_SALE_MULTIPLIER | 0;
    return new PirateData(a, b, d)
  };
  c.getUpgradeTotal = function(a) {
    return c.pirates[a].length
  };
  e.PirateManager = c
})(window);