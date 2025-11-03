// --- Funciones de Formato de Precio Centralizadas ---

/**
 * Formatea un valor numérico a la representación en Pesos Argentinos (ARS).
 * Muestra 'CONSULTAR' si el valor es inválido, vacío o cero.
 * @param {string|number} value El valor del precio.
 * @returns {string} El precio formateado (e.g., 'ARS 475.757' o 'CONSULTAR').
 */
function formatARS(value) {
    // Reemplaza comas por puntos si existen (para un parsing más seguro si la entrada no es un número limpio)
    const stringValue = String(value).replace(',', '.'); 
    // Elimina caracteres no numéricos excepto el punto decimal
    const numericValue = parseFloat(stringValue.replace(/[^0-9.]+/g, ""));
    
    // El 'CONSULTAR' que viene de la URL (si es que existe y no es solo el valor)
    if (isNaN(numericValue) || numericValue === 0 || value === null || String(value).toUpperCase().trim() === 'CONSULTAR' || String(value).trim() === '') {
        return 'CONSULTAR';
    }

    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'decimal', 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0
    });
    
    const formattedNumber = formatter.format(numericValue);
    return `ARS ${formattedNumber}`;
}

/**
 * Formatea un valor numérico a la representación en USDT (Tether).
 * Muestra 'CONSULTAR' si el valor es inválido, vacío o cero.
 * @param {string|number} value El valor del precio.
 * @returns {string} El precio formateado (e.g., 'USDT 310' o 'CONSULTAR').
 */
function formatUSDT(value) {
    const stringValue = String(value).replace(',', '.'); 
    const numericValue = parseFloat(stringValue.replace(/[^0-9.]+/g, ""));
    
    if (isNaN(numericValue) || numericValue === 0 || value === null || String(value).toUpperCase().trim() === 'CONSULTAR' || String(value).trim() === '') {
        return 'CONSULTAR';
    }

    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'decimal', 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0
    });
    
    const formattedNumber = formatter.format(numericValue);
    return `USDT ${formattedNumber}`;
}