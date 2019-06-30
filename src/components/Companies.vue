<template>
  <div class="companies container-fluid">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <CompaniesPanel></CompaniesPanel>
      </div>
      <div class="col-1"></div>
      <div class="col-1"></div>
      <div class="col-10">
        <div class="row">
          <CompaniesCard v-for="company in companies" :key="company._id" :company="company"></CompaniesCard>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
    <AddForm>
      <CompanyForm></CompanyForm>
    </AddForm>
  </div>
</template>
<script>
import CompaniesCard from "./CompaniesCard.vue";
import CompaniesPanel from "./CompaniesPanel.vue";
import CompanyForm from "./CompanyForm.vue";
import AddForm from "./AddForm.vue";

import store from "../store";
import { mapGetters } from "vuex";

export default {
  name: "Companies",
  components: {
    CompaniesPanel,
    AddForm,
    CompanyForm,
    CompaniesCard
  },
  computed: {
    ...mapGetters({
      companies: "getNotPaginatedCompanies"
    })
  },
  async beforeRouteEnter(from, to, next) {
    await store.dispatch("fetchNotPaginatedCompanies");
    next();
  }
};
</script>
