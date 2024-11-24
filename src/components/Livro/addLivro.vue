<template>
    <div class="modal" v-if="showModal">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h2>Adicionar Livro</h2>
            <form @submit.prevent="addLivro">
                <div class="form-group">
                    <label for="titulo">Título:</label>
                    <input type="text" id="titulo" v-model="livro.titulo" required>
                </div>
                <div class="form-group">
                    <label for="autor">Autor:</label>
                    <select id="autor" v-model="selectedAutor" @change="handleAutorChange" required>
                        <option v-for="autor in autores" :key="autor.id" :value="autor.nome">{{ autor.nome }}</option>
                        <option value="new">Adicionar Novo Autor</option>
                    </select>
                    <input v-if="showNewAutorInput" type="text" v-model="newAutor" placeholder="Novo Autor" required>
                </div>
                <div class="form-group">
                    <label for="genero">Gênero:</label>
                    <input type="text" id="genero" v-model="livro.genero" required>
                </div>
                <button type="submit" color="primary">
                    Adicionar
                </button>
            </form>
            <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['showModal'],
    data() {
        return {
            livro: {
                titulo: '',
                autor: '',
                genero: ''
            },
            livros: [], // Array to hold book data
            autores: [], // Array to hold authors data
            selectedAutor: '',
            showNewAutorInput: false,
            newAutor: '',
            successMessage: ''
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
            this.resetForm();
        },
        resetForm() {
            this.livro = {
                titulo: '',
                autor: '',
                genero: ''
            };
        },
        addLivro() {
            const { titulo, genero } = this.livro;
            const autor = this.showNewAutorInput ? this.newAutor : this.selectedAutor;
            const livroData = { titulo, autor, genero };
            console.log('Enviando para o backend:', livroData);

            axios.post('http://localhost:3000/api/livros', livroData)
                .then(response => {
                    console.log('Livro adicionado com sucesso:', response.data);
                    this.$emit('add', response.data);
                    this.$emit('refresh'); // Emit refresh event
                    if (this.showNewAutorInput) {
                        this.$emit('refreshAuthors'); // Emit refresh authors event
                    }
                    this.closeModal();
                })
                .catch(error => {
                    console.error('Erro ao adicionar livro:', error);
                });
        },
        handleAutorChange(event) {
            this.showNewAutorInput = event.target.value === 'new';
        },
        editLivro(book) {
            // Logic for editing book
            console.log('Edit book:', book);
        },
        deleteLivro(book) {
            // Logic for deleting book
            this.livros = this.livros.filter(b => b.id !== book.id);
            console.log('Delete book:', book);
        },
        fetchAutores() {
            axios.get('http://localhost:3000/api/autores')
                .then(response => {
                    this.autores = response.data;
                    console.log('Autores fetched successfully:', this.autores);
                })
                .catch(error => {
                    console.error('Erro ao buscar autores:', error);
                });
        }
    },
    mounted() {
        // Fetch authors from the database
        this.fetchAutores();
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

.form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
}

.form-group select {
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

.success-message {
    color: green;
    font-weight: bold;
    margin-top: 10px;
}
</style>