
let inputName = document.getElementById("inputName");
let inputNomor = document.getElementById("inputNomor");
let inputAlmat = document.getElementById("inputAlamat");
let inputStatus = document.getElementById("inputStatus");
let btnAdd = document.getElementById("btnAdd");
let tableBody = document.getElementById("tableBody");


let currentIndex = 0;

let items = [];


if(JSON.parse(localStorage.getItem("Items")) !== null){

    items = JSON.parse(localStorage.getItem("Items"));
    displayItem();
}


btnAdd.addEventListener("click",_=> {
  
    if(btnAdd.innerHTML === "Add Item"){
        let item = {
            name: inputName.value,
            Alamat: inputAlamat.value,
            Nomor: inputNomor.value,
            Status: inputStatus.value
        };

        items.push(item)

        localStorage.setItem("Items",JSON.stringify(items))
        displayItem()
    } else if(btnAdd.innerHTML === "Update Item"){
        updateItem()
    }
})

function displayItem(){
    let temp = "";
    let StatusRow = "";
    for(let i=0;i<items.length;i++){
        if(items[i].Status === "Selesai"){
            StatusRow = `<td class="">${items[i].Status}</td>`
        } else if(items[i].Status === "Dikirim"){
            StatusRow = `<td class="">${items[i].Status}</td>`
        } else if(items[i].Status === "Proses"){
            StatusRow = `<td class="">${items[i].Status}</td>`
        }
        temp += `
        <tr>
            <td>${i + 1}</td>
            <td>${items[i].name}</td>
            <td>${items[i].Alamat}</td>
            <td>${items[i].Nomor}</td>
            ${StatusRow}
            <td>
                <i onclick="getItemInformation(${i})" title="Update" class="fa-solid me-2 text-warning fa-pen hover:cursor-pointer"></i>
                <i onclick="deleteItem(${i})" title="Delete" class="fa-solid text-danger fa-trash hover:cursor-pointer"></i>
            </td>
        </tr>`
    }
    tableBody.innerHTML = temp
}
function getItemInformation(index){
    currentIndex = index
    inputName.value = items[currentIndex].name
    inputAlamat.value = items[currentIndex].Alamat
    inputNomor.value = items[currentIndex].Nomor
    inputStatus.value = items[currentIndex].Status
    btnAdd.classList.replace("btn-success","btn-warning")
    btnAdd.innerHTML = "Update Item"
}
function updateItem(){
    let item = {
        name: inputName.value,
        Alamat: inputAlmat.value,
        Nomor: inputNomor.value,
        Status: inputStatus.value
    };
    items[currentIndex] = item
    displayItem()
    localStorage.setItem("Items",JSON.stringify(items))
    btnAdd.classList.replace("btn-warning","btn-success")
    btnAdd.innerHTML = "Add Item"
}
function deleteItem(index){
    items.splice(index,1)
    displayItem()
    localStorage.setItem("Items",JSON.stringify(items))
}
