<template>
  <div class="container">
    <nav>
      <nav-component />
    </nav>
    <main>
      <header>
        <div class="header-content">
          <div class="livros">
            <img src="@/assets/livro_azul.png">
            <h2 class="titulo">Biblioteca</h2>
          </div>
          <button @click="openAddModal">
            <img class="adicionar" src="@/assets/adicionar.png">
          </button>
        </div>
      </header>
      <div class="tabs">
        <button :class="{ active: activeTab === 'livros' }" @click="activeTab = 'livros'">Livros</button>
        <button :class="{ active: activeTab === 'autores' }" @click="activeTab = 'autores'">Autores</button>
      </div>
      <div v-if="activeTab === 'livros'">
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
      </div>
      <div v-if="activeTab === 'autores'">
        <table>
          <thead>
            <tr>
              <th v-for="column in authorColumns" :key="column">{{ column }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="author in authors" :key="author.id">
              <td v-for="column in authorColumns" :key="column">{{ author[column] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <add-livro :showModal="isAddModalOpen" @close="closeAddModal" @add="addBook" @refresh="fetchData" @refreshAuthors="fetchAuthors"></add-livro>
      <edit-livro :showModal="isEditModalOpen" :livro="selectedBook" @close="closeEditModal" @edit="updateBook" @refresh="fetchData"></edit-livro>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    </main>
  </div>
</template>

<script>
import { reactive } from 'vue';
import navComponent from '../components/navComponent.vue';
import addLivro from '../components/Livro/addLivro.vue';
import editLivro from '../components/Livro/editLivro.vue';
import axios from 'axios';

export default {
  components: {
    navComponent,
    addLivro,
    editLivro
  },
  data() {
    return {
      columns: [],
      rows: reactive([]),
      authorColumns: ['id', 'nome'],
      authors: reactive([]),
      isAddModalOpen: false,
      isEditModalOpen: false,
      selectedBook: null,
      newBook: {
        titulo: '',
        autor: '',
        isbn: '',
        status: 'disponível'
      },
      activeTab: 'livros',
      successMessage: ''
    };
  },
  mounted() {
    this.fetchData();
    this.fetchAuthors();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/livros');
        const data = response.data;
        if (data.length > 0) {
          this.columns = Object.keys(data[0]);
          this.rows = data;
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    },
    async fetchAuthors() {
      try {
        const response = await axios.get('http://localhost:3000/api/autores/livros');
        this.authors = response.data;
        this.authorColumns = Object.keys(response.data[0] || {});
      } catch (error) {
        console.error('Erro ao buscar autores:', error);
      }
    },
    openAddModal() {
      this.isAddModalOpen = true;
    },
    closeAddModal() {
      this.isAddModalOpen = false;
    },
    addBook(livro) {
      this.rows.push(livro);
      alert('Livro adicionado com sucesso!');
      this.closeAddModal();
    },
    openEditModal(book) {
      this.selectedBook = book;
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    },
    async updateBook(updatedBook) {
      try {
        const response = await axios.put(`http://localhost:3000/api/livros/${updatedBook.id}`, updatedBook, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const index = this.rows.findIndex(book => book.id === updatedBook.id);
        if (index !== -1) {
          this.rows[index] = response.data;
        }
        this.closeEditModal();
      } catch (error) {
        console.error('Erro ao atualizar livro:', error);
      }
    },
    editRow(row) {
      this.openEditModal(row);
    },
    async deleteRow(row) {
      try {
        await axios.delete(`http://localhost:3000/api/livros/${row.id}`);
        this.rows = this.rows.filter(book => book.id !== row.id);
      } catch (error) {
        console.error('Erro ao deletar livro:', error);
      }
    },
    editAuthor() {
      // Implement edit functionality for authors
    },
    deleteAuthor() {
      // Implement delete functionality for authors
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

.livros {
  display: flex;
  align-items: center;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

button:hover .adicionar {
  transform: scale(1.1);
}

main {
  flex-grow: 1;
  padding: 2rem 1rem;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tabs button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  cursor: pointer;
}

.tabs button.active {
  background-color: #2A5184;
  color: white;
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

.success-message {
  color: green;
  font-weight: bold;
  margin-top: 10px;
}
</style>