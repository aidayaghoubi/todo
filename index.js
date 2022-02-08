const form = document.getElementById('addForm');
const textBox = document.getElementById('add-todo');
const todoBox = document.querySelector('.todo-box');
const isDoingBox = document.querySelector('.is-doing-box');
const doneBox = document.querySelector('.done-box');
const expireDate = document.getElementById('expired-date');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new Date();
    const year = d.getFullYear();
    const mounth = months[d.getMonth()];
    const day = days[d.getDay()];
    console.log(d.toLocaleString());
    const expDATE = expireDate.value;
    // const fullDate = year + ' ' + mounth + ' ' + day;
    const fullDate=d.toLocaleTimeString();
    const todo = textBox.value;
    if (todo) {
        addtodos(todo, fullDate, expDATE);

    }
    textBox.value = '';
})



function LSaddtodo(txt, exp, cre) {

    const newTodo = document.createElement('div');
    newTodo.classList.add('mytodo');
    newTodo.classList.add('todoo');
    newTodo.innerHTML = `
        <div class="main">
        <p>${txt} </p>
        <div>
            <button class="is-doing"><i class="fas fa-solid fa-play"></i></button>
            <button class="done"><i class="fas fa-solid fa-check"></i></button>
            <button class="delete" ><i class="fas fa-solid fa-trash"></i></button>
        </div>
    </div>
    <div class="dates">
        <span>${cre}</span>
        <p class="expdate">${exp}</p>
    </div>
      `;
    todoBox.appendChild(newTodo);

    newTodo.querySelector('.is-doing').addEventListener('click', e => {

        addIsDoing(newTodo);

    });
    newTodo.querySelector('.done').addEventListener('click', e => {

        adddirecrdone(newTodo);

    });
    newTodo.querySelector('.delete').addEventListener('click', e => {

        newTodo.remove();
        saveTodos();
    });
    saveTodos();
}

function addDone(newtodo) {
   
    // newtodo.querySelector('.is-doing').classList.add('hide');
    newtodo.querySelector('.done').classList.add('hide');
    newtodo.querySelector('.delete').classList.remove('hide');
    newtodo.classList.remove('todoo');
    newtodo.classList.remove('isdoing');
    newtodo.classList.add('done');
    doneBox.appendChild(newtodo);
    saveTodos();
}


function adddirecrdone(newtodo){
    
    newtodo.querySelector('.is-doing').classList.add('hide');
    newtodo.querySelector('.done').classList.add('hide');
    newtodo.querySelector('.delete').classList.remove('hide');
    newtodo.classList.remove('todoo');
    newtodo.classList.remove('isdoing');
    newtodo.classList.add('done');
    doneBox.appendChild(newtodo);
    saveTodos();
}

function LSaddisDoing(txt, exp, cre) {

    const newTodo = document.createElement('div');
    newTodo.classList.add('mytodo');
    newTodo.classList.add('isdoing');
    newTodo.innerHTML = `

        <div class="main">
        <p>${txt} </p>
        <div>
            <button class="done"><i class="fas fa-solid fa-check"></i></button>
            <button class="delete" ><i class="fas fa-solid fa-trash"></i></button>
        </div>
    </div>
    <div class="dates">
        <span>${cre}</span>
        <p class="expdate">${exp}</p>
    </div>
      `;
    isDoingBox.appendChild(newTodo);

    newTodo.querySelector('.done').addEventListener('click', e => {

        addDone(newTodo);

    });
    newTodo.querySelector('.delete').addEventListener('click', e => {

        newTodo.remove();
        saveTodos();

    });
    saveTodos();
}


function LSaddDoneBox(txt, exp, cre) {

    const newTodo = document.createElement('div');
    newTodo.classList.add('mytodo');
    newTodo.classList.add('done');
    newTodo.innerHTML = `
        <div class="main">
        <p>${txt} </p>
        <div>
            <button class="delete" ><i class="fas fa-solid fa-trash"></i></button>
        </div>
    </div>
    <div class="dates">
        <span>${cre}</span>
        <p class="expdate">${exp}</p>
    </div>
      `;
    doneBox.appendChild(newTodo);
    newTodo.querySelector('.delete').addEventListener('click', e => {
        newTodo.remove();
        saveTodos();
    });
    saveTodos();
}



function addIsDoing(newTodo) {
    newTodo.querySelector('.is-doing').classList.add('hide');
    newTodo.classList.remove('todoo');
    newTodo.classList.add('isdoing');
    isDoingBox.appendChild(newTodo);
    saveTodos();
}


function addtodos(todo, fullDate, expDATE) {

    const newTodo = document.createElement('div');
    newTodo.classList.add('mytodo');
    newTodo.classList.add('todoo');

    newTodo.innerHTML = `
        <div class="main">

        <p>${todo} </p>
        <div>
           
            <button class="is-doing"><i class="fas fa-solid fa-play"></i></button>
            <button class="done"><i class="fas fa-solid fa-check"></i></button>
            <button class="delete" ><i class="fas fa-solid fa-trash"></i></button>
        </div>
    </div>
    <div class="dates">
        <span>created at ${fullDate}</span>
        <p class="expdate">expire date at ${expDATE}</p>
    </div>
      `;
    todoBox.appendChild(newTodo);

    newTodo.querySelector('.is-doing').addEventListener('click', e => {

        addIsDoing(newTodo);

    });
    newTodo.querySelector('.done').addEventListener('click', e => {

        adddirecrdone(newTodo);

    });
    newTodo.querySelector('.delete').addEventListener('click', e => {

        newTodo.remove();
        saveTodos();

    })
    saveTodos();

}






if (localStorage.getItem('todos')) {
    const final = JSON.parse(localStorage.getItem('todos'));
    console.log(final);
    final.forEach(item => {
        if (item.done == true) {
            LSaddDoneBox(item.text, item.expdate, item.creDate);
        } else if (item.isdoing == true) {
            LSaddisDoing(item.text, item.expdate, item.creDate);
        } else if (item.todo == true) {
            LSaddtodo(item.text, item.expdate, item.creDate);
        }
    });
    saveTodos();
  
}



function saveTodos() {
    const todosDb = document.querySelectorAll('.mytodo');
    const todoha = [];
    todosDb.forEach(item => {
        const txt = item.querySelector('.main p').innerText;
        const crDate = item.querySelector('.dates span').innerText;
        const expdate = item.querySelector('.dates p').innerText;
        todoha.push({
            text: txt,
            expdate: expdate,
            creDate: crDate,
            done: item.classList.contains('done'),
            todo: item.classList.contains('todoo'),
            isdoing: item.classList.contains('isdoing')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todoha));
}


