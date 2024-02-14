<template>
      <div class="col-12">
            <div v-if="acertou" class="col-12 text-center">
                  <q-chip color="white" size="lg">
                        <q-icon color="amber" name="emoji_events" />
                        Parabéns, você acertou!
                  </q-chip>
                  <p>Sua resposta foi:</p>
                  <q-chip color="green" size="lg">
                        <q-icon color="white" size="1em" name="check_circle" />
                        {{ respostaCorreta }}
                  </q-chip>
            </div>
            <div v-else class="col-12 text-center">
                  <q-chip color="white" size="lg">
                        <q-icon color="red" name="heart_broken" />
                        Continue tentando!
                  </q-chip>
                  <p>Sua resposta foi:</p>
                  <q-chip color="red" size="lg">
                        <q-icon color="white" size="1em" name="cancel" />
                        {{ respostaErrada }}
                  </q-chip>
                  <p>A resposta correta é: </p>
                  <q-chip color="green" size="lg">
                        <q-icon color="white" size="1em" name="check_circle" />
                        {{ respostaCorreta }}
                  </q-chip>
            </div>
      </div>
</template>

<script>
export default {
      name: 'Resposta',
      props: {
            acertou: {
                  type: Boolean,
                  required: true,
            },
            respostaCorreta: {
                  type: String,
                  required: true,
            },
            respostaErrada: {
                  type: String,
                  required: true,
            }
      },
}
</script>

<style scoped></style>
