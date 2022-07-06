
<script setup>
</script>

<template>
<div class=":view--bookings">
  <form
    class="form"
    @submit.prevent
  >
    <div class=":block--text-input form__input-group">
      <div class="error"></div>
      <input
        class="input"
        id=":view--bookings-form-firstName"
        name="firstName"
        placeholder="_"
        type="text"
      >
      <label for="#\:view--bookings-form-firstName" class="label">First Name *</label>
    </div>

    <div class=":block--text-input form__input-group">
      <div class="error"></div>
      <input
        class="input"
        id=":view--bookings-form-lastName"
        name="lastName"
        placeholder="_"
        type="text"
      >
      <label for="#\:view--bookings-form-lastName" class="label">First Name *</label>
    </div>

    <div class="form__note form__note--fullbleed"></div>

    <div class=":block--text-input form__input-group form__input-group--fullbleed">
      <div class="error">The "email" field must be a valid email address.</div>
      <input
        class="input"
        id=":view--bookings-form-email"
        name="email"
        placeholder="_"
        type="email"
      >
      <label for="#\:view--bookings-form-email" class="label">Email *</label>
    </div>

    <div class="form__note form__note--fullbleed">
      example: +233 (024) 666 2266
    </div>

    <div class=":block--text-input form__input-group form__input-group--fullbleed">
      <div class="error"></div>
      <input
        class="input"
        id=":view--bookings-form-phone"
        name="phone"
        placeholder="_"
        type="tel"
      >
      <label for="#\:view--bookings-form-phone" class="label">Phone *</label>
    </div>

    <div class="form__note form__note--fullbleed"></div>

    <div class=":block--text-input form__input-group form__input-group--fullbleed">
      <div class="error"></div>
      <input
        class="input"
        id=":view--bookings-form-subject"
        name="subject"
        placeholder="_"
        type="tel"
      >
      <label for="#\:view--bookings-form-subject" class="label">Subject *</label>
    </div>

    <div class="form__note form__note--fullbleed">
      Kindly give as much info as possible, such as: date(s), time(s) & location(s) and other relevant info.
    </div>

    <div class=":block--text-input form__input-group form__input-group--fullbleed">
      <div class="error"></div>
      <textarea
        class="input"
        id=":view--bookings-form-message"
        name="message"
        placeholder="_"
      ></textarea>
      <label for="#\:view--bookings-form-message" class="label">Message *</label>
    </div>

    <div class="form__note form__note--fullbleed"></div>

    <button class=":block--button form__button">
      submit
    </button>
  </form>
</div>
</template>

<style lang="scss" scoped>
.\:view--bookings {
  margin-block: 5em;

  & > .form {
    align-items: end;
    display: grid;
    gap: 0.5em 0.75em;
    grid-template-columns: repeat(2, 1fr);
    inline-size: min(100ch, 100%);
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

  @media screen and (min-height: 800px) {
    margin-block-end: 2em;
  }
}
</style>
