// É necessário a criação de constante "players" pois os players são objetos
const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

/* Declaração de função de um dado com 6 lados */
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Função para gerar de forma aleatória entre 0 e 1 os valores definidos de modo
async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }
  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block}: ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

// Regra de função de round
async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // Sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // Rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // Teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );
      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );
      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }

    if (block === "CONFRONTO") {
      let poweResult1 = diceResult1 + character1.PODER;
      let poweResult2 = diceResult2 + character2.PODER;
      console.log(`${character1.NOME} confrontou com ${character2.NOME}🥊`);
      console.log(`${character2.NOME} confrontou com ${character1.NOME}🥊`);

      await logRollResult(
        character1.NOME,
        "PODER",
        diceResult1,
        character1.PODER
      );
      await logRollResult(
        character2.NOME,
        "PODER",
        diceResult2,
        character2.PODER
      );

      if (poweResult1 > poweResult2) {
        if (character2.PONTOS > 0) {
          console.log(`${character2.NOME} venceu o confronto ! ${character1.NOME} perdeu 1 ponto! 🐢`);
          character2--;
        }
      }

      if (poweResult2 > poweResult1) {
        if (character1.PONTOS > 0) {
          console.log(`${character1.NOME} venceu o confronto ! ${character2.NOME} perdeu 1 ponto! 🐢`);
          character1.PONTOS --;
        }
      }
      if (poweResult2 == poweResult1) {
        console.log("Confronto empatado!")
      }
    }

    // Verificação do vencedor após cada rodada
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou 1 ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou 1 ponto!`);
      character2.PONTOS++;
    }

    console.log("________________________________________________________");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:")
  console.log(`${character1.NOME} : ${character1.PONTOS} ponto(s)`)
  console.log(`${character2.NOME} : ${character2.PONTOS} ponto(s)`)

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n${character1.NOME} venceu a corrida! 🏆`)
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`\n${character2.NOME} venceu a corrida! 🏆`)
  } else{
    console.log("A corrida terminou em empate!")
  }
}

/* Declaração de uma função assincrona com o Main */
(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
