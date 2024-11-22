<template>
  <div class="container">
    <nav>
      <nav-component />
    </nav>
    <main>
      <header>
        <div class="header-content">
          <div class="logs">
            <img src="@/assets/log_azul.png">
            <h2>Logs</h2>
          </div>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td v-for="column in columns" :key="column">{{ row[column] }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
import { reactive } from 'vue';
import navComponent from '../components/navComponent.vue';
import axios from 'axios';

export default {
  components: {
    navComponent
  },
  data() {
    return {
      columns: [],
      rows: reactive([]),
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/logs');
        const data = response.data;
        if (data.length > 0) {
          this.columns = Object.keys(data[0]);
          this.rows = data;
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

h2 {
  color: #2A5184;
  font-family: 'Judson';
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

header {
  margin-top: 3rem;
  margin-bottom: 1rem;
  padding: 0rem 1rem;
}

header img {
  width: 25px;
  height: auto;
  margin-right: 10px; 
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between; 
}

.logs {
  display: flex;
  align-items: center;
}

main {
  flex-grow: 1;
  padding: 2rem 1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
</style>
