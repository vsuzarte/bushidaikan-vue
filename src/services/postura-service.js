export default class QuestionService {
  getRandomQuestions(posturas, quantidade) {
    
    if(quantidade > 10){
      quantidade = posturas.length;
    }

    const numQuestions = quantidade >= posturas.length  ? posturas.length : quantidade;
    const allPosturas = posturas;
    const selectedPosturas = [];

    for (let i = 0; i < numQuestions; i++) {
      const remainingPosturas = allPosturas.filter(postura => !selectedPosturas.includes(postura));

      const randomIndex = Math.floor(Math.random() * remainingPosturas.length);
      const currentQuestion = remainingPosturas[randomIndex];

      const otherPosturas = remainingPosturas.filter(postura => postura !== currentQuestion);

      // Pegar a postura correta
      const correctOption = {
        nome: currentQuestion.Nome,
        imagem: currentQuestion.Imagem,
        posturaBR: currentQuestion.PosturaBR,
        posturaJP: currentQuestion.PosturaJP,
        isCorrect: true,
      };

      // Pegar 3 posturas incorretas aleatórias
      const incorrects = otherPosturas.sort(() => Math.random() - 0.5).slice(0, 3);

      const incorrectOptions = [];

      incorrects.forEach(incorrectPostura => {
        const incorrectOption = {
          nome: incorrectPostura.Nome,
          isCorrect: false,
        };
        incorrectOptions.push(incorrectOption);
      });

      // Incluir a postura correta em uma posição aleatória
      const fullOptions = [correctOption, ...incorrectOptions];
      const shuffledOptions = fullOptions.sort(() => Math.random() - 0.5);

      selectedPosturas.push(shuffledOptions);
    }

    return selectedPosturas;
  }
}
