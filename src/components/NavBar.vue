<template>
  <div class="container-fluid mb-5">
    <nav class="row navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="col-1"></div>
      <ul class="col-10 navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" exact-active-class="active" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" to="/members">Members</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" to="/companies">Companies</router-link>
        </li>
      </ul>
      <div class="col-1"></div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "nav-bar"
};
</script>
