<template>
  <div class="row">
    <div class="col-2 ml-auto mr-0">
      <button
        class="btn btn-primary d-block ml-auto mr-0"
        type="button"
        @click="setFormState(true)"
      >Add new company</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CompaniesPanel",
  methods: {
    ...mapActions(["setFormState"])
  }
};
</script>
