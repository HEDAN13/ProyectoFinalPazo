import { mostrarToastError } from "./notificaciones.js";
import { saveValores } from "./storage.js";

/**
 * Obtiene los valores de las monedas desde una API externa y los guarda en el localStorage.
 * @returns {Promise<Array>}
 */
async function obtenerValores() {
  try {
    const url =
      "https://www.fasttools.store/api/currency_converter/latest?base=USD";
    const proxy = "https://api.allorigins.win/raw?url=";

    const response = await fetch(proxy + encodeURIComponent(url));

    if (!response.ok) throw new Error("No se pudo obtener los datos");
    const json = await response.json();

    const datos = json.data.rates;

    let nombresMap = {};
    try {
      const localResponse = await fetch("./assets/data/currencies.json");
      if (localResponse.ok) {
        const localJson = await localResponse.json();
        nombresMap = localJson.reduce((result, item) => {
          result[item.Code] = item.Nombre;
          return result;
        }, {});
      }
    } catch (error) {
      mostrarToastError(
        "No se pudieron cargar los nombres de las monedas locales." +
          error.message
      );
    }

    const lista = Object.entries(datos).map(([code, conversion]) => ({
      Code: code,
      Nombre: nombresMap[code] || code,
      Conversion: String(conversion),
    }));

    if (!lista.find((i) => i.Code === "USD")) {
      lista.unshift({
        Code: "USD",
        Nombre: nombresMap["USD"] || "Dólar Norteamericano",
        Conversion: "1",
      });
    }
    saveValores(lista);
    return lista;
  } catch (error) {
    mostrarToastError(
      "Error al obtener los valores de las monedas: " + error.message
    );
    return [];
  }
}

/**
 * Genera un elemento <select> con las opciones de monedas disponibles.
 * @returns {Promise<HTMLElement>}
 */
export async function formatoMoneda() {
  const monedas = await obtenerValores();
  const select = document.createElement("select");
  select.classList.add("form-select");
  select.id = "moneda-select";
  monedas.forEach((moneda) => {
    const option = document.createElement("option");
    option.textContent = `${moneda.Nombre} - ${moneda.Code}`;
    option.value = moneda.Code;
    if (moneda.Code === "USD") {
      option.selected = true;
    }
    select.appendChild(option);
  });
  return select;
}
