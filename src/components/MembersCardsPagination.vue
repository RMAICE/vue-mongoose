<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination d-flex justify-content-center">
      <li class="page-item" :class="{'disabled': !members.hasPrevPage}">
        <router-link
          class="page-link"
          aria-label="Previous"
          :to="{ path: '/members', query: { ...$route.query, page: members.prevPage } }"
          :tabindex="members.hasPrevPage ? '0' : '-1'"
        >
          <span :aria-hidden="members.hasPrevPage ? false : true">Previous</span>
        </router-link>
      </li>
      <li v-if="members.hasPrevPage" class="page-item">
        <router-link
          class="page-link"
          :to="{ path: '/members', query: { ...$route.query, page: members.page - 1 } }"
        >{{ members.page - 1 }}</router-link>
      </li>
      <li class="page-item active">
        <span class="page-link">{{ members.page}}</span>
      </li>
      <li v-if="members.hasNextPage" class="page-item">
        <router-link
          class="page-link"
          :to="{ path: '/members', query: { ...$route.query, page: members.page + 1 } }"
        >{{ members.page + 1 }}</router-link>
      </li>
      <li class="page-item" :class="{'disabled': !members.hasNextPage}">
        <router-link
          class="page-link"
          :to="{ path: '/members', query: { ...$route.query, page: members.nextPage } }"
          aria-label="Next"
          :tabindex="members.hasNextPage ? '0' : '-1'"
        >
          <span aria-hidden="true">Next</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "MembersCardsPagination",
  props: ["members"]
};
</script>
