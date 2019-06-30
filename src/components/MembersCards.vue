<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-10">
      <MembersCardsPanel></MembersCardsPanel>
    </div>
    <div class="col-1"></div>
    <div class="col-1"></div>
    <div class="col-10">
      <MembersSpinner v-if="membersStatus === 'loading'"></MembersSpinner>
      <MembersCard
        v-else
        v-for="(member, i) in members.docs"
        :key="member._id"
        :class="[(i+1) !== members.docs.length ? 'mb-3' : 'mb-5']"
        :member="member"
      ></MembersCard>
    </div>
    <div class="col-1"></div>
    <div class="col-1"></div>
    <div class="col-10">
      <h5 v-if="members.docs && members.docs.length < 1 && !search">This company has no members yet</h5>
      <h5
        v-else-if="members.docs && members.docs.length < 1 && search"
      >Result for "{{ search }}" not found</h5>
      <MembersCardsPagination
        v-else-if="membersStatus === 'notLoading' && members.docs"
        :members="members"
      ></MembersCardsPagination>
    </div>
    <div class="col-1"></div>
  </div>
</template>

<script>
import MembersCardsPanel from "./MembersCardsPanel.vue";
import MembersCardsPagination from "./MembersCardsPagination.vue";
import MembersCard from "./MembersCard.vue";
import MembersSpinner from "./MembersSpinner.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    MembersCardsPagination,
    MembersCard,
    MembersCardsPanel,
    MembersSpinner
  },
  computed: {
    ...mapGetters({
      members: "getMembers",
      membersStatus: "getMembersStatus"
    }),
    search() {
      let { search } = this.$route.query;
      return search;
    }
  }
};
</script>
