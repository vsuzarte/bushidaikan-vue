<template>
    <div class="col-12">
        <div v-if="acertou" class="col-12 text-center">
            <div class="col-12">
                <span class="resposta"><q-icon color="amber" name="emoji_events" />Parabéns, você acertou!</span>
            </div>
            <p>Sua resposta foi:</p>
            <div class="col-12 bg-green">
                <q-card class="my-card q-mb-sm" bordered flat>
                    <img :src="getImagePath(respostaCorreta.imagem)">
                    <q-card-actions class="resposta justify-center bg-green text-white">
                       <span><q-icon color="white" size="1em" name="cancel" /> {{ respostaCorreta.nome }}</span>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        <div v-else class="col-12 text-center">
            <div class="col-12">
                <span class="resposta"><q-icon color="red" name="heart_broken" />Continue tentando!</span>
            </div>
            <p>Sua resposta foi:</p>
            <div class="col-12 bg-red">
                <q-card class="my-card q-mb-sm" bordered flat>
                    <img :src="getImagePath(respostaErrada.imagem)">
                    <q-card-actions class="resposta justify-center bg-red text-white">
                        <span><q-icon color="white" size="1em" name="cancel" /> {{ respostaErrada.nome }}</span>
                    </q-card-actions>
                </q-card>

            </div>
            <p>A resposta correta é: </p>
            <div class="col-12 bg-green">
                <q-card class="my-card q-mb-sm" bordered flat>
                    <img :src="getImagePath(respostaCorreta.imagem)">
                    <q-card-actions class="resposta justify-center bg-green text-white">
                        <span><q-icon color="white" size="1em" name="cancel" /> {{ respostaCorreta.nome }}</span>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RespostaAudio',
    props: {
        acertou: {
            type: Boolean,
            required: true,
        },
        respostaCorreta: {
            type: Object,
            required: true,
        },
        respostaErrada: {
            type: Object,
            required: true,
        }
    },
    methods: {
        getImagePath(imagem) {
            return require(`../assets/images/Tecnicas/${imagem}`);
        },
        getAudioPath(tecnica) {
            const audio = new Audio(require(`@/assets/sounds/tecnicas/${tecnica}`));
            audio.play();
        },
    },
}
</script>

<style scoped></style>
