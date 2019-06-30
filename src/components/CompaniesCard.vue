<template>
  <div class="col-2 p-2">
    <div class="card text-center">
      <div class="card-body">
        <h5 class="card-title">{{company.name | capitalize}}</h5>
        <p class="card-text">Company description</p>
        <router-link class="btn btn-primary" :to="`/members?company=${company._id}`">Company members</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["company"]
};
</script>
