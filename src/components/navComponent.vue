<template>
    <main>
        <header>
            <img src="@/assets/logo.png">
            <h1>BookFlow</h1>
        </header>
        <hr class="header-line">
        <div class="buttons">
            <div class="button-container">
                <router-link to="/">
                    <img src="@/assets/historico.png">
                    <span class="label">Log de Atividades</span>
                </router-link>
            </div>
            <div class="button-container">
                <router-link to="/usuarios">
                    <img src="@/assets/usuario.png">
                    <span class="label">Usuários</span>
                </router-link>
            </div>
            <div class="button-container">
                <router-link to="/emprestimos">
                    <img src="@/assets/emprestimo.png">
                    <span class="label">Empréstimos</span>
                </router-link>
            </div>
            <div class="button-container">
                <router-link to="/livros">
                    <img src="@/assets/livro.png">
                    <span class="label">Biblioteca</span>
                </router-link>
            </div>
        </div>
        
    </main>
</template>

<script>
export default {
  name: 'navComponent'
}
</script>

<style scoped>
main {
    background: linear-gradient(1deg, #2A5184 2.61%, #0F1C2B 100%);
    height: 100%;
    flex-shrink: 0;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    transition: width 0.3s;
}

main:hover {
    width: 15vw;
}

header {
    font-family: "Jura";
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

header img {
    width: 45px;
}

.header-line {
    width: 100%;
    border: none;
    border-top: 1px solid white;
    margin: 1rem 0;
}

.buttons {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3rem;
    margin: auto 0;
}

.button-container {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    flex-direction: row;
    justify-content: space-between;
}

.buttons router-link {
    display: flex;
    align-items: center;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
}

.buttons img, header img {
    width: 45px;
    box-sizing: border-box;
}

.buttons img:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
}

.buttons .label {
    display: none;
    margin-left: 1rem;
    color: white;
    font-family: "Jura";
    font-size: 1.1rem;
    flex: 1;
    text-align: right;
    position: static;
    transform: none;
}

h1{
    font-size: 1rem;
}

main:hover .buttons .label {
    display: inline;
}

@media (max-width: 2800px) {
    main {
        width: 6vw;
        padding: 2rem 1rem;
    }
    .buttons img, header img {
        width: 45px;
    }
}

@media (max-width: 1800px) {
    main {
        width: 7vw;
        padding: 2rem 1rem;
    }
    .buttons img, header img {
        width: 25px;
    }
}

@media (max-width: 900px) {
    main {
        width: 8vw;
        padding: 2rem 1rem;
    }
    .buttons img, header img {
        width: 25px;
    }
}

@media (max-width: 400px) {
    main {
        width: 8vw;
        padding: 1rem 0.5rem;
    }
}

.button-line {
    width: 100%;
    border: none;
    border-top: 1px solid white;
    margin: 1rem 0;
}
</style>