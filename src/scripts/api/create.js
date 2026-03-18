//Basicamente vai pegar e enviar as informações para o json

export async function createUser(
    apiUrl, { name, age, email }
) {
const response = await fetch(apiUrl, {
    method: 'POST',//É o metodo que envia informacoes para o json
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({//Transforma um objeto em string já que o json funciona apenas string
        name,
        age: Number(age),//transforma em int novamente pois a Api já espera int não string
        email
    }),
});

const data = await response.json();
if (!response.ok) {
    throw new Error(
        data.error || 'Failed to create user' //Caso de erro ira mandar o erro avisando que não foi possivel criar um usuario
    );
}

    return data;
}