//Create :

// To call the elements for Html file

let productName = document.getElementById('name')
let productPrice=document.getElementById('price')
let productCategory=document.getElementById('cat')
let productDescription=document.getElementById('desc')
let addBtn=document.getElementById('addBtn')
let updateBtn=document.getElementById('updateBtn');
let searchBar=document.getElementById('searchBar');
let userInput = document.querySelectorAll('input:not([type="submit"]):not(#searchBar):not(#price)');

//To create Array to save a data from the Object
let container=[]
let temp;


// This Code use to check if have saved data inside my borwser memory and add new data by using showData function
if (localStorage.getItem ('product')!=null){
    container=JSON.parse(localStorage.getItem('product'))
    showData()

}
productName.focus();

let productNameRegex = /^[a-zA-Z0-9\s]{2,}$/;
let productPriceRegex = /^\d+(\.\d{2,10})?$/;


// To Create an object 

addBtn.addEventListener('click',function(e){
    e.preventDefault();

    for (let i = 0; i < userInput.length; i++) {
        let input = userInput[i];
        if (input.value.length > 0) {
            if (!productNameRegex.test(input.value)) {
                input.nextElementSibling.innerHTML = "Not Valid";
                return; // Exit the function early if validation fails
            } else {
                // Clear any previous error message if validation passes
                input.nextElementSibling.innerHTML = "";
            }}


        }

    let inputsValid = true;
    for(let i=0;i<userInput.length;i++){
        if(userInput[i].value==0){
            userInput[i].nextElementSibling.innerHTML=`${userInput[i].name} Required`;
            inputsValid = false; // Set flag to false if any input is empty
            
        }
    }
    // If any input is empty, do not proceed
    if (!inputsValid) {
        return;
    }

        // Create a product object with data from input fields
    let product={
        name:productName.value,
        price:productPrice.value,
        Category:productCategory.value,
        Description:productDescription.value,
    
    }

    // Push the product object into a container (presumably an array)
    container.push(product)
    //this code to save my data in the browser 
    localStorage.setItem('product',JSON.stringify(container))
    //To Display our Data 
    showData()
        //To clear my value inside the inputs after create and display the data  
    clearData()

})
// ::::::::::::::::::::::::::::::::::::
//Read
//Display the data to loop ____ this is a Globle Functions (to invoke this function we 
// will put the function name inside function btn for after create pls run my function
//  as below )

function showData(){
    let tabel=``
    for (let i =0; i<container.length;i++){
        tabel+=`            <tr>
        <th scope="row"> <p id='nameProduct'>${i+1}
            </p><input type="text"
                class="form-control d-none "
                id="nameUpdate"></th>
        <th scope="row"> <p id='nameProduct'>
                ${container[i].name} </p><input
                type="text" class="form-control d-none "
                id="nameUpdate"></th>
        <td> <p
                id='priceProduct'>${container[i].price} </p><input
                type="text" class="form-control d-none "
                id="priceUpdate"></td>
        <td> <p
                id='catProduct'>${container[i].Category}</p><input
                type="text" class="form-control d-none "
                id="catUpdate"></td>
        <td> <p
                id='descProduct'>${container[i].Description}</p><input
                type="text" class="form-control d-none "
                id="descUpdate"></td>
        <td><button onclick="deleteData(${i})" class="btn btn-outline-danger">Delete</button></td>
        <td><button onclick="updateData(${i})" class="btn btn-outline-warning"id='updatebttn'>Update</button>
            <button class="btn btn-outline-success px-3 show"id='savebtn'>Save</button></td>
    </tr>
        `
    }
    document.getElementById('info').innerHTML=tabel
}

// this function used to clear my input after creation and Display the data 

function clearData(){
 productName.value=`` 
 productPrice.value=``
 productCategory.value=``
 productDescription.value=``
}


// to make update or edit first of all create a temperory variable
// Create a Globle Variable without value
// Go to function updateData(i) and write a Variable name = i 
// then => container[temp]=product;

//Update 
function updateData(i){
    productName.value=container[i].name;
    productPrice.value=container[i].price;
    productCategory.value=container[i].Category;
    productDescription.value=container[i].Description;

    // addBtn.style.display='none'
    // updateBtn.style.display='inline-block'
    addBtn.classList.toggle('show')//toggle = يروح يدور هو يوجد كلاس بالاسم ده لو موجود امسحه لو مش موجود ضيفه
    updateBtn.classList.toggle('show')
    temp=i;

}
updateBtn.addEventListener('click',function(){
    let product={
        name:productName.value,
        price:productPrice.value,
        Category:productCategory.value,
        Description:productDescription.value,
    
    };
    container[temp]=product;
    localStorage.setItem('product',JSON.stringify(container))
    console.log(container);
    showData()
    clearData()
    addBtn.classList.toggle('show')
    updateBtn.classList.toggle('show')

})




// Delete 

function deleteData(index){
    container.splice(index,1)
    localStorage.setItem('product',JSON.stringify(container))
    showData()
}



//to set the search function fist of all when the user press any key on a keyboard this function will run so first :
// add event on key up

//Search  

searchBar.addEventListener('keyup', function() {
    // Call the search function with the value of the search input
    search(this.value); //معناها انا بنادي علي الدالة اللي بعد ما اليوزر يضغط علي اي حرف نفذ ليا الاوامر اللي موجودة في الدالة دي
});
// هنا بعد الضغط انا محتاج الاله تعمل ايه تروحي تدور فين وعلي ايه 
// بنعمل متغير ونقوله لو كنت تساوي الاراي اللي متخزن فيها البيانات اعمل فلتر 
// ارجعلي ب opject.name وخلي الاحرف تكون صغيرة وعلشان نبحث في حروف نستخدم include ثم 
//  طيب عايزه يظهر الالبيانات فيين ؟؟؟ في الجدول ها نروح ناخده من دالة ال Create  ونضيفه 
// وبعد كده اعرضلي الحاجه دي     document.getElementById('info').innerHTML=tabel


function search(value) {
    let filteredProducts = container.filter(product => {
        return product.name.toLowerCase().includes(value.toLowerCase());
    });

    let tabel=``
    for (let i =0; i<container.length;i++){
        if(container[i].name.toLowerCase().includes(value.toLowerCase())){
        tabel+=`            <tr>
        <th scope="row"> <p id='nameProduct'>${i+1}
            </p><input type="text"
                class="form-control d-none "
                id="nameUpdate"></th>
        <th scope="row"> <p id='nameProduct'>
                ${container[i].name} </p><input
                type="text" class="form-control d-none "
                id="nameUpdate"></th>
        <td> <p
                id='priceProduct'>${container[i].price} </p><input
                type="text" class="form-control d-none "
                id="priceUpdate"></td>
        <td> <p
                id='catProduct'>${container[i].Category}</p><input
                type="text" class="form-control d-none "
                id="catUpdate"></td>
        <td> <p
                id='descProduct'>${container[i].Description}</p><input
                type="text" class="form-control d-none "
                id="descUpdate"></td>
        <td><button onclick="deleteData(${i})" class="btn btn-outline-danger">Delete</button></td>
        <td><button onclick="updateData(${i})" class="btn btn-outline-warning"id='updatebttn'>Update</button>
            <button class="btn btn-outline-success px-3 show"id='savebtn'>Save</button></td>
    </tr>
        `
    }
    document.getElementById('info').innerHTML=tabel
}
            
        }

