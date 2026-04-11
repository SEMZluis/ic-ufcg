import {updateBitGrouping, updatePolinomialNotation, updateSuccessiveDivision} from "./updates.js";

const originInput = document.getElementById("origin-input")
const destinyInput = document.getElementById("destiny-input")
const baseOrigin = document.getElementById("base-origin")
const baseDestiny = document.getElementById("base-destiny")

const bases_dict = {
    "Decimal": 10,
    "Binário": 2,
    "Octal": 8,
    "Hexadecimal": 16
}

function convert() {    
    let decimalValue = parseInt(originInput.value, bases_dict[baseOrigin.value])
    let finalValue = decimalValue.toString(bases_dict[baseDestiny.value])
    destinyInput.value = finalValue

    if (baseOrigin.value != baseDestiny.value) {
        if (baseOrigin.value == "Decimal") {
            updateSuccessiveDivision(true, decimalValue, bases_dict[baseDestiny.value])    
            updatePolinomialNotation()
            updateBitGrouping()
        } else {
            if (baseDestiny.value == "Decimal") {
                updatePolinomialNotation(true, decimalValue, bases_dict[baseOrigin.value])
                updateSuccessiveDivision()
                updateBitGrouping()
            } else{
                updateBitGrouping(true, decimalValue, bases_dict[baseOrigin.value], bases_dict[baseDestiny.value])
                updateSuccessiveDivision()
                updatePolinomialNotation()
            }
        }
        
    } else {
        updateSuccessiveDivision()
        updatePolinomialNotation()
        updateBitGrouping()
    }

}

originInput.addEventListener("input", () => convert())
baseOrigin.addEventListener("change", () => convert())
baseDestiny.addEventListener("change", () => convert())


