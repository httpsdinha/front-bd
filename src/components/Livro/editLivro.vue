<template>
    <div v-if="showModal" class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close')">&times;</span>
            <h2>Editar Livro</h2>
            <form @submit.prevent="submitEdit">
                <div class="form-group">
                    <label for="titulo">Título:</label>
                    <input v-model="editedLivro.titulo" id="titulo" type="text" required />
                </div>
                <div class="form-group">
                    <label for="genero">Gênero:</label>
                    <input v-model="editedLivro.genero" id="genero" type="text" required />
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
        livro: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            editedLivro: {}
        };
    },
    watch: {
        livro: {
            immediate: true,
            handler(newLivro) {
                if (newLivro) {
                    this.editedLivro = { ...newLivro };
                }
            }
        }
    },
    methods: {
        async submitEdit() {
            try {
                const editedLivroData = { ...this.editedLivro };
                console.log('Dados enviados:', editedLivroData);
                await axios.put(`http://localhost:3000/api/livros/${editedLivroData.id}`, editedLivroData);
                this.$emit('edit', editedLivroData);
                this.$emit('refresh'); // Emit refresh event
            } catch (error) {
                console.error('Erro ao editar o livro:', error);
            }
        }
    },
    mounted() {
        if (this.livro) {
            this.editedLivro = { ...this.livro };
        }
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
</style>
