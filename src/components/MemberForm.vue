<template>
  <div>
    <div class="form-group col">
      <label for="inputFirstName">First name</label>
      <input
        v-validate="'required|min:2'"
        data-vv-as="First name"
        name="firstName"
        v-model="newFirstName"
        type="text"
        class="form-control"
        id="inputFirstName"
        placeholder="First name"
      />
      <span class="badge badge-danger">{{ errors.first('firstName') }}</span>
    </div>
    <div class="form-group col">
      <label for="inputLastName">Last name</label>
      <input
        v-validate="'required|min:2'"
        data-vv-as="Last name"
        name="lastName"
        v-model="newLastName"
        type="text"
        class="form-control"
        id="inputLastName"
        placeholder="Last name"
      />
      <span class="badge badge-danger">{{ errors.first('lastName') }}</span>
    </div>
    <div class="form-group col">
      <label for="selectCompany">Company</label>
      <select
        v-validate="'required'"
        data-vv-as="Company"
        name="newCompany"
        v-model="newCompany"
        class="custom-select"
        id="selectCompany"
      >
        <option
          v-for="(company) in companies"
          :key="company._id"
          :value="company._id"
        >{{ company.name | capitalize }}</option>
      </select>
      <span class="badge badge-danger">{{ errors.first('newCompany') }}</span>
    </div>
    <div class="form-group col">
      <button v-if="creatingMember" class="btn btn-primary mr-2" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only">Loading...</span>
      </button>
      <button v-else type="submit" class="btn btn-primary mr-2" @click="createMember">Create</button>
      <button type="button" class="btn btn-primary" @click="setFormState(false)">Close</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import api from "../api";
import { delay } from "../helper";

export default {
  data() {
    return {
      newCompany: "",
      newFirstName: "",
      newLastName: "",
      creatingMember: false
    };
  },
  computed: {
    ...mapGetters({
      companies: "getNotPaginatedCompanies"
    })
  },
  methods: {
    ...mapActions({
      setFormState: "setFormState",
      loadMembers: "fetchMembers"
    }),
    async createMember() {
      let data = {
        company_id: this.newCompany,
        firstName: this.newFirstName,
        lastName: this.newLastName
      };
      let validate = await this.$validator.validateAll();
      /**
       * required fields in body: { firstName: String, lastName: String, company_id: String }
       */
      if (validate) {
        this.creatingMember = true;
        await api.createMember(data);
        await this.loadMembers(this.$route.query);
        this.creatingMember = false;
      }
    }
  }
};
</script>
