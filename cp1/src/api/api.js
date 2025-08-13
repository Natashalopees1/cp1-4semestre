import axios from "axios";

//Função para receber os dados (usuários)
export const fetchUsers = async ()=>{
    const response = await axios.get("https://jsonplaceholder.typicode.com/users")
    return response.data //Retorna os dados {array de users}
}

