<template>
    <div class="modal" v-if="showModal">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h2>Adicionar Usuário</h2>
            <form @submit.prevent="addUsuario">
                <div class="form-group">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" v-model="usuario.nome" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="usuario.email" required>
                </div>
                <div class="form-group">
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" v-model="usuario.cpf" required>
                </div>
                <div class="form-group">
                    <label for="status">Status:</label>
                    <select id="status" v-model="usuario.status" required>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                </div>
                <button type="submit" color="primary">
                    Adicionar
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: ['showModal'],
    data() {
        return {
            usuario: {
                nome: '',
                email: '',
                cpf: '',
                status: 'ativo',
                alteracao: '' // Ensure this field is always present
            },
            usuarios: [] // Array to hold user data
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
            this.resetForm();
        },
        resetForm() {
            this.usuario = {
                nome: '',
                email: '',
                cpf: '',
                status: 'ativo',
                alteracao: '' // Ensure this field is always reset
            };
        },
        addUsuario() {
            const { nome, email, cpf, status } = this.usuario;
            const usuarioData = { nome, email, cpf, status };
            this.$emit('add', usuarioData);
            this.closeModal();
        },
        editUsuario(user) {
            // Logic for editing user
            console.log('Edit user:', user);
        },
        deleteUsuario(user) {
            // Logic for deleting user
            this.usuarios = this.usuarios.filter(u => u.id !== user.id);
            console.log('Delete user:', user);
        }
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
</style>