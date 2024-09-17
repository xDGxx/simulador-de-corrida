//É necessário a criação de constante "players" pois os players são objetos

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

/*Declaração de função de um dado com 6 lados
--Match.floor servirá para nos apresentar valores arredondados entre 0 e 5
--Match.random servirá para selecionar os números de forma aleatória
--Return servirá para tronar a função "pública" para o código completo*/
function rollDice() {
  return Math.floor(Math.random * 6) + 1;
}

//Função para gerar de forma aleatória entre 0 e 1 os valores definidos de modo
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
  console.log(`${characterName} 🎲 rolou um dado de ${block}
        ${diceResult} `);
  console.log(`${characterName} 🎲 rolou um dado de ${block}
            ${diceResult} `);
}

//Regra de função de round
async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    //sortear bloco

    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    //rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
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
    }
  }
}

/* Declaração de uma função assincrona com o Main
-- o ({})() informa que a função é autoinvocável, sem necessidade de ser chamada
-- o ` ${} ` é usado para realizar interpolação
-- após o nome do objeto devemos inserir o . para selecionar o atributo
*/
(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...`
  );

  //await = faz com que o código espere essa função ser finalizada para ir para a próxima
  await playRaceEngine(player1, player2);
})();
