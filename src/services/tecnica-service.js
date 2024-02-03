export default class QuestionService {
  getRandomQuestions(tenicas, quantidade) {
    let numQuestions = 0;
    if(quantidade > 10){
      numQuestions = tenicas.length;
    }else{
      numQuestions = quantidade >= tenicas.length ? tenicas.length : quantidade;
    }

    if(numQuestions === tenicas.length){
      return this.createQuestionsForAllTecnicas(tenicas);
    }else{
      return this.createRandomQuestions(tenicas, numQuestions);
    }
  }

  createQuestionsForAllTecnicas(tenicas) {
    const selectedTecnicas = [];
    for (const currentQuestion of tenicas) {
      const shuffledOptions = this.generateOptionsForTecnica(tenicas, currentQuestion);
      selectedTecnicas.push(shuffledOptions);
    }
    return selectedTecnicas;
  }

  generateOptionsForTecnica(tenicas, currentQuestion) {
    const otherTecnicas = tenicas.filter(tenica => tenica !== currentQuestion);
    const correctOption = {
      nome: currentQuestion.Nome,
      imagem: currentQuestion.Imagem,
      tenicaBR: currentQuestion.TecnicaBR,
      tenicaJP: currentQuestion.TecnicaJP,
      isCorrect: true,
    };
    
    const incorrects = this.shuffleArray(otherTecnicas).slice(0, 3);
    const incorrectOptions = incorrects.map(incorrectTecnica => ({
      nome: incorrectTecnica.Nome,
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

  createRandomQuestions(tenicas, numQuestions) {
    const allTecnicas = [...tenicas];
    const selectedTecnicas = [];
    for (let i = 0; i < numQuestions; i++) {
      const remainingTecnicas = allTecnicas.filter(tenica => !selectedTecnicas.includes(tenica));
      const randomIndex = Math.floor(Math.random() * remainingTecnicas.length);
      const currentQuestion = remainingTecnicas[randomIndex];
      
      const shuffledOptions = this.generateOptionsForTecnica(remainingTecnicas, currentQuestion);
      selectedTecnicas.push(shuffledOptions);
    }
    return selectedTecnicas;
  }
}
