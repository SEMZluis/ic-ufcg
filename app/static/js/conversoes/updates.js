const sdmethod = document.getElementById("successive-division")
const pnmethod = document.getElementById("polinomial-notation")
const infos = document.getElementsByClassName("info")

export function updatePolinomialNotation(show=false, inputValue=0, finalValue= 0, base=0) {
    const expression = document.getElementById("expression")
    expression.innerHTML = ""

    if (show && !isNaN(finalValue)) {
        let linha = ""
        let n = inputValue.length

        linha = `<b>${finalValue}</b> =`

        for (let i = n-1; i > -1; i--) {
            linha +=  ` ${inputValue[i]}x${base}^${i}`

            if (i != 0) {
                linha += " +"
            }
        }

        console.log(linha)

        expression.innerHTML = linha
        pnmethod.style.display = "block"
        infos[1].innerHTML = ""
    } else {
        pnmethod.style.display = "none"
        infos[1].innerHTML = "<p>Aplica-se somente quando a base a ser convertida é <b>qualquer uma sem ser a decimal</b>, enquanto que a base desejada é <b>decimal</b>.</p>"
    }



}

export function updateSuccessiveDivision(show=false, value=0, base=0) {
    const tablebody = document.getElementById("division-table")
    tablebody.innerHTML = ""

    console.log(value)

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