<template>
  <div class="container">
    <nav>
      <nav-component />
    </nav>
    <main>
      <header>
        <div class="header-content">
          <div class="usuarios">
            <img src="@/assets/usuario_azul.png">
            <h2>Usuários</h2>
          </div>
          <button @click="openModal">
            <img class="adicionar" src="@/assets/adicionar_usuario.png">
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
                <img src="@/assets/delete.png" alt="Editar">
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <add-usuario :showModal="isModalOpen" @close="closeModal" @add="addUser"></add-usuario>
    </main>
  </div>
</template>

<script>
import navComponent from '../components/navComponent.vue';
import addUsuario from '../components/addUsuario.vue';
import axios from 'axios';

export default {
  components: {
    navComponent,
    addUsuario
  },
  data() {
    return {
      columns: [], 
      rows: [], 
      isModalOpen: false, 
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/usuarios');
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
    async addUser(usuario) {
      try {
        console.log('Adding user:', usuario); // Log the user data being sent
        const response = await axios.post('http://localhost:3000/api/usuarios', usuario, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('User added successfully:', response.data); // Log the response data
        this.rows.push(response.data);
        this.columns = Object.keys(response.data); // Ensure columns are updated if necessary
        this.closeModal();
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        console.error('Error response:', error.response); // Log the error response
      }
    },
    async editRow(row) {
      try {
        const updatedData = { /* dados atualizados */ };
        const response = await axios.put(`http://localhost:3000/api/usuarios/${row.id}`, updatedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const index = this.rows.findIndex(r => r.id === row.id);
        this.$set(this.rows, index, response.data);
        console.log('Usuário editado com sucesso', response.data);
      } catch (error) {
        console.error('Erro ao editar usuário:', error);
      }
    },
    async deleteRow(row) {
      try {
        await axios.delete(`http://localhost:3000/api/usuarios/${row.id}`);
        this.rows = this.rows.filter(r => r.id !== row.id);
        console.log('Usuário deletado com sucesso');
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
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

.usuarios {
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
td:last-child {
  display: flex;
  gap: 0.5rem;
  justify-content: center; /* Ensure buttons are centered horizontally */
}

button img {
  width: 20px;
  height: auto;
}
</style>