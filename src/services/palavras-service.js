export default class PalavrasService {
  getRandomQuestions(palavras, quantidade) {
    return this.createRandomQuestions(palavras, quantidade);
  }

  createRandomQuestions(palavras, numQuestions) {
    const allPalavras = [...palavras];
    const selectedPalavras = [];
    for (let i = 0; i < numQuestions; i++) {
      const remainingPalavras = allPalavras.filter(palavra => !selectedPalavras.includes(palavra));
      const randomIndex = Math.floor(Math.random() * remainingPalavras.length);
      const currentQuestion = remainingPalavras[randomIndex];
      
      const shuffledOptions = this.generateOptionsForPalavra(remainingPalavras, currentQuestion);
      selectedPalavras.push(shuffledOptions);
    }
    return selectedPalavras;
  }

  generateOptionsForPalavra(palavra, currentQuestion) {
    const otherPalavra = palavra.filter(palavra => palavra !== currentQuestion);
    const correctOption = {
      palavra: currentQuestion.Palavra,
      traducao: currentQuestion.Traducao,
      isCorrect: true,
    };
    
    const incorrects = this.shuffleArray(otherPalavra).slice(0, 3);
    const incorrectOptions = incorrects.map(incorrectPalavra => ({
      traducao: incorrectPalavra.Traducao,
      isCorrect: false,
    }));
    
    const fullOptions = [correctOption, ...incorrectOptions];
    return this.shuffleArray(fullOptions);
  }

  shuffleArray(options) {
    const shuffledArray = [...options];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
}
