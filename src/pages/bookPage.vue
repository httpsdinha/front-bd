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
              <h2>Livros</h2>
            </div>
            <button @click="openModal">
              <img class="adicionar" src="@/assets/adicionar.png">
            </button>
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
import navComponent from '../components/navComponent.vue';
import axios from 'axios';

export default {
  components: {
    navComponent
  },
  data() {
    return {
      columns: [], // Array para armazenar os nomes das colunas
      rows: [], // Array para armazenar os dados das linhas
      isModalOpen: false, // Estado para controlar a abertura do modal
      newBook: {
        titulo: '',
        autor: '',
        isbn: '',
        status: 'disponível'
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        // Substitua a URL abaixo pela URL da sua API
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

header img{
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

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>