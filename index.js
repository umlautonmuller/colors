let columns = []

function getColumns() {
    columns = document.getElementById("randomizer").children
    console.log(columns)
}

function updateColumns () {
    for (let i = 0; i<columns.length; i++) {
        let idealWidth = 100/columns.length
        console.log(`${idealWidth}%`)
        columns[i].style.width = `${idealWidth}%`

        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        columns[i].style.backgroundColor = `#${randomColor}`

        columns[i].innerHTML = `#${randomColor}`
    }
}

getColumns()
updateColumns()