<template>
  <div class="container">
    <nav>
      <nav-component />
    </nav>
    <main>
      <header>
        <div class="header-content">
          <div class="emprestimos">
            <img src="@/assets/emprestimo_azul.png">
            <h2>Empréstimos</h2>
          </div>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column">{{ column }}</th>
            <th>Alterações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td v-for="column in columns" :key="column">{{ row[column] }}</td>
            <td>
              <button @click="editRow(row)">
                <img src="@/assets/editar.png" alt="Editar">
              </button>
              <button @click="deleteRow(row)">
                <img src="@/assets/delete.png" alt="Deletar">
              </button>
            </td>
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
        const response = await axios.get('http://localhost:3000/api/emprestimos');
        const data = response.data;
        if (data.length > 0) {
          this.columns = Object.keys(data[0]);
          this.rows = data;
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    },
    editRow() {
      // Implement edit functionality
    },
    deleteRow() {
      // Implement delete functionality
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

.emprestimos {
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
td:last-child {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

button img {
  width: 20px;
  height: auto;
}
</style>