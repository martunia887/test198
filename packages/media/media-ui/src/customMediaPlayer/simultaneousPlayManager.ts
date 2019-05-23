export interface Pausable {
  pause: () => any;
}

let players: Pausable[] = [];
let lastPlayed: Pausable;

const findPlayer = (player: Pausable) =>
  players.find(somePlayer => somePlayer === player);

const addPlayer = (player: Pausable) => players.push(player);

const removePlayer = (player: Pausable) => {
  players = players.filter(somePlayer => somePlayer !== player);
};

export default {
  pauseOthers: (player: Pausable) => {
    lastPlayed = player;

    players.forEach(otherPlayer => {
      if (otherPlayer !== player) {
        otherPlayer.pause();
      }
    });
  },
  subscribe: (player: Pausable) => {
    if (!findPlayer(player)) {
      addPlayer(player);
    }
  },
  unsubscribe: (player: Pausable) => {
    removePlayer(player);
  },
  isLastPlayed: (player: Pausable) => player === lastPlayed,
};
