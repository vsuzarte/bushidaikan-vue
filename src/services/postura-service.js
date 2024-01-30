export default class QuestionService {
  getRandomQuestions(posturas, quantidade) {
    let numQuestions = 0;
    if(quantidade > 10){
      numQuestions = posturas.length;
    }else{
      numQuestions = quantidade >= posturas.length ? posturas.length : quantidade;
    }

    if(numQuestions === posturas.length){
      return this.createQuestionsForAllPosturas(posturas);
    }else{
      return this.createRandomQuestions(posturas, numQuestions);
    }
  }

  createQuestionsForAllPosturas(posturas) {
    const selectedPosturas = [];
    for (const currentQuestion of posturas) {
      const shuffledOptions = this.generateOptionsForPostura(posturas, currentQuestion);
      selectedPosturas.push(shuffledOptions);
    }
    return selectedPosturas;
  }

  generateOptionsForPostura(posturas, currentQuestion) {
    const otherPosturas = posturas.filter(postura => postura !== currentQuestion);
    const correctOption = {
      nome: currentQuestion.Nome,
      imagem: currentQuestion.Imagem,
      posturaBR: currentQuestion.PosturaBR,
      posturaJP: currentQuestion.PosturaJP,
      isCorrect: true,
    };
    
    const incorrects = this.shuffleArray(otherPosturas).slice(0, 3);
    const incorrectOptions = incorrects.map(incorrectPostura => ({
      nome: incorrectPostura.Nome,
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

  createRandomQuestions(posturas, numQuestions) {
    const allPosturas = [...posturas];
    const selectedPosturas = [];
    for (let i = 0; i < numQuestions; i++) {
      const remainingPosturas = allPosturas.filter(postura => !selectedPosturas.includes(postura));
      const randomIndex = Math.floor(Math.random() * remainingPosturas.length);
      const currentQuestion = remainingPosturas[randomIndex];
      
      const shuffledOptions = this.generateOptionsForPostura(remainingPosturas, currentQuestion);
      selectedPosturas.push(shuffledOptions);
    }
    return selectedPosturas;
  }
}
