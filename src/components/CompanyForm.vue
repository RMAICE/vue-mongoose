<template>
  <div>
    <div class="form-group col">
      <label for="inputCompanyName">Company name</label>
      <input
        v-validate="'required|min:2'"
        data-vv-as="Company name"
        name="companyName"
        v-model="newCompanyName"
        type="text"
        class="form-control"
        id="inputCompanyName"
        placeholder="Company name"
      />
      <span class="badge badge-danger">{{ errors.first('companyName') }}</span>
    </div>
    <div class="form-group col">
      <button v-if="creatingCompany" class="btn btn-primary mr-2" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only">Loading...</span>
      </button>
      <button v-else type="submit" class="btn btn-primary mr-2" @click="createCompany">Create</button>
      <button type="button" class="btn btn-primary" @click="setFormState(false)">Close</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import api from "../api";

export default {
  name: "CompanyForm",
  data() {
    return {
      newCompanyName: "",
      creatingCompany: false
    };
  },
  methods: {
    ...mapActions({
      setFormState: "setFormState",
      loadCompanies: "fetchNotPaginatedCompanies"
    }),
    async createCompany() {
      let data = {
        name: this.newCompanyName
      };
      let validate = await this.$validator.validateAll();
      /**
       * required fields in body: { name: String }
       */
      if (validate) {
        this.creatingCompany = true;
        await api.createCompany(data);
        await this.loadCompanies();
        this.creatingCompany = false;
      }
    }
  }
};
</script>
