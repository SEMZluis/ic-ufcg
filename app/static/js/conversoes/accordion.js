const acc = document.getElementsByClassName("accordion")
const panels = document.getElementsByClassName("panel")

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", () => {
        acc[i].classList.toggle("bg-dk-green")

        let panel = panels[i]

        if (panel.style.display == "block") {
            panel.style.display = "none"
        } else {
            panel.style.display = "block"
        }
    })
    
}