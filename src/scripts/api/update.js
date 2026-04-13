export async function updateUser(apiUrl, id, { name, age, email }) {
    const { data } = await axios.put(`${apiUrl}?id=${id}`, {
        name,
        age: Number(age),
        email,
    });

    return data;
}

export async function patchUser(apiUrl, id, fields) {
    if (fields.age !== undefined) {
        fields.age = Number(fields.age);
    }

    const { data } = await axios.patch(`${apiUrl}?id=${id}`, fields);

    return data;
}