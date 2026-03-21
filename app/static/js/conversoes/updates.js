const sdmethod = document.getElementById("successive-division")

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

        sdmethod.style.display = "block"
    } else {
        sdmethod.style.display = "none"
    }
}