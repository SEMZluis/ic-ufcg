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
 * Verifica se a entrada enviada pelo usuário é possível conforme a base de origem selecionada.
 * @param {string} string - Valor digitado pelo usuário.
 * @param {number} base - Base em que ele digitou o valor.
 * @returns - Retorna true se valor e base de origem estão de acordo, false se não.
 */
function isValid(string, base) {
    const regexes = {
        10: /^\d+$/g,
        2: /^[0-1]+$/g,
        8: /^[0-7]+$/g,
        16: /^[0-9a-fA-F]+$/g,
    }

    return regexes[base].test(string)
}

/**
 * Converte os valores digitados para outra base numérica e exibe ambos.
 * Além disso, a função também decide, conforme as bases numéricas escolhidas pelo usuário,
 * qual método de conversão exibir, ensinando-o como fazer a conversão a partir da teoria.
 */
function convert() {    
    const string = originInput.value.trim()
    const bOrigin = bases_dict[baseOrigin.value]
    const bDestiny = bases_dict[baseDestiny.value]

    cleanUpdates()
    destinyInput.value = ""

    if (!string) return

    if (bOrigin == bDestiny) {
        destinyInput.value = "Bases iguais"
        return
    }

    if((bOrigin == 8 && bDestiny == 16) || (bOrigin == 16 && bDestiny == 8)) {
        destinyInput.value = "Não é possível"
        return
    }

    if (isValid(string, bOrigin)) {
        let decimalValue = parseInt(string, bOrigin)
        let finalValue = decimalValue.toString(bDestiny)
        destinyInput.value = finalValue

        if (bOrigin == 10) {
            updateSuccessiveDivision(decimalValue, bDestiny)    
        } else {
            if (bDestiny == 10) {
                updatePolinomialNotation(decimalValue, bOrigin)
            } else{
                updateBitGrouping(decimalValue, bOrigin, bDestiny)
            }
        }
    } else {
        destinyInput.value = "Numeral inválido"
    }
}

/**
 * "Limpa" a exibição dos métodos de conversão, apagando o que estava neles anteriormente.
 */
function cleanUpdates() {
    updateSuccessiveDivision()
    updatePolinomialNotation()
    updateBitGrouping()
}

originInput.addEventListener("input", () => convert())
baseOrigin.addEventListener("change", () => convert())
baseDestiny.addEventListener("change", () => convert())