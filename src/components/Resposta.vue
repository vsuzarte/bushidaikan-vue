<template>
	<div class="col-12">
		<div v-if="acertou" class="col-12 text-center">
			<div class="col-12">
        <span class="resposta"><q-icon color="amber" name="emoji_events" />Parabéns, você acertou!</span>
			</div>
			<p>Sua resposta foi:</p>
			<div class="col-12 bg-green">
				<span class="resposta"><q-icon color="white" size="1em" name="cancel" /> {{ respostaCorreta }}</span>
			</div>
		</div>
		<div v-else class="col-12 text-center">
			<div class="col-12">
				<span class="resposta"><q-icon color="red" name="heart_broken" />Continue tentando!</span>
			</div>
			<p>Sua resposta foi:</p>
			<div class="col-12 bg-red">
				<span class="resposta"><q-icon color="white" size="1em" name="cancel" /> {{ respostaErrada }}</span>
			</div>
			<p>A resposta correta é: </p>
			<div class="col-12 bg-green">
				<span class="resposta"><q-icon color="white" size="1em" name="cancel" /> {{ respostaCorreta }}</span>
			</div>
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
