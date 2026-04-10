import {updateBitGrouping, updatePolinomialNotation, updateSuccessiveDivision} from "./updates.js";

const originInput = document.getElementById("origin-input")
const destinyInput = document.getElementById("destiny-input")
const baseOrigin = document.getElementById("base-origin")
const baseDestiny = document.getElementById("base-destiny")
const format = document.getElementById("nformat")

const bases_dict = {
    "Decimal": 10,
    "Binário": 2,
    "Octal": 8,
    "Hexadecimal": 16
}

const format_dict = {
    "Com sinal, 8 bits": 8,
    "Com sinal, 16 bits": 16,
    "Com sinal, 32 bits": 32
}

function isOverflow(value, n) {
    return value > (Math.pow(2, (n - 1)) - 1)
}

function isUnderflow(value, n) {
    console.log(value)
    console.log(-(Math.pow(2, (n - 1))))
    return value < -(Math.pow(2, (n - 1)))
}

function twosComplementRepresentation(value, n) {
    let str = (value >>> 0).toString(2)
    if (value > 0) str = str.padStart(n, "0")
    return str
}

function convert() {
    let decimalValue = parseInt(originInput.value, bases_dict[baseOrigin.value])
    let finalValue = ""

    if (format.value != "Sem sinal") {
        let nbits = format_dict[format.value]
        
        if (isOverflow(decimalValue, nbits)) {
            finalValue = "Overflow"
        } else if (isUnderflow(decimalValue, nbits)) {
            finalValue = "Underflow"
        } else {
            let c2 = twosComplementRepresentation(decimalValue, nbits)            
            decimalValue = parseInt(c2.slice(c2.length - nbits, c2.length), 2)   
            finalValue = decimalValue.toString(bases_dict[baseDestiny.value])      
        }
    } else {
        finalValue = decimalValue.toString(bases_dict[baseDestiny.value])
    }

    destinyInput.value = finalValue

    if (baseOrigin.value == "Decimal" && decimalValue > 0 && baseDestiny.value != baseOrigin.value) {
        updateSuccessiveDivision(true, decimalValue, bases_dict[baseDestiny.value])
    } else if (baseOrigin.value != "Decimal" && baseDestiny.value == "Decimal") {
        updatePolinomialNotation(true, originInput.value, decimalValue, bases_dict[baseOrigin.value])
    } else if (baseOrigin.value == "Binário" && (baseDestiny.value == "Hexadecimal" || baseDestiny.value == "Octal")) {
        updateBitGrouping(true, decimalValue, bases_dict[baseDestiny.value])
    } else {
        updateSuccessiveDivision()
        updatePolinomialNotation()
        updateBitGrouping()
    }

}


originInput.addEventListener("input", () => convert())
baseOrigin.addEventListener("change", () => convert())
baseDestiny.addEventListener("change", () => convert())
format.addEventListener("change", () => convert())


