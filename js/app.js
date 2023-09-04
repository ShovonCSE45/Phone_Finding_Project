const loadPhones = async(searchText,dataLimit) =>{
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data ,dataLimit);
}

const displayPhones = (phones,dataLimit) => {
    const phoneContainer = document.getElementById("phone_container");
    phoneContainer.innerText = "";
    // display 10 phones
    const showAll = document.getElementById("show_add");
    if ( dataLimit && phones.length > 10) {
        phones = phones.slice(0,10);
        showAll.classList.remove("d-none");

    }
    else {
        showAll.classList.add("d-none");
    }

    

    // Display No phone found
    const noPhone = document.getElementById("no_found_message"); 
    if(phones.length === 0){
        noPhone.classList.remove("d-none");

    }  
    else {
        noPhone.classList.add("d-none");
    } 
    // Display all phones
    phones.forEach( phone => {
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
               <h5 class="card-title">${phone.phone_name}</h5>
               <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
               <button onclick = "loadPhoneDetailes('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Show Detailse</button>

            </div>
        </div>
        
        `
        phoneContainer.appendChild(phoneDiv);

    })
    // stop toggole spener or searching procedure
    toggleSpinner(false);

}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById("search_field");
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);

}

//  adding search button activities
document.getElementById("btn_search").addEventListener("click", function () {
//    searching started
processSearch(10);

})
// Search input field enter key handler
document.getElementById("search_field").addEventListener("keypress", function (e) {
    // console.log(e.key);
    if(e.key == "Enter"){
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loadingSection = document.getElementById("loader");
    if(isLoading){
        loadingSection.classList.remove("d-none");

    }
    else{
        loadingSection.classList.add("d-none");

    }

}
// not the best way to show all data phones
document.getElementById("btn_show_all").addEventListener("click", function(){
    processSearch();

})
// detailse button activities
const loadPhoneDetailes  = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);


}

// display phone details with modal
const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById("staticBackdropLabel");
    modalTitle.innerText = phone.name;

    const phoneLonceDate = document.getElementById("okDetailsId");
    phoneLonceDate.innerText = phone.releaseDate;

    const phoneBrand = document.getElementById("brand");
    phoneBrand.innerText = phone.brand;

    phoneLonceDate.innerHTML = `
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : "No detailse"}</p>
    <p>Blutooth : ${phone.others.Bluetooth ?phone.others.Bluetooth: "No Bluetooth Phone"}</p>
    
    `


}   

loadPhones("phone");