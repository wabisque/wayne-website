
<script setup>
</script>

<template>
<div class=":view--service">
  <h1 class="title">
    We'd love to hear from you
  </h1>

  <p class="paragraph">
    Use this page to contact us concerning everything else but bookings.
    To book us for your event or assignment, please go <a class="paragraph__link" href="javascript:void(0);">here</a>
  </p>

  <div class="socials">
    <a
      class="socials__link"
      href="javascript:void(0);"
      @click="link_onclick"
    >
      <svg class="socials__link__icon" viewBox="0 0 24 24">
        <use href="#svg-symbols--instagram"></use>
      </svg>
    </a>

    <a
      class="socials__link"
      href="javascript:void(0);"
      @click="link_onclick"
    >
      <svg class="socials__link__icon" viewBox="0 0 24 24">
        <use href="#svg-symbols--facebook"></use>
      </svg>
    </a>

    <a
      class="socials__link"
      href="javascript:void(0);"
      @click="link_onclick"
    >
      <svg class="socials__link__icon" viewBox="0 0 24 24">
        <use href="#svg-symbols--twitter"></use>
      </svg>
    </a>
  </div>

  <img
    alt=""
    class="image"
    :src="$route.meta.image"
  >

  <form
    class="form"
    @submit.prevent
  >
    <div class=":block--text-input form__input-group">
      <div class="error"></div>
      <input
        class="input"
        id=":view--service-form-firstName"
        name="firstName"
        placeholder="_"
        type="text"
      >
      <label for="#\:view--service-form-firstName" class="label">First Name *</label>
    </div>

    <div class=":block--text-input form__input-group">
      <div class="error"></div>
      <input
        class="input"
        id=":view--service-form-lastName"
        name="lastName"
        placeholder="_"
        type="text"
      >
      <label for="#\:view--service-form-lastName" class="label">First Name *</label>
    </div>

    <div class="form__note form__note--fullbleed"></div>

    <div class=":block--text-input form__input-group form__input-group--fullbleed">
      <div class="error">The "email" field must be a valid email address.</div>
      <input
        class="input"
        id=":view--service-form-email"
        name="email"
        placeholder="_"
        type="email"
      >
      <label for="#\:view--service-form-email" class="label">Email *</label>
    </div>

    <div class="form__note form__note--fullbleed">
      example: +233 (024) 666 2266
    </div>

    <div class=":block--text-input form__input-group form__input-group--fullbleed">
      <div class="error"></div>
      <input
        class="input"
        id=":view--service-form-phone"
        name="phone"
        placeholder="_"
        type="tel"
      >
      <label for="#\:view--service-form-phone" class="label">Phone *</label>
    </div>

    <div class="form__note form__note--fullbleed"></div>

    <div class=":block--text-input form__input-group form__input-group--fullbleed">
      <div class="error"></div>
      <input
        class="input"
        id=":view--service-form-subject"
        name="subject"
        placeholder="_"
        type="tel"
      >
      <label for="#\:view--service-form-subject" class="label">Subject *</label>
    </div>

    <div class="form__note form__note--fullbleed">
      Kindly give as much info as possible, such as: date(s), time(s) & location(s) and other relevant info.
    </div>

    <div class=":block--text-input form__input-group form__input-group--fullbleed">
      <div class="error"></div>
      <textarea
        class="input"
        id=":view--service-form-message"
        name="message"
        placeholder="_"
      ></textarea>
      <label for="#\:view--service-form-message" class="label">Message *</label>
    </div>

    <div class="form__note form__note--fullbleed"></div>

    <button class=":block--button form__button">
      submit
    </button>
  </form>

  <div class="details">
    <div class="details__text">
      <div class="details__text__title">
        Customer Service
      </div>

      <div class="details__text__content">
        <span>info@captureghana.com</span>
        <span>0246662266</span>
      </div>

      <div class="details__text__title">
        Location
      </div>

      <div class="details__text__content">
        <span>East Legon, Abosti Street #5</span>
        <span>beside Irish Pub</span>
      </div>
    </div>

    <div class="details__map"></div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.\:view--service {
  margin-block: 5em;

  & > .title {
    text-align: center;
  }

  & > .paragraph {
    inline-size: min(54ch, 100%);
    margin-block-end: 1.5em;
    margin-inline: auto;
    text-align: center;

    & > .paragraph__link {
      font-weight: bold;
      font-style: italic;
      transition-property: color text-decoration-color;

      &:hover {
        text-decoration-color: hsl(var(--theme-color-mute));
      }
    }
  }

  & > .socials {
    align-items: stretch;
    fill: hsl(var(--theme-color-text));
    display: flex;
    gap: 0.5em;
    justify-content: center;
    margin-block-start: 1.5em;
    transition-property: fill;

    & > .socials__link {
      padding: 0.35em;
      transition-property: fill;

      & > .socials__link__icon {
        inline-size: 1.75em;
      }
    }

    &:hover {
      fill: hsl(var(--theme-color-mute));

      & > .socials__link {
        &:hover {
          fill: hsl(var(--theme-color-text));
        }
      }
    }
  }

  & > .image {
    block-size: 28em;
    inline-size: 100%;
    margin-block-start: 1.5em;
    object-fit: cover;
    object-position: center;
  }

  & > .form {
    align-items: end;
    display: grid;
    gap: 0.5em 0.75em;
    grid-template-columns: repeat(2, 1fr);
    inline-size: min(100ch, 100%);
    margin-block-start: 3em;
    margin-inline: auto;

    & > .form__input-group {
      margin: 0;

      &.form__input-group--fullbleed {
        grid-column: span 2;
      }

      & > textarea.input {
        resize: vertical;
      }
    }

    & > .form__button {
      font-weight: bold;
      justify-self: start;
      margin: 0;
      text-transform: uppercase;
    }

    & > .form__note {
      color: hsl(var(--theme-color-mute));
      font-size: small;
      font-weight: lighter;
      margin-block-start: 0.5em;

      &:not(:empty) {
        &::before {
          content: "\e983  ";
          font-family: 'Feather-Icons';
        }
      }

      &.form__note--fullbleed {
        grid-column: span 2;
      }
    }
  }

  & > .details {
    display: grid;
    gap: 1.5em;
    grid-template-columns: repeat(auto-fit, minmax(min(calc(50ch - 1.5em), 100%), 1fr));
    inline-size: min(100ch, 100%);
    margin-block-start: 3em;
    margin-inline: auto;
    place-items: center;

    & > .details__text {
      & > .details__text__title {
        font-size: medium;
        font-weight: bold;
        margin-block: 1.5em 0.75em;

        &:first-of-type {
          margin-block-start: 0;
        }
      }

      & > .details__text__content {
        display: flex;
        flex-direction: column;
      }
    }

    & > .details__map {
      aspect-ratio: 1 / 1;
      background-color: hsl(var(--theme-color-mute));
      inline-size: 20em;
    }
  }

  @media screen and (min-width: 865px) {
    & > .details {
      & > .details__text {
        justify-self: start;
      }

      & > .details__map {
        justify-self: end;
      }
    }
  }

  @media screen and (min-height: 800px) {
    margin-block-end: 2em;
  }
}
</style>
