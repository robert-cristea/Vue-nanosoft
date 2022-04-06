<template>
  <md-card class="md-card-profile" :class="{ 'md-card-hidden': cardHidden }">
    <md-card-header>
      <div class="md-card-avatar">
        <slot name="imageProfile"></slot>
      </div>
    </md-card-header>

    <md-card-content>
      <slot name="title"></slot>
      <slot name="content"></slot>
    </md-card-content>

    <md-card-actions>
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "lock-card",
  props: {
    imageProfile: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      cardHidden: true
    };
  },
  beforeMount() {
    setTimeout(this.showCard, 400);
  },
  methods: {
    showCard: function() {
      this.cardHidden = false;
    }
  }
};
</script>

<style lang="css"></style>
