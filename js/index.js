


let rowData = document.getElementById("rowData")
let searchContainer = document.getElementById("searchContainer")
let submitBtn;
$(document).ready(()=>{
   searchByName("").then(()=>{
      $(".loading-screen").fadeOut(300)
      $("body").css("overflow","visible")
   })
   
})

function openNav(){
   $(".side-nav-menu").animate({left:0},500)
   $(".open-close-icon").removeClass("fa-align-justify")
$(".open-close-icon").addClass("fa-x")
}

function closeNav(){
   let boxwidth=$(".side-nav-menu .black-nav").outerWidth()
   $(".side-nav-menu").animate({left:-boxwidth},500)
   $(".open-close-icon").addClass("fa-align-justify")
   $(".open-close-icon").removeClass("fa-x")
}
closeNav() 

$(".side-nav-menu i.open-close-icon").click(()=>{
   if($(".side-nav-menu").css("left")=="0px"){
         closeNav()
   }else{
    openNav()
   }

})



function displayMeals(arr){
   let cartona="";
   for(let i=0;i<arr.length;i++){
      cartona +=`
      <div class="col-md-3">
                    <div onclick="getMealDetails('${arr[i].idMeal}')"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${arr[i].strMealThumb}"/>
                        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${arr[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
      `
   }
   rowData.innerHTML=cartona
}

searchByName("")

async function getCategories(){
   searchContainer.innerHTML="";
   let response= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
   response= await response.json()
   console.log(response.categories)
   displayCategories(response.categories)
}
function displayCategories(arr){
   let cartona="";
   for(let i=0;i<arr.length;i++){
      cartona +=`
      <div class="col-md-3">
                    <div onclick="getCategoriesMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${arr[i].strCategoryThumb}"/>
                        <div class="meal-layer position-absolute text-center text-black p-2">
                            <h3>${arr[i].strCategory}</h3>
                            <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
                </div>
      `
   }
   rowData.innerHTML=cartona
}

async function getArea(){
   searchContainer.innerHTML="";
   let response= await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
   response=await response.json()
   console.log(response.meals)
   displayArea(response.meals)
}
function displayArea(arr){
   let cartona="";
   for(let i=0;i<arr.length;i++){
      cartona +=`
      <div class="col-md-3">
                    <div onclick="getAreaMeals('${arr[i].strArea}')" class="text-center rounded-2 cursor-pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${arr[i].strArea}</h3>
                   </div>
       </div>
      `
   }
   rowData.innerHTML=cartona
}
async function getIngredients(){
   searchContainer.innerHTML="";
   let response= await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
   response=await response.json()
   console.log(response.meals)
   displayIngredients(response.meals.slice(0,20))
}
function displayIngredients(arr){
   let cartona="";
   for(let i=0;i<arr.length;i++){
      cartona +=`
      <div class="col-md-3">
                    <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="text-center rounded-2 cursor-pointer">
                    <i class="fa-solid fa-burger fa-4x"></i>
                            <h3>${arr[i].strIngredient}</h3>
                            <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                   </div>
       </div>
      `
   }
   rowData.innerHTML=cartona
}
async function getCategoriesMeals(category){
   let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
   response=await response.json()
   console.log(response.meals)
   displayMeals(response.meals.slice(0,20))
}
async function getAreaMeals(area){
   let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
   response=await response.json()
   console.log(response.meals)
   displayMeals(response.meals.slice(0,20))
}
async function getIngredientsMeals(ingredient){
   let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
   response=await response.json()
   console.log(response.meals)
   displayMeals(response.meals.slice(0,20))
}

async function getMealDetails(mealID){
   closeNav()
   searchContainer.innerHTML="";
   let response= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
   response= await response.json()
   console.log(response.meals[0])
   displayMealDetails(response.meals[0])
}
function displayMealDetails(meal){
   searchContainer.innerHTML="";
   let ingredients=``
   for(i=0;i<=20;i++){
      if(meal[`strIngredient${i}`]){
        ingredients +=`<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
      }
   }

   let tags=meal.strTags?.split(",")
   if(!tags) { tags=[]}
   let strTags=``
   for(i=0;i<=tags.length;i++){
      strTags +=`<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
   }
   let cartona=`
   <div class="col-md-4">
   <img class="w-100" src="${meal.strMealThumb}">
   <h2>${meal.strMeal}</h2>
</div>
<div class="col-md-8">
   <h3>instruction</h3>
   <p>${meal.strInstructions}</p>
   <h4><span class="fw-bolder">area:</span>${meal.strArea}</h4>
   <h4 ><span class="fw-bolder">category:</span>${meal.strCategory}</h4>
   <h4>recipes:</h4>
   <ul class="list-unstyled g-3 d-flex flex-wrap">
       ${ingredients}
   </ul>
   <h4>tags:</h4>
   <ul class="list-unstyled g-3 d-flex flex-wrap">
      ${strTags} 
   </ul>
   <a target="_blank" href="${meal.strSource}" class="btn btn-success">source</a>
   <a   target="_blank" href="${meal.strYoutube}" class="btn btn-danger">youtube</a>
</div>

   `
   rowData.innerHTML=cartona;
}

function showSearchInputs(){
   searchContainer.innerHTML=`

    <div class="row py-4">
        <div class="col-md-6">
            <input onkeyup="searchByName(this.value)" type="text" placeholder="search by name" class="bg-transparent text-white form-control"/>
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByLetter(this.value)" maxlength="1" type="text" placeholder="search by fristletter" class="bg-transparent text-white form-control"/>
        </div>
    </div>
`
rowData.innerHTML=""
}

 async function searchByName(term){
   let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
   response= await response.json()
    response.meals? displayMeals(response.meals):displayMeals([])
   }
 async function searchByLetter(term){
      term==""? term="a": "" ;
   let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
   response= await response.json()
    response.meals? displayMeals(response.meals):displayMeals([])
   }

   function showContact(){
      searchContainer.innerHTML="";
      rowData.innerHTML=`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
      <div class="container w-75 text-center">
          <div class="row g-3">
              <div class="col-md-6">
                  <input id="nameInput"  onkeyup="inputsValidation()"  type="text" placeholder="enter your name" class="form-control"/>
                  <div id="nameAlert" class="alert alert-danger w-100 m-1 d-none">
                   special numbers and charcters not allowed
                  </div>
              </div>
              <div class="col-md-6">
                  <input id="emailInput" onkeyup="inputsValidation()"  type="email" placeholder="enter your email" class="form-control"/>
                  <div id="emailAlert" class="alert alert-danger w-100 m-1 d-none">
                    email not valid *ksjhf@yyy.zzz
                  </div>
              </div>
              <div class="col-md-6">
                  <input id="phoneInput" onkeyup="inputsValidation()" type="number" placeholder="enter your phone" class="form-control"/>
                  <div id="phonelAlert" class="alert alert-danger w-100 m-1 d-none">
                      enter valid phone number
                  </div>
              </div>
              <div class="col-md-6">
                  <input id="ageInput" onkeyup="inputsValidation()"  type="number" placeholder="enter your age" class="form-control"/>
                  <div id="ageAlert" class="alert alert-danger w-100 m-1 d-none">
                      enter valid age
                  </div>
              </div>
              <div class="col-md-6">
                  <input id="passwordInput" onkeyup="inputsValidation()"  type="password" placeholder="enter your password" class="form-control"/>
                  <div id="passwordAlert" class="alert alert-danger w-100 m-1 d-none">
                      enter valid password *minimum 8 charcters,atleast one letter and one charcter
                  </div>
              </div>
              <div class="col-md-6">
                  <input id="repasswordInput" onkeyup="inputsValidation()"  type="password" placeholder="enter your repassword" class="form-control"/>
                  <div id="repasswordAlert" class="alert alert-danger w-100 m-1 d-none">
                      enter valid repassword
                  </div>
              </div>
          </div>
          <button id="submitBtn" disabled class="btn btn-outline-danger my-3 px-3">submit</button>
      </div>
  </div>
`
   submitBtn=document.getElementById("submitBtn")

   document.getElementById("nameInput").addEventListener("focus",()=>{
      nameInputTouched=true;
   })
   document.getElementById("emailInput").addEventListener("focus",()=>{
      emailInputTouched=true;
   })
   document.getElementById("phoneInput").addEventListener("focus",()=>{
      phoneInputTouched=true;
   })
   document.getElementById("ageInput").addEventListener("focus",()=>{
      ageInputTouched=true;
   })
   document.getElementById("passwordInput").addEventListener("focus",()=>{
      passwordInputTouched=true;
   })
   document.getElementById("repasswordInput").addEventListener("focus",()=>{
      repasswordInputTouched=true;
   })
   }
    
   let nameInputTouched=false;
   let emailInputTouched=false;
   let phoneInputTouched=false;
   let ageInputTouched=false;
   let passwordInputTouched=false;
   let repasswordInputTouched=false;
   

   function inputsValidation(){
      if(nameInputTouched){
      if(nameValidation()){
         document.getElementById("nameAlert").classList.replace("d-block","d-none")
      }else{
         document.getElementById("nameAlert").classList.replace("d-none","d-block")
      }
        }

       if(emailInputTouched){   
      if(emailValidation()){
         document.getElementById("emailAlert").classList.replace("d-block","d-none")
      }else{
         document.getElementById("emailAlert").classList.replace("d-none","d-block")
 
      }}
      if(phoneInputTouched){
      if(phoneValidation()){
         document.getElementById("phonelAlert").classList.replace("d-block","d-none")
      }else{
         document.getElementById("phonelAlert").classList.replace("d-none","d-block")
 
      }}
      if(ageInputTouched){
      if(ageValidation()){
         document.getElementById("ageAlert").classList.replace("d-block","d-none")
      }else{
         document.getElementById("ageAlert").classList.replace("d-none","d-block")
 
      }}
      if(passwordInputTouched){
      if(passwordValidation()){
         document.getElementById("passwordAlert").classList.replace("d-block","d-none")
      }else{
         document.getElementById("passwordAlert").classList.replace("d-none","d-block")
 
      }}
      if(repasswordInputTouched){
      if(repasswordValidation()){
         document.getElementById("repasswordAlert").classList.replace("d-block","d-none")
      }else{
         document.getElementById("repasswordAlert").classList.replace("d-none","d-block")
 
      }}

      if(nameValidation()&&
         emailValidation()&&
         ageValidation()&&
         phoneValidation()&&
         passwordValidation()&&
         repasswordValidation()
      ){
         submitBtn.removeAttribute("disabled")
      }else{
         submitBtn.setAttribute("disabled",true)
         }
   }
   function nameValidation(){
      return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
   }
   function emailValidation(){
      return (/^[\w-\.\d*]+@[\w\d]+(\.\w{2,4})$/.test(document.getElementById("emailInput").value))
   }

   function phoneValidation(){
      return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
   }
   function ageValidation(){
      return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
   }
   
   function passwordValidation(){
      return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
   }
   function repasswordValidation(){
      return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
   }