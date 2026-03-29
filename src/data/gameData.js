/** 站内小游戏列表；卡片 UI 与 Projects 共用 ProjectCard */

const GAME_DATA = [
  {
    id: "pokemon-quiz",
    title: "Pokémon Guest Quiz",
    description:
      "Guess Pokémon from PokéAPI clues: sprite, types, size, abilities, and base stats. Pick Gen 1–9 or full national dex; four choices in English, 日本語, and 中文—with speed bonuses like the original CLI version.",
    image: "/images/games/pokemon-quiz.png",
    playUrl: "/game/pokemon-quiz",
    gitUrl: "https://github.com/Rickyoung221/Pokemon-guest-quiz",
  },
  {
    id: "snake",
    title: "Snake",
    description:
      "Classic 20×20 snake: eat food, grow your chain, avoid walls and yourself. Ported from a Vue side project into this site with the same Solarized-inspired look as the rest of the portfolio.",
    image: "/images/games/snake.svg",
    playUrl: "/game/snake",
    gitUrl: "https://github.com/Rickyoung221/vue-snake-game",
  },
];

export default GAME_DATA;
