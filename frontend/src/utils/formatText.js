export const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const fechaDiaMesAño = (fecha) => {
  const f = new Date(fecha);
  const dia = f.getDate();
  const mes = f.getMonth() + 1;
  const anio = f.getFullYear();

  return `${dia}/${mes}/${anio}`;
};

export const diasRestantes = (fecha) => {
  return Math.ceil((new Date(fecha) - new Date()) / (1000 * 60 * 60 * 24));
};

export const cronometro = (segundos) => {
  const minutos = Math.floor((segundos % 3600) / 60);
  const segundosRestantes = segundos % 60;
  const horas = Math.floor(segundos / 3600);

  return `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundosRestantes.toString().padStart(2, "0")}`;
};

export const currency = (number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(number);
};
