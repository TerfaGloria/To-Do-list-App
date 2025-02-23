const contentHolder=document.querySelector('.content-holder')
const addInput=document.querySelector('.add-input')
const addBtn=document.querySelector('.add-btn')

let tasks=[]
const storageKey='tasks'

try {addBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const value=addInput.value
    tasks.push(value)
    renderTasks()
   

   
})


function renderTasks(){

contentHolder.innerHTML=''

    tasks.forEach((task, idx)=>{

        

const main=document.createElement("div")
main.classList.add('main')


const subMain=document.createElement('div')
subMain.classList.add('submain')

const checkBox=document.createElement('input')
checkBox.classList.add('checkbox')
checkBox.type='checkbox'

const textInput=document.createElement('input')
textInput.classList.add('textinput')
textInput.type='text'
textInput.value=task
textInput.setAttribute('readonly', 'readonly')

const btnDiv=document.createElement('div')
btnDiv.classList.add('btndiv')

const editBtn=document.createElement('button')
editBtn.classList.add('editbtn')
editBtn.textContent='Edit'

const deleteBtn=document.createElement('button')
deleteBtn.classList.add('deletebtn')
deleteBtn.textContent='Delete'




editBtn.addEventListener("click",(e)=>{
    e.preventDefault()

    if(editBtn.textContent.toLowerCase()==='edit'){
        editBtn.textContent='save'
        textInput.removeAttribute('readonly', 'readonly')
        textInput.focus()

    }else{
        editBtn.textContent='edit'
        textInput.setAttribute('readonly', 'readonly')
        saveTasks()
    }
})

deleteBtn.addEventListener('click',(e,idx)=>{
  e.preventDefault()

  tasks.splice(idx, 1)
contentHolder.removeChild(main)
renderTasks()

  
  
})





subMain.appendChild(checkBox);
subMain.appendChild(textInput);
btnDiv.appendChild(editBtn);
btnDiv.appendChild(deleteBtn);
main.appendChild(subMain)
main.appendChild(btnDiv)
contentHolder.appendChild(main);




    })

    
   

}

function saveTasks(){
    const stringTask=JSON.stringify(tasks)
    localStorage.setItem(storageKey, stringTask)

    console.log(localStorage,storageKey)

}

function loadTasks(){
    const oldTasks=localStorage.getItem(storageKey)
    if(oldTasks) 
      tasks = JSON.parse(oldTasks) 
    renderTasks()
  }
  
  




    
} catch (error) {
    console.log('Error loading:', error)
}



document.addEventListener('DOMContentLoaded',loadTasks)