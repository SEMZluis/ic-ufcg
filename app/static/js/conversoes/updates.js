const sdmethod = document.getElementById("successive-division")
const pnmethod = document.getElementById("polinomial-notation")
const bgmethod = document.getElementById("bit-grouping")
const infos = document.getElementsByClassName("info")

export function updateSuccessiveDivision(show=false, value=0, base=0) {
    const tablebody = document.getElementById("division-table")
    tablebody.innerHTML = ""

    // console.log(value)

    if (show && !isNaN(value)) {
        let dividendos = [value]
        let quocientes = []
        let restos = []

        do {
            quocientes.push(Math.floor(dividendos[dividendos.length-1]/base))
            restos.push(Math.floor(dividendos[dividendos.length-1]%base))
            dividendos.push(quocientes[quocientes.length - 1])
        } while (quocientes[quocientes.length-1] != 0);

        dividendos.pop()

        for (let i = 0; i < dividendos.length; i++) {
            let tr = document.createElement('tr')
            
            let c1 = document.createElement('td')
            c1.innerHTML = dividendos[i]
            tr.appendChild(c1)
            let c2 = document.createElement('td')
            c2.innerHTML = base
            tr.appendChild(c2)
            let c3 = document.createElement('td')
            c3.innerHTML = quocientes[i]
            tr.appendChild(c3)
            let c4 = document.createElement('td')
            c4.innerHTML = restos[i]
            tr.appendChild(c4)

            tablebody.appendChild(tr)
        }

        infos[0].innerHTML = ""
        sdmethod.style.display = "block"
    } else {
        sdmethod.style.display = "none"
        infos[0].innerHTML = "<p>Aplica-se somente quando a base a ser convertida é <b>decimal</b> e a base final é <b>qualquer outra</b>.</p>"
    }
}

export function updatePolinomialNotation(show=false, value=0, base=0) {
    const expression = document.getElementById("expression")
    expression.innerHTML = ""

    if (show && !isNaN(value)) {
        let originalValue = value.toString(base)
        let linha = ""
        let n = originalValue.length

        linha = `<b>${value}</b> =`

        for (let i = 0; i < n; i++) {
            linha +=  ` ${originalValue[i]}x${base}^${(n - (1+i))}`

            if (i != n - 1) {
                linha += " +"
            }
        }

        expression.innerHTML = linha
        pnmethod.style.display = "block"
        infos[1].innerHTML = ""
    } else {
        pnmethod.style.display = "none"
        infos[1].innerHTML = "<p>Aplica-se somente quando a base a ser convertida é <b>qualquer uma sem ser a decimal</b>, enquanto que a base desejada é <b>decimal</b>.</p>"
    }
}

export function updateBitGrouping(show=false, value=0, originBase, finalBase=0) {
    const tablebody = document.getElementById("bit-table")
    tablebody.innerHTML = ""

    if (show && !isNaN(value)) {
        let convertBase = originBase == 2 ? finalBase : originBase
        let bitGroup = finalBase == 8 || originBase == 8 ? 3 : 4
        let binary = value.toString(2)
        let proximoMultiplo = Math.ceil(binary.length/bitGroup) * bitGroup
        binary = binary.padStart(proximoMultiplo, "0")

        let groups = []
        let digits = []

        for (let i = 0; i < binary.length; i += bitGroup) {
            let group = document.createElement('td')
            group.innerHTML = binary.slice(i, i+bitGroup)
            groups.push(group)

            let digit = document.createElement('td')
            digit.innerHTML = parseInt(group.innerHTML, 2).toString(convertBase)
            digits.push(digit)
        }

        let firstRow = document.createElement('tr')
        let firstCell = document.createElement('td')
        firstRow.appendChild(firstCell)
        let secondRow = document.createElement('tr')
        let secondCell = document.createElement('td')
        secondRow.appendChild(secondCell)
        
        let firstArray = []
        let secondArray = []

        if (originBase != 2) {
            firstArray = digits
            secondArray = groups
            firstCell.innerHTML = bitGroup == 3 ? "Octal" : "Hexa"
            secondCell.innerHTML = "Grupos"
        } else {
            firstArray = groups
            secondArray = digits
            firstCell.innerHTML = "Grupos"
            secondCell.innerHTML = bitGroup == 3 ? "Octal" : "Hexa"
        }

        for (let i = 0; i < groups.length; i++) {
            firstRow.appendChild(firstArray[i])
            secondRow.appendChild(secondArray[i])
        }

        tablebody.appendChild(firstRow)
        tablebody.appendChild(secondRow)
        bgmethod.style.display = "block"
        infos[2].innerHTML = ""
    } else {
        bgmethod.style.display = "none"
        infos[2].innerHTML = "<p>Aplica-se somente quando a base a ser convertida é <b>octal ou hexadecimal</b> e a base final é <b>binária</b>.</p>"
    }
}