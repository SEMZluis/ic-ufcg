const sdmethod = document.getElementById("successive-division")
const pnmethod = document.getElementById("polinomial-notation")
const bgmethod = document.getElementById("bit-grouping")
const infos = document.getElementsByClassName("info")

/**
 * Atualiza a tabela que exemplifica a conversão de base pelo método das divisões sucessivas.
 * @param {number} decimalValue - Valor em decimal do número digitado.
 * @param {number} base - Base númerica para o qual o valor digitado será convertido.
 */
export function updateSuccessiveDivision(decimalValue=NaN, base=0) {
    const tablebody = document.getElementById("division-table")
    tablebody.innerHTML = ""                                                    // Limpa a tabela

    if (!isNaN(decimalValue)) {
        // Separa as informações que serão exibidas em arrays
        let dividendos = [decimalValue]
        let quocientes = []
        let restos = []

        // Calcula os quocientes, restos e dividendos que devem ser exibidos na tabela
        do {
            quocientes.push(Math.floor(dividendos[dividendos.length-1]/base))
            restos.push(Math.floor(dividendos[dividendos.length-1]%base))
            dividendos.push(quocientes[quocientes.length - 1])
        } while (quocientes[quocientes.length-1] != 0);

        dividendos.pop() // Remove o último dividendo adicionado, visto que ele será 0 na última divisão

        // Preenche a tabela com as informações calculadas
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

        // Exibe a tabela
        infos[0].innerHTML = ""
        sdmethod.style.display = "block"
    } else {
        sdmethod.style.display = "none"
        infos[0].innerHTML = "<p>Aplica-se somente quando a base a ser convertida é <b>decimal</b> e a base final é <b>qualquer outra</b>.</p>"
    }
}

/**
 * Atualiza a expressão que exemplifica a conversão de base pelo método da notação polinomial.
 * @param {number} decimalValue - Valor em decimal do número digitado.
 * @param {number} base - Base númerica para o qual o valor digitado será convertido.
 */
export function updatePolinomialNotation(decimalValue=NaN, base=0) {
    const expression = document.getElementById("expression")
    expression.innerHTML = ""                                               // Limpa a linha

    if (!isNaN(decimalValue)) {
        let originalValue = decimalValue.toString(base)                     // Armazena o valor original
        let tam = originalValue.length                                      // Armazena o tamanho da string do valor original
        let linha = `<b>${decimalValue}</b> =`                              // Declara a linha que será exibida com o valor final da conversão
        
        // Preenche a linha substituindo as variáveis da fórmula da notação polinomial por valores reais
        let i = 0                                                       
        do {
            linha +=  ` (${originalValue[i]}x${base})^${(tam - (1+i))} +`
            i += 1
        } while (i < tam-1);
        linha += ` (${originalValue[i]}x${base})^${(tam - (1+i))}`

        // Exibe a linha
        expression.innerHTML = linha
        pnmethod.style.display = "block"
        infos[1].innerHTML = ""
    } else {
        pnmethod.style.display = "none"
        infos[1].innerHTML = "<p>Aplica-se somente quando a base a ser convertida é <b>qualquer uma sem ser a decimal</b>, enquanto que a base desejada é <b>decimal</b>.</p>"
    }
}

/**
 * Atualiza a tabela que exemplifica a conversão de base pelo método do agrupamento de bits.
 * @param {number} decimalValue - Valor em decimal do número digitado.
 * @param {number} originBase - Base númerica de origem do número digitado.
 * @param {number} finalBase - Base numérica desejada para a conversão do número digitado.
 */
export function updateBitGrouping(decimalValue=NaN, originBase=0, finalBase=0) {
    const tablebody = document.getElementById("bit-table")
    tablebody.innerHTML = ""                                                   // Limpa a tabela

    if (!isNaN(decimalValue)) {
        let octOrhex = originBase == 2 ? finalBase : originBase                // Armazena a base não-binária da conversão
        let bitGroup = finalBase == 8 || originBase == 8 ? 3 : 4               // Determina qual deve ser o tamanho do grupo de bits
        let binary = decimalValue.toString(2)                                  // Armazena o binário do número convertido
        let proximoMultiplo = Math.ceil(binary.length/bitGroup) * bitGroup     // Determina o tamanho máximo de bits a partir do tamanho do grupo e do binário disponibilizado
        binary = binary.padStart(proximoMultiplo, "0")                         // "Corrige" o binário adicionadno zeros no inicio caso seja necessário

        let groups = []
        let digits = []
        
        // Preenche os arrays conforme eles são grupos de bits ou algarismos da base octal ou hexadecimal
        for (let i = 0; i < binary.length; i += bitGroup) {
            let group = document.createElement('td')
            group.innerHTML = binary.slice(i, i+bitGroup)
            groups.push(group)

            let digit = document.createElement('td')
            digit.innerHTML = parseInt(group.innerHTML, 2).toString(octOrhex)
            digits.push(digit)
        }

        // Inicializa as linhas que receberão os valores dos arrays
        let firstRow = document.createElement('tr')
        let firstCell = document.createElement('td')
        firstRow.appendChild(firstCell)
        let secondRow = document.createElement('tr')
        let secondCell = document.createElement('td')
        secondRow.appendChild(secondCell)
        
        let firstArray = []
        let secondArray = []

        // Determina em qual ordem os algarismos e os seus respectivos grupos de bits devem aparecer
        // conforme a base de origem.
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

        // Exibe a tabela com as informações da conversão
        tablebody.appendChild(firstRow)
        tablebody.appendChild(secondRow)
        bgmethod.style.display = "block"
        infos[2].innerHTML = ""
    } else {
        bgmethod.style.display = "none"
        infos[2].innerHTML = "<p>Aplica-se somente quando a base a ser convertida é <b>octal ou hexadecimal</b> e a base final é <b>binária</b>.</p>"
    }
}