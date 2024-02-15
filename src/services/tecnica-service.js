export default class QuestionService {
  getRandomQuestions(tecnicas, quantidade) {
    let numQuestions = 0;
    if(quantidade > 10){
      numQuestions = tecnicas.length;
    }else{
      numQuestions = quantidade >= tecnicas.length ? tecnicas.length : quantidade;
    }

    if(numQuestions === tecnicas.length){
      return this.createQuestionsForAllTecnicas(tecnicas);
    }else{
      return this.createRandomQuestions(tecnicas, numQuestions);
    }
  }

  createQuestionsForAllTecnicas(tecnicas) {
    const selectedTecnicas = [];
    for (const currentQuestion of tecnicas) {
      const shuffledOptions = this.generateOptionsForTecnica(tecnicas, currentQuestion);
      selectedTecnicas.push(shuffledOptions);
    }
    return selectedTecnicas;
  }

  generateOptionsForTecnica(tecnicas, currentQuestion) {
    const otherTecnicas = tecnicas.filter(tecnica => tecnica !== currentQuestion);
    const correctOption = {
      nome: currentQuestion.Nome,
      imagem: currentQuestion.Imagem,
      tecnicaBR: currentQuestion.TecnicaBR,
      tecnicaJP: currentQuestion.TecnicaJP,
      audio: currentQuestion.Audio,
      isCorrect: true,
    };
    
    const incorrects = this.shuffleArray(otherTecnicas).slice(0, 3);
    const incorrectOptions = incorrects.map(incorrectTecnica => ({
      nome: incorrectTecnica.Nome,
      audio: incorrectTecnica.Audio,
      imagem: incorrectTecnica.Imagem,
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

  createRandomQuestions(tecnicas, numQuestions) {
    const allTecnicas = [...tecnicas];
    const selectedTecnicas = [];
    for (let i = 0; i < numQuestions; i++) {
      const remainingTecnicas = allTecnicas.filter(tecnica => !selectedTecnicas.includes(tecnica));
      const randomIndex = Math.floor(Math.random() * remainingTecnicas.length);
      const currentQuestion = remainingTecnicas[randomIndex];
      
      const shuffledOptions = this.generateOptionsForTecnica(remainingTecnicas, currentQuestion);
      selectedTecnicas.push(shuffledOptions);
    }
    return selectedTecnicas;
  }
}
