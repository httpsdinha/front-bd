<template>
        <div class="container">
      <nav>
        <nav-component />
      </nav>
      <main>
        <h2>emprestimos</h2>
      </main>
    </div>
</template>

<script>
import navComponent from '../components/navComponent.vue';

export default {
  components: {
    navComponent
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}
main {
  flex-grow: 1;
}
</style>