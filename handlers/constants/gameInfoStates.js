module.exports = () => {
  return (gameInfoStates = {
    // game_of_the_generals: {
    //   name: "Game of the Generals",
    //   gameID: "game_of_the_generals",
    //   options: {
    //     timer: false,
    //   },
    //   teams: [
    //     {
    //       name: "White",
    //       players: [],
    //       max: 1,
    //     },
    //     {
    //       name: "Black",
    //       players: [],
    //       max: 1,
    //     },
    //     {
    //       name: "Spectators",
    //       players: [],
    //       max: 99,
    //     },
    //   ],
    //   board: [
    //     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //   ],
    //   teamOneTurn: true,
    //   gameOver: false,
    // },
    // golf_gulf: {
    //   name: "Golf Gulf",
    //   gameID: "golf_gulf",
    //   options: {
    //     timer: false,
    //   },
    //   teams: [
    //     {
    //       name: "Players",
    //       players: [],
    //       max: 16,
    //     },
    //     {
    //       name: "Spectators",
    //       players: [],
    //       max: 99,
    //     },
    //   ],
    //   course: 0,
    //   golfInfo: {},
    //   gameOver: false,
    // },
    letris: {
      name: "Letris",
      gameID: "letris",
      options: {
        timer: false,
      },
      teams: [
        {
          name: "Players",
          players: [],
          max: 16,
        },
        {
          name: "Spectators",
          players: [],
          max: 99,
        },
      ],
      letrisInfo: [],
      gameOver: false,
    },
    hackjack: {
      name: "HackJack",
      gameID: "hackjack",
      options: {
        timer: false,
      },
      teams: [
        {
          name: "P1",
          players: [],
          max: 1,
        },
        {
          name: "P2",
          players: [],
          max: 1,
        },
        {
          name: "Spectators",
          players: [],
          max: 99,
        },
      ],
      hackjackInfo: {
        playerOne: {
          name: "",
          stand: false,
        },
        playerTwo: {
          name: "",
          stand: false,
        },
        deck: [],
        board: {
          playedPrograms: {
            playerOne: [],
            playerTwo: []
          },
          storage: {
            playerOne: [],
            playerTwo: []
          },
        },
        programs: {
          playerOne: [],
          playerTwo: []
        },
        turn: ""
      },
      gameOver: false,
    },
    sushi_goat: {
      name: "Sushi Goat",
      gameID: "sushi_goat",
      options: {
        timer: false,
      },
      teams: [
        {
          name: "P1",
          players: [],
          max: 1,
        },
        {
          name: "P2",
          players: [],
          max: 1,
        },
        {
          name: "Spectators",
          players: [],
          max: 99,
        },
      ],
      words: {},
      sushi: {},
      ready: {},
      gameOver: false,
    }
  });
};
