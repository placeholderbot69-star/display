// ==========================================
// AMONGUSGXMES - Cloudflare Worker Edition
// With Scramjet Proxy + Wisp Server + KV Storage
// ==========================================

import { ScramjetController } from './scramjet.js';

// Game Database - GhostLink + Art Class Enhanced + N-Gon
const GAMES_DB = {
  // N-Gon (Keep working)
  'n-gon': { 
    id: 'n-gon', 
    title: 'N-Gon', 
    category: 'shooter', 
    icon: '🔷',
    url: 'https://landgreen.github.io/n-gon/',
    type: 'iframe',
    proxy: true
  },
  'n-gon-modded': { 
    id: 'n-gon-modded', 
    title: 'N-Gon Modded', 
    category: 'shooter', 
    icon: '⚡',
    url: 'https://3xiondev.github.io/n-gon-upgraded/',
    type: 'iframe',
    proxy: true
  },

  // GhostLink Games
  'gl-1v1lol': { id: 'gl-1v1lol', title: '1v1.LOL', category: 'shooting', icon: '🏗️', url: 'https://1v1.lol/', type: 'iframe', proxy: true },
  'gl-shellshockers': { id: 'gl-shellshockers', title: 'Shell Shockers', category: 'shooting', icon: '🥚', url: 'https://shellshock.io/', type: 'iframe', proxy: true },
  'gl-krunker': { id: 'gl-krunker', title: 'Krunker.io', category: 'shooting', icon: '🔫', url: 'https://krunker.io/', type: 'iframe', proxy: true },
  'gl-zombsroyale': { id: 'gl-zombsroyale', title: 'Zombs Royale', category: 'shooting', icon: '👑', url: 'https://zombsroyale.io/', type: 'iframe', proxy: true },
  'gl-justfall': { id: 'gl-justfall', title: 'JustFall.LOL', category: 'arcade', icon: '🐧', url: 'https://justfall.lol/', type: 'iframe', proxy: true },
  'gl-stumbleguys': { id: 'gl-stumbleguys', title: 'Stumble Guys', category: 'arcade', icon: '🏃', url: 'https://stumbleguys.com/', type: 'iframe', proxy: true },
  'gl-basketbros': { id: 'gl-basketbros', title: 'Basket Bros', category: 'sports', icon: '🏀', url: 'https://basketbros.io/', type: 'iframe', proxy: true },
  'gl-socceronline': { id: 'gl-socceronline', title: 'Soccer Online', category: 'sports', icon: '⚽', url: 'https://socceronline.io/', type: 'iframe', proxy: true },
  'gl-smashkarts': { id: 'gl-smashkarts', title: 'Smash Karts', category: 'racing', icon: '🏎️', url: 'https://smashkarts.io/', type: 'iframe', proxy: true },
  'gl-evowars': { id: 'gl-evowars', title: 'EvoWars.io', category: 'action', icon: '⚔️', url: 'https://evowars.io/', type: 'iframe', proxy: true },
  'gl-bloxd': { id: 'gl-bloxd', title: 'Bloxd.io', category: 'sandbox', icon: '⛏️', url: 'https://bloxd.io/', type: 'iframe', proxy: true },
  'gl-miniblox': { id: 'gl-miniblox', title: 'MiniBlox', category: 'sandbox', icon: '🟫', url: 'https://miniblox.io/', type: 'iframe', proxy: true },
  'gl-lordz': { id: 'gl-lordz', title: 'Lordz.io', category: 'strategy', icon: '👑', url: 'https://lordz.io/', type: 'iframe', proxy: true },
  'gl-moomoo': { id: 'gl-moomoo', title: 'MooMoo.io', category: 'arcade', icon: '🐮', url: 'https://moomoo.io/', type: 'iframe', proxy: true },
  'gl-taming': { id: 'gl-taming', title: 'Taming.io', category: 'arcade', icon: '🐺', url: 'https://taming.io/', type: 'iframe', proxy: true },
  'gl-starve': { id: 'gl-starve', title: 'Starve.io', category: 'survival', icon: '❄️', url: 'https://starve.io/', type: 'iframe', proxy: true },
  'gl-wanderers': { id: 'gl-wanderers', title: 'Wanderers.io', category: 'strategy', icon: '🌍', url: 'https://wanderers.io/', type: 'iframe', proxy: true },
  'gl-raft': { id: 'gl-raft', title: 'Raft.io', category: 'survival', icon: '🌊', url: 'https://raft.io/', type: 'iframe', proxy: true },
  'gl-tribals': { id: 'gl-tribals', title: 'Tribals.io', category: 'survival', icon: '🏹', url: 'https://tribals.io/', type: 'iframe', proxy: true },
  'gl-betrayal': { id: 'gl-betrayal', title: 'Betrayal.io', category: 'arcade', icon: '🔪', url: 'https://betrayal.io/', type: 'iframe', proxy: true },
  'gl-murder': { id: 'gl-murder', title: 'Murder.us', category: 'arcade', icon: '🎭', url: 'https://murder.us/', type: 'iframe', proxy: true },
  'gl-wings': { id: 'gl-wings', title: 'Wings.io', category: 'arcade', icon: '✈️', url: 'https://wings.io/', type: 'iframe', proxy: true },
  'gl-flappyroyale': { id: 'gl-flappyroyale', title: 'Flappy Royale', category: 'arcade', icon: '🐦', url: 'https://flappyroyale.io/', type: 'iframe', proxy: true },
  'gl-bandit': { id: 'gl-bandit', title: 'Bandit.RIP', category: 'shooting', icon: '💀', url: 'https://bandit.rip/', type: 'iframe', proxy: true },
  'gl-repuls': { id: 'gl-repuls', title: 'Repuls.io', category: 'shooting', icon: '🚀', url: 'https://repuls.io/', type: 'iframe', proxy: true },
  'gl-voxiom': { id: 'gl-voxiom', title: 'Voxiom.io', category: 'shooting', icon: '🔫', url: 'https://voxiom.io/', type: 'iframe', proxy: true },
  'gl-crazygames': { id: 'gl-crazygames', title: 'Crazy Games', category: 'arcade', icon: '🎮', url: 'https://crazygames.com/', type: 'iframe', proxy: true },
  'gl-poki': { id: 'gl-poki', title: 'Poki Games', category: 'arcade', icon: '🕹️', url: 'https://poki.com/', type: 'iframe', proxy: true },

  // Art Class Enhanced Games
  'ac-slope': { id: 'ac-slope', title: 'Slope', category: 'arcade', icon: '📐', url: 'https://slope-game.github.io/', type: 'iframe', proxy: true },
  'ac-tunnelrush': { id: 'ac-tunnelrush', title: 'Tunnel Rush', category: 'arcade', icon: '🌈', url: 'https://tunnelrush.github.io/', type: 'iframe', proxy: true },
  'ac-run3': { id: 'ac-run3', title: 'Run 3', category: 'platformer', icon: '🏃', url: 'https://run3.github.io/', type: 'iframe', proxy: true },
  'ac-subwaysurfers': { id: 'ac-subwaysurfers', title: 'Subway Surfers', category: 'arcade', icon: '🚇', url: 'https://subwaysurfersgame.io/', type: 'iframe', proxy: true },
  'ac-templerun2': { id: 'ac-templerun2', title: 'Temple Run 2', category: 'arcade', icon: '🏛️', url: 'https://templerun2.github.io/', type: 'iframe', proxy: true },
  'ac-geometrydash': { id: 'ac-geometrydash', title: 'Geometry Dash', category: 'arcade', icon: '🔷', url: 'https://geometrydash.io/', type: 'iframe', proxy: true },
  'ac-ovo': { id: 'ac-ovo', title: 'OVO', category: 'platformer', icon: '🥚', url: 'https://ovo-game.github.io/', type: 'iframe', proxy: true },
  'ac-vex7': { id: 'ac-vex7', title: 'Vex 7', category: 'platformer', icon: '⚡', url: 'https://vex7.github.io/', type: 'iframe', proxy: true },
  'ac-moto-x3m': { id: 'ac-moto-x3m', title: 'Moto X3M', category: 'racing', icon: '🏍️', url: 'https://moto-x3m.github.io/', type: 'iframe', proxy: true },
  'ac-drifthunters': { id: 'ac-drifthunters', title: 'Drift Hunters', category: 'racing', icon: '🏎️', url: 'https://drift-hunters.github.io/', type: 'iframe', proxy: true },
  'ac-basketballstars': { id: 'ac-basketballstars', title: 'Basketball Stars', category: 'sports', icon: '🏀', url: 'https://basketball-stars.github.io/', type: 'iframe', proxy: true },
  'ac-retrobowl': { id: 'ac-retrobowl', title: 'Retro Bowl', category: 'sports', icon: '🏈', url: 'https://retro-bowl.github.io/', type: 'iframe', proxy: true },
  'ac-footballlegends': { id: 'ac-footballlegends', title: 'Football Legends', category: 'sports', icon: '🏟️', url: 'https://football-legends.github.io/', type: 'iframe', proxy: true },
  'ac-stickmanhook': { id: 'ac-stickmanhook', title: 'Stickman Hook', category: 'arcade', icon: '🪝', url: 'https://stickman-hook.github.io/', type: 'iframe', proxy: true },
  'ac-stack': { id: 'ac-stack', title: 'Stack', category: 'arcade', icon: '📚', url: 'https://stack-game.github.io/', type: 'iframe', proxy: true },
  'ac-jetpackjoyride': { id: 'ac-jetpackjoyride', title: 'Jetpack Joyride', category: 'arcade', icon: '🚀', url: 'https://jetpack-joyride.github.io/', type: 'iframe', proxy: true },
  'ac-fruitninja': { id: 'ac-fruitninja', title: 'Fruit Ninja', category: 'arcade', icon: '🍉', url: 'https://fruit-ninja.github.io/', type: 'iframe', proxy: true },
  'ac-cuttherope': { id: 'ac-cuttherope', title: 'Cut the Rope', category: 'puzzle', icon: '🍬', url: 'https://cut-the-rope.github.io/', type: 'iframe', proxy: true },
  'ac-hillclimbracing': { id: 'ac-hillclimbracing', title: 'Hill Climb Racing', category: 'racing', icon: '🚗', url: 'https://hill-climb-racing.github.io/', type: 'iframe', proxy: true },
  'ac-cookieclicker': { id: 'ac-cookieclicker', title: 'Cookie Clicker', category: 'idle', icon: '🍪', url: 'https://cookie-clicker.github.io/', type: 'iframe', proxy: true },
  'ac-2048': { id: 'ac-2048', title: '2048', category: 'puzzle', icon: '🔢', url: 'https://2048-game.github.io/', type: 'iframe', proxy: true },
  'ac-tetris': { id: 'ac-tetris', title: 'Tetris', category: 'puzzle', icon: '🧱', url: 'https://tetris-game.github.io/', type: 'iframe', proxy: true },
  'ac-pacman': { id: 'ac-pacman', title: 'Pac-Man', category: 'arcade', icon: '👻', url: 'https://pacman-game.github.io/', type: 'iframe', proxy: true },
  'ac-snake': { id: 'ac-snake', title: 'Snake', category: 'arcade', icon: '🐍', url: 'https://snake-game.github.io/', type: 'iframe', proxy: true },
  'ac-chess': { id: 'ac-chess', title: 'Chess', category: 'strategy', icon: '♟️', url: 'https://chess-game.github.io/', type: 'iframe', proxy: true },
  'ac-checkers': { id: 'ac-checkers', title: 'Checkers', category: 'strategy', icon: '⭕', url: 'https://checkers-game.github.io/', type: 'iframe', proxy: true },
  'ac-solitaire': { id: 'ac-solitaire', title: 'Solitaire', category: 'card', icon: '🃏', url: 'https://solitaire-game.github.io/', type: 'iframe', proxy: true },
  'ac-minesweeper': { id: 'ac-minesweeper', title: 'Minesweeper', category: 'puzzle', icon: '💣', url: 'https://minesweeper-game.github.io/', type: 'iframe', proxy: true },
  'ac-wordle': { id: 'ac-wordle', title: 'Wordle', category: 'puzzle', icon: '📝', url: 'https://wordle-game.github.io/', type: 'iframe', proxy: true },
  'ac-crossyroad': { id: 'ac-crossyroad', title: 'Crossy Road', category: 'arcade', icon: '🐔', url: 'https://crossy-road.github.io/', type: 'iframe', proxy: true },
  'ac-flappybird': { id: 'ac-flappybird', title: 'Flappy Bird', category: 'arcade', icon: '🐦', url: 'https://flappy-bird.github.io/', type: 'iframe', proxy: true },
  'ac-dinogame': { id: 'ac-dinogame', title: 'Dino Game', category: 'arcade', icon: '🦕', url: 'https://dino-game.github.io/', type: 'iframe', proxy: true },
  'ac-hexgl': { id: 'ac-hexgl', title: 'HexGL', category: 'racing', icon: '🚀', url: 'https://hexgl.github.io/', type: 'iframe', proxy: true },
  'ac-astray': { id: 'ac-astray', title: 'Astray', category: 'puzzle', icon: '🧩', url: 'https://astray-game.github.io/', type: 'iframe', proxy: true },
  'ac-clumsybird': { id: 'ac-clumsybird', title: 'Clumsy Bird', category: 'arcade', icon: '🐦', url: 'https://clumsy-bird.github.io/', type: 'iframe', proxy: true },
  'ac-2048cupcakes': { id: 'ac-2048cupcakes', title: '2048 Cupcakes', category: 'puzzle', icon: '🧁', url: 'https://2048-cupcakes.github.io/', type: 'iframe', proxy: true },
  'ac-littlealchemy': { id: 'ac-littlealchemy', title: 'Little Alchemy', category: 'puzzle', icon: '⚗️', url: 'https://little-alchemy.github.io/', type: 'iframe', proxy: true },
  'ac-sandspiel': { id: 'ac-sandspiel', title: 'Sandspiel', category: 'sandbox', icon: '🏖️', url: 'https://sandspiel.github.io/', type: 'iframe', proxy: true },
  'ac-powdergame': { id: 'ac-powdergame', title: 'Powder Game', category: 'sandbox', icon: '💨', url: 'https://powder-game.github.io/', type: 'iframe', proxy: true },
  'ac-cellmachine': { id: 'ac-cellmachine', title: 'Cell Machine', category: 'puzzle', icon: '🧬', url: 'https://cell-machine.github.io/', type: 'iframe', proxy: true },
  'ac-icecube': { id: 'ac-icecube', title: 'Ice Cube', category: 'puzzle', icon: '🧊', url: 'https://ice-cube.github.io/', type: 'iframe', proxy: true },
  'ac-push': { id: 'ac-push', title: 'Push', category: 'puzzle', icon: '📦', url: 'https://push-game.github.io/', type: 'iframe', proxy: true },
  'ac-sokoban': { id: 'ac-sokoban', title: 'Sokoban', category: 'puzzle', icon: '📦', url: 'https://sokoban-game.github.io/', type: 'iframe', proxy: true },
  'ac-maze': { id: 'ac-maze', title: 'Maze', category: 'puzzle', icon: '🌀', url: 'https://maze-game.github.io/', type: 'iframe', proxy: true },
  'ac-towerdefense': { id: 'ac-towerdefense', title: 'Tower Defense', category: 'strategy', icon: '🏰', url: 'https://tower-defense.github.io/', type: 'iframe', proxy: true },
  'ac-bloonstd': { id: 'ac-bloonstd', title: 'Bloons TD', category: 'strategy', icon: '🎈', url: 'https://bloons-td.github.io/', type: 'iframe', proxy: true },
  'ac-agesofwar': { id: 'ac-agesofwar', title: 'Ages of War', category: 'strategy', icon: '⚔️', url: 'https://ages-of-war.github.io/', type: 'iframe', proxy: true },
  'ac-stickwar': { id: 'ac-stickwar', title: 'Stick War', category: 'strategy', icon: '⚔️', url: 'https://stick-war.github.io/', type: 'iframe', proxy: true },
  'ac-ducklife': { id: 'ac-ducklife', title: 'Duck Life', category: 'arcade', icon: '🦆', url: 'https://duck-life.github.io/', type: 'iframe', proxy: true },
  'ac-learn2fly': { id: 'ac-learn2fly', title: 'Learn 2 Fly', category: 'arcade', icon: '🐧', url: 'https://learn-2-fly.github.io/', type: 'iframe', proxy: true },
  'ac-shoppingcart': { id: 'ac-shoppingcart', title: 'Shopping Cart Hero', category: 'arcade', icon: '🛒', url: 'https://shopping-cart-hero.github.io/', type: 'iframe', proxy: true },
  'ac-pottyracers': { id: 'ac-pottyracers', title: 'Potty Racers', category: 'racing', icon: '🚽', url: 'https://potty-racers.github.io/', type: 'iframe', proxy: true },
  'ac-earntodie': { id: 'ac-earntodie', title: 'Earn to Die', category: 'racing', icon: '🧟', url: 'https://earn-to-die.github.io/', type: 'iframe', proxy: true },
  'ac-roadofdead': { id: 'ac-roadofdead', title: 'Road of the Dead', category: 'racing', icon: '💀', url: 'https://road-of-the-dead.github.io/', type: 'iframe', proxy: true },
  'ac-driftboss': { id: 'ac-driftboss', title: 'Drift Boss', category: 'racing', icon: '🏎️', url: 'https://drift-boss.github.io/', type: 'iframe', proxy: true },
  'ac-driftking': { id: 'ac-driftking', title: 'Drift King', category: 'racing', icon: '👑', url: 'https://drift-king.github.io/', type: 'iframe', proxy: true },
  'ac-carsimulator': { id: 'ac-carsimulator', title: 'Car Simulator', category: 'racing', icon: '🚗', url: 'https://car-simulator.github.io/', type: 'iframe', proxy: true },
  'ac-parkingfury': { id: 'ac-parkingfury', title: 'Parking Fury', category: 'racing', icon: '🅿️', url: 'https://parking-fury.github.io/', type: 'iframe', proxy: true },
  'ac-drawpark': { id: 'ac-drawpark', title: 'Draw Park', category: 'puzzle', icon: '🅿️', url: 'https://draw-park.github.io/', type: 'iframe', proxy: true },
  'ac-papaspizzeria': { id: 'ac-papaspizzeria', title: "Papa's Pizzeria", category: 'arcade', icon: '🍕', url: 'https://papas-pizzeria.github.io/', type: 'iframe', proxy: true },
  'ac-papasfreezeria': { id: 'ac-papasfreezeria', title: "Papa's Freezeria", category: 'arcade', icon: '🍦', url: 'https://papas-freezeria.github.io/', type: 'iframe', proxy: true },
  'ac-papascheeseria': { id: 'ac-papascheeseria', title: "Papa's Cheeseria", category: 'arcade', icon: '🧀', url: 'https://papas-cheeseria.github.io/', type: 'iframe', proxy: true },
  'ac-papasbakeria': { id: 'ac-papasbakeria', title: "Papa's Bakeria", category: 'arcade', icon: '🥧', url: 'https://papas-bakeria.github.io/', type: 'iframe', proxy: true },
  'ac-papassushiria': { id: 'ac-papassushiria', title: "Papa's Sushiria", category: 'arcade', icon: '🍣', url: 'https://papas-sushiria.github.io/', type: 'iframe', proxy: true },
  'ac-papashotdoggeria': { id: 'ac-papashotdoggeria', title: "Papa's Hot Doggeria", category: 'arcade', icon: '🌭', url: 'https://papas-hot-doggeria.github.io/', type: 'iframe', proxy: true },
  'ac-papaspancakeria': { id: 'ac-papaspancakeria', title: "Papa's Pancakeria", category: 'arcade', icon: '🥞', url: 'https://papas-pancakeria.github.io/', type: 'iframe', proxy: true },
  'ac-papaswingeria': { id: 'ac-papaswingeria', title: "Papa's Wingeria", category: 'arcade', icon: '🍗', url: 'https://papas-wingeria.github.io/', type: 'iframe', proxy: true },
  'ac-papastacomia': { id: 'ac-papastacomia', title: "Papa's Taco Mia", category: 'arcade', icon: '🌮', url: 'https://papas-taco-mia.github.io/', type: 'iframe', proxy: true },
  'ac-papascupcakeria': { id: 'ac-papascupcakeria', title: "Papa's Cupcakeria", category: 'arcade', icon: '🧁', url: 'https://papas-cupcakeria.github.io/', type: 'iframe', proxy: true },
  'ac-papasdonuteria': { id: 'ac-papasdonuteria', title: "Papa's Donuteria", category: 'arcade', icon: '🍩', url: 'https://papas-donuteria.github.io/', type: 'iframe', proxy: true },
  'ac-papaspastaria': { id: 'ac-papaspastaria', title: "Papa's Pastaria", category: 'arcade', icon: '🍝', url: 'https://papas-pastaria.github.io/', type: 'iframe', proxy: true },
  'ac-papasburgeria': { id: 'ac-papasburgeria', title: "Papa's Burgeria", category: 'arcade', icon: '🍔', url: 'https://papas-burgeria.github.io/', type: 'iframe', proxy: true },
  'ac-fireboywatergirl': { id: 'ac-fireboywatergirl', title: 'Fireboy & Watergirl', category: 'puzzle', icon: '🔥', url: 'https://fireboy-and-watergirl.github.io/', type: 'iframe', proxy: true },
  'ac-fireboywatergirl2': { id: 'ac-fireboywatergirl2', title: 'Fireboy & Watergirl 2', category: 'puzzle', icon: '💧', url: 'https://fireboy-and-watergirl-2.github.io/', type: 'iframe', proxy: true },
  'ac-fireboywatergirl3': { id: 'ac-fireboywatergirl3', title: 'Fireboy & Watergirl 3', category: 'puzzle', icon: '🌲', url: 'https://fireboy-and-watergirl-3.github.io/', type: 'iframe', proxy: true },
  'ac-fireboywatergirl4': { id: 'ac-fireboywatergirl4', title: 'Fireboy & Watergirl 4', category: 'puzzle', icon: '💎', url: 'https://fireboy-and-watergirl-4.github.io/', type: 'iframe', proxy: true },
  'ac-bobtherobber': { id: 'ac-bobtherobber', title: 'Bob the Robber', category: 'puzzle', icon: '🦹', url: 'https://bob-the-robber.github.io/', type: 'iframe', proxy: true },
  'ac-bobtherobber2': { id: 'ac-bobtherobber2', title: 'Bob the Robber 2', category: 'puzzle', icon: '🦹', url: 'https://bob-the-robber-2.github.io/', type: 'iframe', proxy: true },
  'ac-ctv': { id: 'ac-ctv', title: 'Cursed Treasure', category: 'strategy', icon: '💎', url: 'https://cursed-treasure.github.io/', type: 'iframe', proxy: true },
  'ac-ctv2': { id: 'ac-ctv2', title: 'Cursed Treasure 2', category: 'strategy', icon: '💎', url: 'https://cursed-treasure-2.github.io/', type: 'iframe', proxy: true },
  'ac-kingdomrush': { id: 'ac-kingdomrush', title: 'Kingdom Rush', category: 'strategy', icon: '🏰', url: 'https://kingdom-rush.github.io/', type: 'iframe', proxy: true },
  'ac-kingdomrushfrontiers': { id: 'ac-kingdomrushfrontiers', title: 'Kingdom Rush Frontiers', category: 'strategy', icon: '🏰', url: 'https://kingdom-rush-frontiers.github.io/', type: 'iframe', proxy: true },
  'ac-kingdomrushorigins': { id: 'ac-kingdomrushorigins', title: 'Kingdom Rush Origins', category: 'strategy', icon: '🏰', url: 'https://kingdom-rush-origins.github.io/', type: 'iframe', proxy: true },
  'ac-kingdomrushvengeance': { id: 'ac-kingdomrushvengeance', title: 'Kingdom Rush Vengeance', category: 'strategy', icon: '🏰', url: 'https://kingdom-rush-vengeance.github.io/', type: 'iframe', proxy: true },
  'ac-ironhide': { id: 'ac-ironhide', title: 'Iron Hide', category: 'strategy', icon: '🛡️', url: 'https://iron-hide.github.io/', type: 'iframe', proxy: true },
  'ac-ironhide2': { id: 'ac-ironhide2', title: 'Iron Hide 2', category: 'strategy', icon: '🛡️', url: 'https://iron-hide-2.github.io/', type: 'iframe', proxy: true },
  'ac-ironhide3': { id: 'ac-ironhide3', title: 'Iron Hide 3', category: 'strategy', icon: '🛡️', url: 'https://iron-hide-3.github.io/', type: 'iframe', proxy: true },
  'ac-ironhide4': { id: 'ac-ironhide4', title: 'Iron Hide 4', category: 'strategy', icon: '🛡️', url: 'https://iron-hide-4.github.io/', type: 'iframe', proxy: true },
  'ac-ironhide5': { id: 'ac-ironhide5', title: 'Iron Hide 5', category: 'strategy', icon: '🛡️', url: 'https://iron-hide-5.github.io/', type: 'iframe', proxy: true },
  'ac-ironhide6': { id: 'ac-ironhide6', title: 'Iron Hide 6', category: 'strategy', icon: '🛡️', url: 'https://iron-hide-6.github.io/', type: 'iframe', proxy: true },
  'ac-ironhide7': { id: 'ac-ironhide7', title: 'Iron Hide 7', category: 'strategy', icon: '🛡️', url: 'https://iron-hide-7.github.io/', type: 'iframe', proxy: true },
  'ac-ironhide8': { id: 'ac-ironhide8', title: 'Iron Hide 8', category: 'strategy', icon: '🛡️', url: 'https://iron-hide-8.github.io/', type: 'iframe', proxy: true },
  'ac-ironhide9': { id: 'ac-ironhide9', title: 'Iron Hide 9', category: 'strategy', icon: '🛡️', url: 'https://iron-hide-9.github.io/', type: 'iframe', proxy: true },
  'ac-ironhide10': { id: 'ac-ironhide10', title: 'Iron Hide 10', category: 'strategy', icon: '🛡️', url: 'https://iron-hide-10.github.io/', type: 'iframe', proxy: true },
};

// Scramjet Controller for proxy
class ScramjetController {
  constructor(config = {}) {
    this.config = {
      prefix: config.prefix || '/p/',
      codec: config.codec || 'plain',
      ws: config.ws || '/w/',
      ...config
    };
  }

  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Handle proxy requests
    if (path.startsWith(this.config.prefix)) {
      return this.handleProxy(request, env);
    }
    
    // Handle WebSocket/Wisp
    if (path.startsWith(this.config.ws)) {
      return this.handleWisp(request, env);
    }
    
    // Handle game routes
    if (path.startsWith('/g/')) {
      return this.handleGame(request, env);
    }
    
    // Handle game ID routes
    const gameMatch = path.match(/^\/id:(\d+)$/);
    if (gameMatch) {
      return this.handleGameById(gameMatch[1], env);
    }
    
    // Serve main app
    return this.serveApp(env);
  }

  async handleProxy(request, env) {
    const url = new URL(request.url);
    const targetUrl = decodeURIComponent(url.pathname.replace(this.config.prefix, '')) + url.search + url.hash;
    
    if (!targetUrl.startsWith('http')) {
      return new Response('Invalid URL', { status: 400 });
    }

    try {
      // Fetch with modified headers
      const proxyRequest = new Request(targetUrl, {
        method: request.method,
        headers: {
          ...Object.fromEntries(request.headers),
          'Origin': null,
          'Referer': null
        },
        body: request.body
      });

      const response = await fetch(proxyRequest);
      
      // Process response based on content type
      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('text/html')) {
        let body = await response.text();
        body = this.processHtml(body, targetUrl);
        return new Response(body, {
          status: response.status,
          headers: {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
      
      return new Response(response.body, {
        status: response.status,
        headers: {
          ...Object.fromEntries(response.headers),
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (e) {
      return new Response(`Proxy Error: ${e.message}`, { status: 500 });
    }
  }

  processHtml(html, baseUrl) {
    const base = new URL(baseUrl);
    
    // Inject Scramjet client
    const scramjetClient = `
      <script>
        (function() {
          const scramjet = {
            prefix: '${this.config.prefix}',
            encode: (url) => '${this.config.prefix}' + encodeURIComponent(url),
            rewriteUrl: (url) => {
              if (!url || url.startsWith('data:') || url.startsWith('javascript:')) return url;
              if (url.startsWith('//')) return '${this.config.prefix}https:' + url;
              if (url.startsWith('/')) return '${this.config.prefix}${base.origin}' + url;
              if (!url.startsWith('http')) return '${this.config.prefix}${base.origin}/' + url;
              return '${this.config.prefix}' + url;
            }
          };
          
          // Rewrite all links
          document.addEventListener('click', (e) => {
            const a = e.target.closest('a');
            if (a && a.href) {
              const newUrl = scramjet.rewriteUrl(a.href);
              if (newUrl !== a.href) {
                e.preventDefault();
                window.location.href = newUrl;
              }
            }
          });
          
          // Rewrite fetch and XHR
          const originalFetch = window.fetch;
          window.fetch = function(url, options) {
            if (typeof url === 'string') url = scramjet.rewriteUrl(url);
            return originalFetch.call(this, url, options);
          };
          
          // Rewrite WebSocket
          const OriginalWebSocket = window.WebSocket;
          window.WebSocket = function(url, protocols) {
            if (url.includes('//')) {
              url = '${this.config.ws}' + encodeURIComponent(url);
            }
            return new OriginalWebSocket(url, protocols);
          };
        })();
      </script>
    `;
    
    return html.replace(/<head>/i, `<head><base href="${base.origin}/">${scramjetClient}`);
  }

  async handleWisp(request, env) {
    // WebSocket/Wisp server implementation
    const upgradeHeader = request.headers.get('Upgrade');
    if (upgradeHeader !== 'websocket') {
      return new Response('Expected WebSocket', { status: 400 });
    }

    const [client, server] = Object.values(new WebSocketPair());
    
    server.accept();
    
    // Handle Wisp protocol
    server.addEventListener('message', async (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'connect') {
          // Establish connection to target
          const targetWs = new WebSocket(data.url);
          
          targetWs.addEventListener('message', (e) => {
            server.send(JSON.stringify({ type: 'data', data: e.data }));
          });
          
          targetWs.addEventListener('close', () => {
            server.close();
          });
          
          // Store connection in Durable Object (simplified)
          env.WISP_CONNECTIONS = env.WISP_CONNECTIONS || new Map();
          env.WISP_CONNECTIONS.set(data.id, targetWs);
        }
        
        if (data.type === 'data') {
          const conn = env.WISP_CONNECTIONS?.get(data.id);
          if (conn) conn.send(data.data);
        }
      } catch (e) {
        server.send(JSON.stringify({ type: 'error', message: e.message }));
      }
    });

    return new Response(null, { status: 101, webSocket: client });
  }

  async handleGame(request, env) {
    const url = new URL(request.url);
    const gameId = url.pathname.replace('/g/', '');
    const game = GAMES_DB[gameId];
    
    if (!game) {
      return new Response('Game not found', { status: 404 });
    }

    // Track game open in KV
    await env.GAME_STATS.put(`opens:${gameId}`, Date.now().toString(), { expirationTtl: 86400 });
    
    // Return game page with embedded iframe
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${game.title} | AMONGUSGXMES</title>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0a0a; color: #fff; font-family: system-ui; overflow: hidden; }
    .header { 
      height: 50px; 
      background: linear-gradient(90deg, #ff1a1a, #8b0000);
      display: flex; 
      align-items: center; 
      justify-content: space-between;
      padding: 0 20px;
    }
    .title { font-weight: 700; font-size: 1.1rem; }
    .controls { display: flex; gap: 10px; }
    .btn { 
      padding: 8px 16px; 
      background: rgba(0,0,0,0.3); 
      border: none; 
      color: #fff; 
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.85rem;
    }
    .btn:hover { background: rgba(0,0,0,0.5); }
    .game-container { 
      position: fixed; 
      top: 50px; 
      left: 0; 
      right: 0; 
      bottom: 0;
    }
    iframe { width: 100%; height: 100%; border: none; }
    .save-indicator {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #00ff66;
      color: #000;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 700;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .save-indicator.show { opacity: 1; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">🎮 ${game.title}</div>
    <div class="controls">
      <button class="btn" onclick="saveGame()">💾 Save</button>
      <button class="btn" onclick="toggleFullscreen()">⛶ Fullscreen</button>
      <button class="btn" onclick="location.href='/'">✕ Close</button>
    </div>
  </div>
  <div class="game-container">
    <iframe src="${this.config.prefix}${encodeURIComponent(game.url)}" allowfullscreen></iframe>
  </div>
  <div class="save-indicator" id="saveIndicator">💾 Game Saved!</div>
  
  <script>
    // Auto-save game state
    let gameState = {};
    
    window.addEventListener('message', (e) => {
      if (e.data?.type === 'gameState') {
        gameState = e.data.state;
      }
    });
    
    function saveGame() {
      fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game: '${gameId}', state: gameState, timestamp: Date.now() })
      }).then(() => {
        const indicator = document.getElementById('saveIndicator');
        indicator.classList.add('show');
        setTimeout(() => indicator.classList.remove('show'), 2000);
      });
    }
    
    // Auto-save every 30 seconds
    setInterval(saveGame, 30000);
    
    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
    
    // Load saved state on start
    fetch('/api/load?game=${gameId}')
      .then(r => r.json())
      .then(data => {
        if (data.state) {
          const iframe = document.querySelector('iframe');
          iframe.contentWindow.postMessage({ type: 'loadState', state: data.state }, '*');
        }
      });
  <\/script>
</body>
</html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  async handleGameById(id, env) {
    const gameId = Object.keys(GAMES_DB)[parseInt(id)];
    if (!gameId) return new Response('Game not found', { status: 404 });
    
    return Response.redirect(`/g/${gameId}`, 302);
  }

  async serveApp(env) {
    // Serve the main app HTML
    const html = await env.ASSETS.fetch(new URL('/index.html', 'http://localhost'));
    return html;
  }
}

// Main Worker Export
export default {
  async fetch(request, env, ctx) {
    const controller = new ScramjetController({
      prefix: '/p/',
      ws: '/w/',
      codec: 'plain'
    });
    
    // API Routes
    const url = new URL(request.url);
    
    if (url.pathname === '/api/games') {
      return new Response(JSON.stringify(GAMES_DB), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (url.pathname === '/api/save' && request.method === 'POST') {
      const { game, state, timestamp } = await request.json();
      const userId = request.headers.get('CF-Connecting-IP') || 'anonymous';
      const key = `save:${userId}:${game}`;
      await env.GAME_SAVES.put(key, JSON.stringify({ state, timestamp }));
      return new Response('OK');
    }
    
    if (url.pathname === '/api/load') {
      const game = url.searchParams.get('game');
      const userId = request.headers.get('CF-Connecting-IP') || 'anonymous';
      const key = `save:${userId}:${game}`;
      const data = await env.GAME_SAVES.get(key);
      return new Response(data || '{}', {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (url.pathname === '/api/stats') {
      const gameId = url.searchParams.get('game');
      const opens = await env.GAME_STATS.get(`opens:${gameId}`);
      return new Response(JSON.stringify({ opens: parseInt(opens) || 0 }));
    }
    
    return controller.fetch(request, env);
  }
};
