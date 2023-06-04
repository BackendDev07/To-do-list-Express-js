const textUser = document.querySelector('#input')
const addBtn = document.querySelector('#add')
const list = document.querySelector('#list')

const students = [
    {
        id: 1,
        text: 'Hello' 
    },
]


renderDevice()

function renderDevice() {
    for( let i = 0; i < students.length; i++ ) {
        list.innerHTML += `<li> <div class="off">
        <span>${i+1}.</span> ${students[i].text}
    </div> <button  onclick="del(${i})"  id="del">Delete</button></li>`
    }
}

addBtn.onclick = () => {
    let a = textUser.value
     
    students.push({
        text: a,
    })

    list.innerHTML = ''

    renderDevice()

    textUser.value = ''
}

function del(i) {
    students.splice(i, 1); 
    list.innerHTML = ''; 
 
    renderDevice();
}