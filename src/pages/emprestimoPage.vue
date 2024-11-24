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
          <button @click="openAddModal">
            <img class="adicionar" src="@/assets/adicionar.png">
          </button>
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
      <addEmprestimo :showModal="showAddModal" @close="closeAddModal" @add="handleAddLivro" />
      <editEmprestimo :showModal="showEditModal" :emprestimo="selectedEmprestimo" @close="closeEditModal" @edit="handleEditEmprestimo" />
    </main>
  </div>
</template>

<script>
import { reactive } from 'vue';
import navComponent from '../components/navComponent.vue';
import addEmprestimo from '../components/Emprestimo/addEmprestimo.vue';
import editEmprestimo from '../components/Emprestimo/editEmprestimo.vue';
import axios from 'axios';

export default {
  components: {
    navComponent,
    addEmprestimo,
    editEmprestimo
  },
  data() {
    return {
      columns: [],
      rows: reactive([]),
      showAddModal: false,
      showEditModal: false,
      selectedEmprestimo: null
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
    editRow(row) {
      this.selectedEmprestimo = row;
      this.showEditModal = true;
    },
    async deleteRow(row) {
      try {
        await axios.delete(`http://localhost:3000/api/emprestimos/${row.id}`);
        this.rows = this.rows.filter(r => r.id !== row.id);
      } catch (error) {
        console.error('Erro ao deletar empréstimo:', error);
      }
    },
    openAddModal() {
      this.showAddModal = true;
    },
    closeAddModal() {
      this.showAddModal = false;
    },
    handleAddLivro(livroData) {
      this.rows.push(livroData);
      this.closeAddModal();
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    async handleEditEmprestimo(editedEmprestimo) {
      const index = this.rows.findIndex(row => row.id === editedEmprestimo.id);
      if (index !== -1) {
        this.rows.splice(index, 1, editedEmprestimo);
      }
      this.closeEditModal();
      await this.fetchData(); // Refresh data after editing
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

button:hover .adicionar {
  transform: scale(1.1);
}
</style>