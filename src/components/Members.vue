<template>
  <div class="container-fluid">
    <MembersCards></MembersCards>
    <AddForm>
      <MemberForm></MemberForm>
    </AddForm>
  </div>
</template>

<script>
import AddForm from "./AddForm.vue";
import MemberForm from "./MemberForm.vue";
import MembersCards from "./MembersCards.vue";
import store from "../store";

import { mapGetters, mapActions } from "vuex";

export default {
  components: { MembersCards, AddForm, MemberForm },
  name: "Members",
  computed: {
    ...mapGetters({
      members: "getMembers"
    })
  },
  methods: {
    ...mapActions({
      loadMembers: "fetchMembers",
      setChangeWord: "changeSearchWord"
    })
  },
  watch: {
    async $route() {
      let { page = 1, search } = this.$route.query;

      if (page > this.members.totalPages)
        return this.$router.push({
          path: "/members",
          query: { ...this.$route.query, page: this.members.totalPages }
        });

      if (search) this.setChangeWord(search);

      return await this.loadMembers(this.$route.query);
    }
  },
  async beforeRouteEnter(from, to, next) {
    await store.dispatch("fetchNotPaginatedCompanies");
    next();
  },
  async mounted() {
    let { search } = this.$route.query;

    if (search) this.setChangeWord(search);

    await this.loadMembers(this.$route.query);
  }
};
</script>
