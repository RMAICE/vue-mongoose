<template>
  <form
    class="add-member-form bg-white shadow rounded py-2"
    :class="{'active': active}"
    @submit.prevent
  >
    <slot></slot>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      active: "getFormState"
    })
  }
};
</script>

<style>
.add-member-form {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translate(100%, -50%);
  opacity: 0;
  visibility: hidden;
  transition: all 300ms;
}
.add-member-form.active {
  opacity: 1;
  visibility: visible;
  transform: translate(0, -50%);
}
</style>
