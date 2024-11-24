<template>
    <div v-if="showModal" class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close')">&times;</span>
            <h2>Editar Empréstimo</h2>
            <form @submit.prevent="submitEdit">
                <div class="form-group">
                    <label for="titulo">Livro:</label>
                    <select id="titulo" v-model="editedEmprestimo.livroId" required>
                        <option v-for="book in livros" :key="book.id" :value="book.id">{{ book.titulo }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="usuario">Usuário:</label>
                    <select id="usuario" v-model="editedEmprestimo.usuarioId" required>
                        <option v-for="user in usuarios" :key="user.id" :value="user.id">{{ user.nome }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="dataDevolucao">Data de Devolução:</label>
                    <input v-model="editedEmprestimo.dataDevolucao" id="dataDevolucao" type="date" required />
                </div>
                <div class="form-group">
                    <label for="devolvido">Devolvido:</label>
                    <div class="custom-select">
                        <select v-model="editedEmprestimo.devolvido" id="devolvido">
                            <option :value="'Não'">Não</option>
                            <option :value="'Sim'">Sim</option>
                        </select>
                    </div>
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        showModal: {
            type: Boolean,
            required: true
        },
        emprestimo: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            editedEmprestimo: {
                devolvido: 'Não',
                statusDevolucao: 'Não'
            },
            livros: [], // Array to hold book data
            usuarios: [] // Array to hold user data
        };
    },
    watch: {
        emprestimo: {
            immediate: true,
            handler(newEmprestimo) {
                if (newEmprestimo) {
                    this.editedEmprestimo = { 
                        ...newEmprestimo, 
                        devolvido: newEmprestimo.devolvido ? 'Sim' : 'Não',
                        statusDevolucao: newEmprestimo.devolvido ? 'Sim' : 'Não',
                        dataDevolucao: newEmprestimo.dataDevolucao ? new Date(newEmprestimo.dataDevolucao).toISOString().split('T')[0] : ''
                    };
                    delete this.editedEmprestimo.quantidade;
                    delete this.editedEmprestimo.autor;
                    delete this.editedEmprestimo.genero;
                    delete this.editedEmprestimo.dataEmprestimo;
                }
            }
        }
    },
    methods: {
        async submitEdit() {
            await this.updateEmprestimo();
            this.$emit('edit', this.editedEmprestimo);
        },
        async updateEmprestimo() {
            try {
                const dataToSend = {
                    ...this.editedEmprestimo,
                    devolvido: this.editedEmprestimo.devolvido,
                    statusDevolucao: this.editedEmprestimo.devolvido
                };
                console.log('Data being sent:', dataToSend);
                await axios.put(`http://localhost:3000/api/emprestimos/${this.editedEmprestimo.id}`, dataToSend);
            } catch (error) {
                console.error('Erro ao atualizar empréstimo:', error);
            }
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
    async created() {
        await this.fetchLivros();
        await this.fetchUsuarios();
    }
};
</script>

<style scoped>
h2 {
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
    position: relative;
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

button {
    color: white;
    background-color: #2A5184;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
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
