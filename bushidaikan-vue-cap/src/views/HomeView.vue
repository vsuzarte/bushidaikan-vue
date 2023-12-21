<template>
  <div class="home">
    <div class="flex-container">
        <div id="menu-container">
            <img id="logo" src="" />
            <h1>Karate-Do Bushidaikan</h1>
            <button id="start-game-btn" class="btn btn-bushi">Quiz das posturas e técnias</button>
            <button id="" class="btn btn-black">Quiz das palavras</button>
        </div>

        <div id="quiz-container">
            <div id="question-container"></div>
            <div id="options-container"></div>
            <div id="result-container" style="display: none;"></div>
            <button id="restart-btn" class="btn-question btn-reiniciar" style="display: none;">Reiniciar</button>
            <button id="back-to-menu-btn" class="btn-question" style="display: none;">Voltar para o Início</button>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  }
}
</script>
