<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <h5 class="card-title col-sm-auto">Some title</h5>
        <button
          type="button"
          class="btn btn-primary ml-auto mr-2"
          @click="toggleMode"
        >{{ editMode ? 'Dont save' : 'Edit' }}</button>
        <button v-if="editMode" type="button" class="btn btn-primary" @click="updateMemberData">Save</button>
      </div>

      <!-- first name field -->
      <p class="card-text">
        <span v-if="!editMode">
          <span>first name:&#x20;</span>
          <span>{{ firstName | capitalize }}</span>
        </span>
        <span v-else class="form-inline">
          <label for="inputFirstName" class="col-form-label mr-2">First name:&#x20;</label>
          <input
            v-model="newFirstName"
            type="text"
            class="form-control"
            id="inputFirstName"
            placeholder="First name"
          />
        </span>
      </p>

      <!-- last name field -->
      <p class="card-text">
        <span v-if="!editMode">
          <span>last name:&#x20;</span>
          <span>{{ lastName | capitalize }}</span>
        </span>
        <span v-else class="form-inline">
          <label for="inputLastName" class="col-form-label mr-2">Last name:&#x20;</label>
          <input
            v-model="newLastName"
            type="text"
            class="form-control"
            id="inputLastName"
            placeholder="Last name"
          />
        </span>
      </p>

      <!-- Company field -->
      <p class="card-text">
        <span v-if="!editMode">
          <span>Company:&#x20;</span>
          <span>{{ companyName | capitalize }}</span>
        </span>
        <span v-else class="form-inline">
          <label for="selectCompany" class="col-form-label mr-2">Company:&#x20;</label>
          <select v-model="newCompany" class="form-control" id="selectCompany">
            <option
              v-for="(company, i) in companies"
              :key="i"
              :value="company._id"
            >{{ company.name | capitalize }}</option>
          </select>
        </span>
      </p>

      <!-- Created at field -->
      <p class="card-text">
        <small class="text-muted">created at: {{ member.created_at | moment("from", "now")}}</small>
      </p>
    </div>
  </div>
</template>

<script>
import api from "../api";
import { mapGetters } from "vuex";

export default {
  name: "MemberCard",
  props: ["member"],
  data() {
    return {
      firstName: this.member.firstName,
      lastName: this.member.lastName,
      company_id: this.member.company_id,
      editMode: false,
      newCompany: this.member.company_id,
      newFirstName: this.member.firstName,
      newLastName: this.member.lastName
    };
  },
  computed: {
    ...mapGetters({
      companies: "getNotPaginatedCompanies"
    }),
    companyName() {
      let company = this.companies.find(
        company => company._id === this.company_id
      );

      return company.name;
    }
  },
  methods: {
    toggleMode() {
      this.editMode = !this.editMode;
    },
    async updateMemberData() {
      let payload = {
        member_id: this.member._id,
        firstName: this.newFirstName,
        lastName: this.newLastName,
        company_id: this.newCompany
      };
      await api.updateMemberData(payload);
      this.firstName = this.newFirstName;
      this.lastName = this.newLastName;
      this.company_id = this.newCompany;
      this.toggleMode();
    }
  }
};
</script>
