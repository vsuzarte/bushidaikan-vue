export default class QuestionService {
  getRandomQuestions(gerais, quantidade) {
    
    let numQuestions = quantidade > 20 ? gerais.length : quantidade;

    if(numQuestions === gerais.length){
      return gerais;
    }else{
      return this.createRandomQuestions(gerais, numQuestions);
    }
  }

  createRandomQuestions(gerais, numQuestions) {
    const allGerais = [...gerais];
    const selectedGerais = [];
    for (let i = 0; i < numQuestions; i++) {
      const remainingGerais = allGerais.filter(geral => !selectedGerais.includes(geral));
      const randomIndex = Math.floor(Math.random() * remainingGerais.length);
      const currentQuestion = remainingGerais[randomIndex];
      selectedGerais.push(currentQuestion);
    }
    return selectedGerais;
  }
}
