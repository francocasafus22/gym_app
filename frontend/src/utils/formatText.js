export const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export const fechaDiaMesAño = (fecha) => {
    const f = new Date(fecha);
    const dia = f.getDate();
    const mes = f.getMonth() + 1;
    const anio = f.getFullYear();

    return `${dia}/${mes}/${anio}`
}