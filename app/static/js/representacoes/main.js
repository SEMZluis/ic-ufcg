const originInput = document.getElementById("origin-input")
const destinyInput = document.getElementById("destiny-input")
const intRepresentation = document.getElementById("int-representation")
const decimalRegex = /^-.|[0-9]+$/


function useSignMagnitude(decimal) {
    if (decimal < -127) return "Underflow!"
    return decimal.toString(2).slice(1).padStart(7, "0").padStart(8, "1")
}

function convert() {
    destinyInput.value = ""
    const string = originInput.value.trim()
    console.log("originInput: "+string)

    if (!string) return

    if (!decimalRegex.test(string)) {
        console.log("valor: "+string)
        destinyInput.value = "Digite um número!"
        return
    }

    let decimal = parseInt(string)

    if (!Number.isInteger(decimal)) {
        destinyInput.value = "Digite inteiros!"
        return
    }

    if (decimal > 127) {
        destinyInput.value = "Overflow!"
        return
    }

    if (decimal < 0) {
        let final = ""
        if (intRepresentation.value == "Sinal e Magnitude") {
            final = useSignMagnitude(decimal)
        } else {
            final = "Em Produção!"
        }
        destinyInput.value = final
        return 
    } else {
        destinyInput.value = decimal.toString(2).padStart(8, 0)
    }
}

originInput.addEventListener("input", () => convert())
intRepresentation.addEventListener("change", () => convert())