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
          <button @click="openModal">
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
              <th>Alterações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="author in authors" :key="author.id">
              <td v-for="column in authorColumns" :key="column">{{ author[column] }}</td>
              <td>
                <button @click="editAuthor(author)">
                  <img src="@/assets/editar.png" alt="Editar">
                </button>
                <button @click="deleteAuthor(author)">
                  <img src="@/assets/delete.png" alt="Deletar">
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="isModalOpen" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <form @submit.prevent="addBook">
            <div>
              <label for="title">Título:</label>
              <input type="text" v-model="newBook.titulo" required>
            </div>
            <div>
              <label for="author">Autor:</label>
              <input type="text" v-model="newBook.autor" required>
            </div>
            <div>
              <label for="isbn">ISBN:</label>
              <input type="text" v-model="newBook.isbn" required>
            </div>
            <div>
              <label for="status">Status:</label>
              <select v-model="newBook.status" required>
                <option value="disponível">Disponível</option>
                <option value="indisponível">Indisponível</option>
              </select>
            </div>
            <button type="submit">Adicionar</button>
          </form>
        </div>
      </div>
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
      authorColumns: ['id', 'nome'],
      authors: reactive([]),
      isModalOpen: false,
      newBook: {
        titulo: '',
        autor: '',
        isbn: '',
        status: 'disponível'
      },
      activeTab: 'livros'
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
        const response = await axios.get('http://localhost:3000/api/autores');
        this.authors = response.data;
      } catch (error) {
        console.error('Erro ao buscar autores:', error);
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async addBook() {
      try {
        const response = await axios.post('http://localhost:3000/api/livros', this.newBook, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.rows.push(response.data);
        this.closeModal();
      } catch (error) {
        console.error('Erro ao adicionar livro:', error);
      }
    },
    editRow() {
      // Implement edit functionality
    },
    deleteRow() {
      // Implement delete functionality
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
</style>