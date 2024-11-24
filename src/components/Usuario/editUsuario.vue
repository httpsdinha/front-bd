<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Editar Usuário</h2>
      <form @submit.prevent="submitEdit">
        <div class="form-group">
          <label for="nome">Nome</label>
          <input v-model="editedUser.nome" id="nome" name="nome" type="text" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="editedUser.email" id="email" name="email" type="email" />
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <select v-model="editedUser.status" id="status" name="status">
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editedUser: {}
    };
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        this.editedUser = { ...newUser };
      }
    }
  },
  methods: {
    submitEdit() {
      this.$emit('edit', this.editedUser);
    }
  }
}
</script>

<style scoped>
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
  width: 500px;
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

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
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
  background-color: #1d3a5b;
}

h2 {
  color: #2A5184;
  font-family: 'Judson';
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
