import {updateBitGrouping, updatePolinomialNotation, updateSuccessiveDivision} from "./updates.js";

const originInput = document.getElementById("origin-input")
const destinyInput = document.getElementById("destiny-input")
const baseOrigin = document.getElementById("base-origin")
const baseDestiny = document.getElementById("base-destiny")

// Mapeia o nome da base numérica para seu valor inteiro correspondente
const bases_dict = {
    "Decimal": 10,
    "Binário": 2,
    "Octal": 8,
    "Hexadecimal": 16
}

/**
 * Converte os valores digitados para outra base numérica e exibe ambos.
 * Além disso, a função também decide, conforme as bases numéricas escolhidas pelo usuário,
 * qual método de conversão exibir, ensinando-o como fazer a conversão a partir da teoria.
 */
function convert() {    
    let decimalValue = parseInt(originInput.value, bases_dict[baseOrigin.value])

    if (decimalValue < 0) {
        destinyInput.value = "Sem valores negativos"
    } else if (isNaN(decimalValue)) {
        destinyInput.value = "Digite um número válido"
    } else {
        let finalValue = decimalValue.toString(bases_dict[baseDestiny.value])
        destinyInput.value = finalValue

        if (baseOrigin.value == "Decimal") {
            updateSuccessiveDivision(decimalValue, bases_dict[baseDestiny.value])    
            updatePolinomialNotation()
            updateBitGrouping()
        } else {
            if (baseDestiny.value == "Decimal") {
                updatePolinomialNotation(decimalValue, bases_dict[baseOrigin.value])
                updateSuccessiveDivision()
                updateBitGrouping()
            } else{
                updateBitGrouping(decimalValue, bases_dict[baseOrigin.value], bases_dict[baseDestiny.value])
                updateSuccessiveDivision()
                updatePolinomialNotation()
            }
        }
    }
}

originInput.addEventListener("input", () => convert())
baseOrigin.addEventListener("change", () => convert())
baseDestiny.addEventListener("change", () => convert())