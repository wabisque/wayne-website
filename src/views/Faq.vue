
<script setup>
</script>

<template>
<div class=":view--faq">
  <h1 class="title">
    frequently asked questions
  </h1>

  <p class="paragraph">
    We've compiled the most-asked questions and hope you find these answers helpful, don't hesitate to contact us if you have any unanswered questions here. We hope to hear from you soon!
  </p>

  <template v-for="question in $route.meta.questions">
    <h4 class="question">
      {{question.question}}
    </h4>

    <p class="paragraph">
      {{question.answer}}
    </p>

    <img
      class="image"
      loading="lazy"
      :src="question.image"
      v-if="question.image"
    >
  </template>
</div>
</template>

<style lang="scss" scoped>
.\:view--faq {
  margin-block-end: 3em;

  & > .title {
    text-align: center;
  }

  & > .paragraph {
    margin-block-start: 1.5em;
  }

  & > .question {
    // font-size: large;
    // font-weight: bold;
    margin-block: 2em 0;
  }

  & > .image {
    block-size: 20em;
    inline-size: 100%;
    margin-block-start: 1.5em;
    object-fit: cover;
    object-position: center;
  }

  @media screen and (min-height: 800px) {
    margin-block-end: 0;
  }
}
</style>
