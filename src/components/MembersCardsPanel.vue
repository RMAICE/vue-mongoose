<template>
  <div class="row mb-5">
    <div class="dropdown col-2 position-relative">
      <label for="filterBtn" class="d-block">Filter by company</label>
      <button
        id="filterBtn"
        class="btn btn-primary dropdown-toggle"
        type="button"
        aria-haspopup="true"
        :aria-expanded="filterExpanded"
        @click="toggleFilter"
      >{{ companyName | capitalize }}</button>
      <div
        class="dropdown-menu ml-3"
        :class="{'show': filterExpanded}"
        aria-labelledby="dropdownMenuButton"
      >
        <router-link class="dropdown-item" :to="{path: '/members', query: newCompanyQuery}">All</router-link>
        <router-link
          class="dropdown-item"
          v-for="company in companies"
          :key="company._id"
          :to="{path: '/members', query: { ...$route.query, page: '1', company: company._id }}"
        >{{ company.name | capitalize }}</router-link>
      </div>
    </div>
    <form class="form-group col-4 mb-0" @submit.prevent="searchMembers">
      <label for="formControlInput1">Search by first or last name</label>
      <div class="input-group">
        <input
          type="text"
          id="formControlInput1"
          class="form-control"
          placeholder="Search by first or last name"
          aria-label="Search by first or last name"
          aria-describedby="button-addon2"
          v-model="search"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit">Search</button>
        </div>
      </div>
    </form>
    <div class="col-1">
      <label for="perPage">Limit</label>
      <select v-model="perPage" id="perPage" class="custom-select">
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
    <div class="col-2 ml-auto mr-0">
      <p class="text mb-2 text-right">Options</p>
      <button
        class="btn btn-primary d-block ml-auto mr-0"
        type="button"
        @click="setFormState(true)"
      >Add new member</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MembersCardsPanel",
  data() {
    return {
      filterExpanded: false,
      memberAddActive: false
    };
  },
  computed: {
    ...mapGetters({
      companies: "getNotPaginatedCompanies"
    }),
    search: {
      get() {
        return this.$store.state.search;
      },
      set(value) {
        this.changeSearchWord(value);
      }
    },
    perPage: {
      get() {
        return this.$store.state.membersPerPage;
      },
      set(value) {
        this.setMembersPerPage(value);
        this.loadMembers(this.$route.query);
      }
    },
    companyName() {
      let foundedCompany;
      let { company } = this.$route.query;

      if (!company) return "all";

      foundedCompany = this.companies.find(
        eachCompany => eachCompany._id === company
      );

      return foundedCompany.name;
    },
    newCompanyQuery() {
      /**
       * clear the query string by clicking 'all'
       */
      // eslint-disable-next-line no-unused-vars
      let { company, ...query } = this.$route.query;
      let newQuery = { ...query, page: "1" };

      return newQuery;
    }
  },
  methods: {
    ...mapActions({
      changeSearchWord: "changeSearchWord",
      setFormState: "setFormState",
      setMembersPerPage: "setMembersPerPage",
      loadMembers: "fetchMembers"
    }),
    toggleFilter() {
      this.filterExpanded = !this.filterExpanded;
    },
    searchMembers() {
      /**
       * ...(search && {search}) explain https://stackoverflow.com/questions/11704267/in-javascript-how-to-conditionally-add-a-member-to-an-object/40560953#40560953
       * clear the query string if empty search
       */
      // eslint-disable-next-line no-unused-vars
      let { search, ...query } = this.$route.query;
      let newQuery = { ...query, ...(this.search && { search: this.search }) };

      let to = {
        path: "/members",
        query: newQuery
      };
      this.$router.push(to);
    }
  },
  watch: {
    $route() {
      this.filterExpanded = false;
    }
  }
};
</script>
