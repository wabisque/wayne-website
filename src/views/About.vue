
<script setup>
</script>

<template>
<div class=":view--about">
  <img
    alt=""
    class="image"
    loading="lazy"
    :src="$route.meta.image"
  >

  <p class="paragraph">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, accusantium quasi suscipit saepe quod aspernatur necessitatibus debitis numquam, dolore vitae nobis fugiat minima fugit iste eos. Illo, neque. Autem, dolores?
  </p>

  <p class="paragraph">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro blanditiis minus cum culpa mollitia placeat.
  </p>

  <p class="paragraph">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur earum quaerat debitis voluptatibus saepe quas officia, doloribus sequi? Accusantium id aliquam inventore sequi eaque corporis!
  </p>
</div>
</template>

<style lang="scss">
.\:view--about {
  margin-block: 3em;

  & > .paragraph {
    margin-block-start: 1.5em;
  }

  & > .image {
    block-size: 28em;
    inline-size: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media screen and (min-height: 800px) {
    margin-block-end: 0;
  }
}
</style>
