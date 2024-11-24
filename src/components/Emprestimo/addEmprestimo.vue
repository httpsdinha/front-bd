<template>
    <div class="modal" v-if="showModal">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h2>Adicionar Empréstimo</h2>
            <form @submit.prevent="addEmprestimo">
                <div class="form-group">
                    <label for="titulo">Livro:</label>
                    <select id="titulo" v-model="emprestimo.livroId" required>
                        <option v-for="book in livros" :key="book.id" :value="book.id">{{ book.titulo }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="usuario">Usuário:</label>
                    <select id="usuario" v-model="emprestimo.usuarioId" required>
                        <option v-for="user in usuarios" :key="user.id" :value="user.id">{{ user.nome }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="dataEmprestimo">Data de Empréstimo:</label>
                    <input type="date" id="dataEmprestimo" v-model="emprestimo.dataEmprestimo" required>
                </div>
                <div class="form-group">
                    <label for="dataDevolucao">Data de Devolução:</label>
                    <input type="date" id="dataDevolucao" v-model="emprestimo.dataDevolucao" required>
                </div>
                <div class="form-group">
                    <label for="devolvido">Devolvido:</label>
                    <div class="custom-select">
                        <select v-model="emprestimo.devolvido" id="devolvido">
                            <option :value="false">Não</option>
                            <option :value="true">Sim</option>
                        </select>
                    </div>
                </div>
                <button type="submit" color="primary">
                    Adicionar
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['showModal'],
    data() {
        return {
            emprestimo: {
                usuarioId: '',
                livroId: '',
                dataEmprestimo: '',
                dataDevolucao: '',
                devolvido: false
            },
            livros: [], // Array to hold book data
            usuarios: [] // Array to hold user data
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
            this.resetForm();
        },
        resetForm() {
            this.emprestimo = {
                usuarioId: '',
                livroId: '',
                dataEmprestimo: '',
                dataDevolucao: '',
                devolvido: false
            };
        },
        addEmprestimo() {
            const emprestimoData = { ...this.emprestimo }; // Convert reactive object to plain object
            console.log('Emprestimo Data:', emprestimoData); // Log the data being sent

            axios.post('http://localhost:3000/api/emprestimos', emprestimoData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log('Emprestimo adicionado com sucesso:', response.data);
                this.$emit('add', response.data);
                this.closeModal();
            })
            .catch(error => {
                console.error('Erro ao adicionar emprestimo:', error);
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                    console.error('Error response status:', error.response.status);
                    console.error('Error response headers:', error.response.headers);
                }
            });
        },
        async fetchLivros() {
            try {
                const response = await axios.get('http://localhost:3000/api/livros');
                this.livros = response.data;
            } catch (error) {
                console.error('Error fetching livros:', error);
            }
        },
        async fetchUsuarios() {
            try {
                const response = await axios.get('http://localhost:3000/api/usuarios');
                this.usuarios = response.data.map(user => ({ id: user.id, nome: user.nome }));
            } catch (error) {
                console.error('Error fetching usuarios:', error);
            }
        }
    },
    mounted() {
        this.fetchLivros();
        this.fetchUsuarios();
    }
};
</script>

<style scoped>
h2{
  color: #2A5184;
  font-family: 'Judson';
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    position: relative; /* Ensure the close button is positioned relative to the modal content */
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
    max-width: 100%;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input, .form-group select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
}

button{
    color: white;
    background-color: #2A5184;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
}

button:hover{
    background-color: #1A2E44;
}

.custom-select {
    position: relative;
    display: inline-block;
    width: 100%;
}

.custom-select select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

.custom-select::after {
    content: '▼';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
}
</style>