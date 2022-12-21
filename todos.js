const form = document.querySelector("form");
const toDos = document.querySelector(".toDos");
const toDoInput = document.querySelector("input");
const toDoHead = document.querySelector(".head");
const subP = document.querySelector(".sub");
const resetBtn = document.querySelector(".reset");


/* 날짜 가져오는 거 */
const date = new Date();
const weekDay = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'] 

/* todolist local이름과 넣고 빼는 배열 */
const TODOLIST = "toDoList";
let toDoList = [];

toDoHead.textContent = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
subP.textContent = weekDay[date.getDay()];

/*데이터 초기화 함수 */
const reset = ()=>{
    toDoList = [];
    saveToDo();
    toDos.replaceChildren();
};

toDoHead.addEventListener("change",reset);
resetBtn.addEventListener("click",reset);
// 

/* TODOLIST localStorage 업데이트 시켜주는 함수 */
const saveToDo = ()=>{
    localStorage.setItem(TODOLIST ,JSON.stringify(toDoList))
}

/* 사용자가 입력한 할 일을 객체안에 넣어서 toDoList배열에 넣어주는 함수 */
const save = (todo)=>{
    const toDoObj = {
        text : todo,
        id : toDoList.length + 1
    }
    toDoList.push(toDoObj);
    saveToDo()
}

/* filter메소드를 사용하여 x버튼 클릭한 부모요소 삭제하는 함수 */
const del = (e) =>{
    const target = e.target;
    const btn = target.parentNode;
    const box = btn.parentNode;
    const li = box.parentNode;
    toDos.removeChild(li);
    toDoList = toDoList.filter((toDo)=> toDo.id !== Number(li.id));
    saveToDo()
}

/* li안에 아이탬들 상세정보 적은 곳 */
const paint = (todo)=>{
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");
    const check = document.createElement("input");
    const label = document.createElement("label");
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const img = document.createElement("img");

    div2.classList.add("btn-box");
    div.classList.add("contant");
    label.setAttribute("for",`check${toDoList.length + 1}`);
    check.id = `check${toDoList.length + 1}`
    check.type = "checkbox";
    check.classList.add("check");
    check.addEventListener("change",(e)=>{
        span.style.textDecoration = e.target.checked ? `line-through` : "";
        span.style.opacity = e.target.checked ? 0.2 : 1;
        btn.style.opacity = e.target.checked ? 1 : '';
        span.style.textDecorationThickness = '3px';
    });
    img.src = "./img/x-btn.svg";
    btn.addEventListener("click",del)
    btn.classList.add("x-btn");
    span.textContent = todo
    btn.appendChild(img);
    div.appendChild(check);
    div.appendChild(label);
    div.appendChild(span);
    div2.appendChild(btn);
    li.appendChild(div);
    li.appendChild(div2);
    li.id = toDoList.length + 1;
    li.classList.add("todo");
    toDos.appendChild(li);
}

/* submit이벤트에 넣어서 사용자가 입력한 값을 저장하고  li이로 그려주는 함수 */ 
const create = (e)=>{
    e.preventDefault();
    const todo = toDoInput.value
    if(todo.length !== 0){
        paint(todo);
        save(todo);
        toDoInput.value = ""
    }
}

/* 웹페이지가 새로고침 되었을 때, localStorage안에 저장되어있던 데이터 불러서 그려주는 함수*/
const loadToDo = ()=>{
    const load = localStorage.getItem(TODOLIST);
    if(load !== null){
        const parse = JSON.parse(load);
        for(let toDo of parse){
            const {text} = toDo;
            paint(text)
            save(text);
        }
    }
};

/* 기본적인 form의 submit메소드 */
const init = ()=>{
    loadToDo()
    form.addEventListener("submit",create)
}

init();