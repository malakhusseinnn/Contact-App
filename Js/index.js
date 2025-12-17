let addContactBtn = document.querySelector("#addContactBtn");
let addForm = document.querySelector("#addForm");
let crossBtn = document.querySelector("#crossBtn")
let uploadPhotoBtn = document.querySelector("#uploadPhoto");
let photoInput = document.querySelector("#photoInput");
let nameInput = document.querySelector("#fullName");
let phoneNumber = document.querySelector("#phoneNumber");
let emailAddress = document.querySelector("#emailAddress");
let address = document.querySelector("#address");
let group = document.querySelector("#group");
let notes = document.querySelector("#note");
let cancelBtn = document.querySelector("#cancelBtn");
let saveBtn = document.querySelector("#saveContactBtn");
let searchInput = document.querySelector("#searchInput");
let emergency = document.querySelector("#emergency");
let favCheckBox = document.querySelector("#favoriteCheckBox");
let emergencyCheckBox = document.querySelector("#emergencyCheckBox");
let contactForm = document.querySelector("form");
let numContacts = document.querySelector("#numContacts");
let totalContacts = document.querySelector("#total");
let favContacts = document.querySelector("#favoriteContactsCount");
let emerContacts = document.querySelector("#emergencyContactCount");
let favContainer = document.querySelector("#favDivContainer");
let emerContainer = document.querySelector("#emergencyDivContainer");
let noFavDiv = document.querySelector("#noFavDiv");
let noEmerDiv = document.querySelector("#noEmerDiv");
let addOrEditContact = document.querySelector("#addOrEditContact");



function updateFavState() {
    if (favoritesContacts.length === 0) {
        noFavDiv.classList.replace("d-none", "d-flex");
    } else {
        noFavDiv.classList.replace("d-flex", "d-none");
    }
}

function updateEmerState() {
    if (emergencyContacts.length === 0) {
        noEmerDiv.classList.replace("d-none", "d-flex");
    } else {
        noEmerDiv.classList.replace("d-flex", "d-none");
    }
}

if (localStorage.getItem("contacts") == null) {
    var contactList = [];
}
else {
    var contactList = JSON.parse(localStorage.getItem("contacts"));
    display(contactList);
}

if (localStorage.getItem("favorites") == null) {
    var favoritesContacts = [];
    updateFavState();

}
else {
    var favoritesContacts = JSON.parse(localStorage.getItem("favorites"));
    updateFavState();
    displayFavorite(favoritesContacts);
}

if (localStorage.getItem("emergency") == null) {
    var emergencyContacts = [];
    updateEmerState();
}
else {
    var emergencyContacts = JSON.parse(localStorage.getItem("emergency"));
    updateEmerState();
    displayEmergency(emergencyContacts);
}

let favCount = favoritesContacts.length;
let emerCount = emergencyContacts.length;
let contactsCount = contactList.length;



function updateStatistics() {
    favCount = favoritesContacts.length;
    emerCount = emergencyContacts.length;
    contactsCount = contactList.length;

    totalContacts.innerHTML = contactsCount;
    favContacts.innerHTML = favCount;
    emerContacts.innerHTML = emerCount;
    numContacts.innerHTML = contactsCount;
}

updateStatistics();

function displayFavorite(contact) {
    var favoriteDiv = "";

    for (var i = 0; i < favoritesContacts.length; ++i) {
        var firstLetter = contact[i].contactName.slice(0, 1);
        favoriteDiv += `<div class="phones m-3 p-3 d-flex justify-content-between bg-light-gray rounded-4 align-items-center"
                  id="phones">
                  <div class="d-flex gap-3">
                    <div
                      class="icon bg-blue-gredient text-white rounded-3 d-flex justify-content-center align-items-center">
                      ${firstLetter}
                    </div>
                    <div>
                      <p class="mb-0 fw-medium">${contact[i].contactName}</p>
                      <p class="mb-0 fs-small text-gray">${contact[i].phoneNumber}</p>
                    </div>
                  </div>
                  <a class="d-flex justify-content-center align-items-center bg-light-green iconn rounded-2"
                    href="tel:${contact[i].phoneNumber}">
                    <i class="fa-solid fa-phone text-green fs-small"></i>
                  </a>
                </div>`
    }

    favContainer.innerHTML = favoriteDiv;
}


function displayEmergency(contact) {
    var emerDiv = "";

    for (var i = 0; i < emergencyContacts.length; ++i) {
        var firstLetter = contact[i].contactName.slice(0, 1);
        emerDiv += `
                <div class="emer m-3 p-3 d-flex justify-content-between bg-light-gray rounded-4 align-items-center"
                  id="emergency">
                  <div class="d-flex gap-3">
                    <div
                      class="icon bg-blue-gredient text-white rounded-3 d-flex justify-content-center align-items-center">
                       ${firstLetter}
                    </div>
                    <div>
                      <p class="mb-0 fw-medium">${contact[i].contactName}</p>
                      <p class="mb-0 fs-small text-gray">${contact[i].phoneNumber}</p>
                    </div>
                  </div>
                  <a class="d-flex justify-content-center align-items-center bg-light-red iconn rounded-2"
                    href="tel:${contact[i].phoneNumber}">
                    <i class="fa-solid fa-phone text-red fs-small"></i>
                  </a>
                </div>`
    }
    emerContainer.innerHTML = emerDiv;
}

function addContact() {
    let contact = {
        contactIcon: photoInput.value,
        contactName: nameInput.value,
        phoneNumber: phoneNumber.value,
        emailAddress: emailAddress.value,
        address: address.value,
        note: notes.value,
        favoriteCheck: favCheckBox.checked,
        emergencyTag: emergencyCheckBox.checked,
        relTag: group.value,
    };

    contactList.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contactList));
    if (contact.favoriteCheck == true) {
        favoritesContacts.push(contact);
    }
    if (contact.emergencyTag == true) {
        emergencyContacts.push(contact);
    }

    localStorage.setItem("favorites", JSON.stringify(favoritesContacts));
    localStorage.setItem("emergency", JSON.stringify(emergencyContacts));

}

function returnValues(contact) {
    photoInput.value = contact.contactIcon;
    nameInput.value = contact.contactName;
    phoneNumber.value = contact.phoneNumber;
    emailAddress.value = contact.emailAddress;
    address.value = contact.address;
    notes.value = contact.note;
    favCheckBox.checked = contact.favoriteCheck;
    emergencyCheckBox.checked = contact.emergencyTag;
    group.value = contact.relTag;
}

function editValues(contact) {
    contact.contactIcon = photoInput.value;
    contact.contactName = nameInput.value;
    contact.phoneNumber = phoneNumber.value;
    contact.emailAddress = emailAddress.value;
    contact.address = address.value;
    contact.note = notes.value;
    contact.favoriteCheck = favCheckBox.checked;
    contact.emergencyTag = emergencyCheckBox.checked;
    contact.relTag = group.value;
}

function display(list) {
    var contacts = "";

    for (let i = 0; i < list.length; ++i) {
        var firstLetter = list[i].contactName.slice(0, 1);

        var emailContent = list[i].emailAddress ? `
            <div class="mail-icon d-flex justify-content-center align-items-center rounded-3" id="contactEmail">
                <i class="fa-solid fa-envelope"></i>
            </div>
            <p class="mb-0 text-gray">${list[i].emailAddress}</p>
            ` : '';

        var addressContent = list[i].address ? `
        <div class="location-icon d-flex flex-shrink-0 justify-content-center align-items-center rounded-3">
            <i class="fa-solid fa-location-dot"></i>
        </div>
        <p class="mb-0 text-gray fs-sm fw-medium">${list[i].address}</p>
        ` : '';

        var tagsContent = '';

        if (list[i].relTag == "family") {
            tagsContent = `
                <div class="mb-0 w-fit-content rounded-2 px-2 py-1 family">Family</div>
            `
        }
        else if (list[i].relTag == "friends") {
            tagsContent = `<div class="mb-0 w-fit-content rounded-2 px-2 py-1 friend">Friends</div>`
        }
        else if (list[i].relTag == "work") {
            tagsContent = `<div class="mb-0 w-fit-content rounded-2 px-2 py-1 work">Work</div>`
        }
        else if (list[i].relTag == "school") {
            tagsContent = `<div class="mb-0 w-fit-content rounded-2 px-2 py-1 school">Shcool</div>`
        }
        else if (list[i].relTag == "other") {
            tagsContent = `<div class="mb-0 w-fit-content rounded-2 px-2 py-1 other">Other</div>`
        }
        else {
            tagsContent = ``;
        }

        if (list[i].emergencyTag == true) {
            emerCircle = "d-flex";
            notEmer = "d-none";
        }
        else {
            emerCircle = "d-none";
            notEmer = "d-flex";
        }

        if (list[i].favoriteCheck == true) {
            favCircle = "d-flex";
            notFav = "d-none";
        }
        else {
            favCircle = "d-none";
            notFav = "d-flex";
        }

        contacts += `<div class="col-12 col-lg-6">
        <div class="contact-card shadow shadow-sm rounded-4 bg-white d-flex flex-column gap-3" id = "${i}">
                    <div class="d-flex gap-3 px-3 pt-3">
                      <div class="name-icon  position-relative">
                        <div class="icon rounded-3 bg-blue-gredient d-flex align-items-center justify-content-center">
                          <p class="mb-0 fs-5 fw-medium text-white">${firstLetter}</p>
                        </div>
                        <div class="d-flex justify-content-center align-items-center ${favCircle}" id = "favCircle-${i}"><i class="fa-solid fa-star"></i>
                        </div>
                        <div class="d-flex justify-content-center align-items-center ${emerCircle}" id = "emerCircle-${i}">
                          <i class="fa-solid fa-heart-pulse"></i>
                        </div>
                      </div>
                      <div class="d-flex flex-column gap-2">
                        <p class="mb-0 fw-bold">${list[i].contactName}</p>
                        <div class="d-flex gap-2 align-items-center">
                          <div
                            class="phone-icon bg-light-blue rounded-2 d-flex justify-content-center align-items-center">
                            <i class="fa-solid fa-phone text-blue"></i>
                          </div>
                          <p class="mb-0 text-gray fs-sm">${list[i].phoneNumber}</p>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex gap-2 px-3 ">
                    ${emailContent}
                    </div>
                    <div class="d-flex gap-2 px-3">
                    ${addressContent}
                    </div>
                    <div class="d-flex gap-2 tags flex-wrap px-3">
                    ${tagsContent}
                    <div class="d-flex gap-1 align-items-center emer-icon rounded-2 px-2 py-1 ${emerCircle}" id="emergency-${i}">
                        <i class="fa-solid fa-heart-pulse fs-smallest"></i>
                        <div class="mb-0 w-fit-content rounded-2 px-1">Emergency</div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center icons px-3 rounded-top-0 rounded-4">
                      <div class="d-flex gap-3">
                        <div class="icon-green rounded-3 d-flex justify-content-center align-items-center "
                          title="Call">
                          <a href="tel:${list[i].phoneNumber}"><i class="fa-solid fa-phone"></i></a>
                        </div>
                        <div class="icon-message rounded-3 d-flex justify-content-center align-items-center"
                          title="Email">
                          <i class="fa-solid fa-envelope"></i>
                        </div>
                      </div>
                      <div class="d-flex gap-3">
                        <div class="star d-flex gap-3 align-items-center" title="Favorite">
                          <div class="star-1 rounded-3 d-flex justify-content-center align-items-center ${notFav}" id = "star-${i}"><i
                              class="fa-regular fa-star text-gray-2"></i></div>
                          <div class="star-2 rounded-3 d-flex justify-content-center align-items-center ${favCircle}" id = "starr-${i}"><i
                              class="fa-solid fa-star"></i></div>
                        </div>
                        <div class="heart d-flex gap-3 align-items-center" title="Emergency"">
                          <div class="heart-1 rounded-3 d-flex justify-content-center align-items-center ${notEmer}" id = "heart-${i}"><i
                              class="fa-regular fa-heart text-gray-2"></i></div>
                          <div class="heart-2 rounded-3 d-flex justify-content-center align-items-center ${emerCircle}" id = "heartt-${i}"><i
                              class="fa-solid fa-heart-pulse"></i></div>
                        </div>
                        <div class="pen editIcon rounded-3 d-flex justify-content-center align-items-center" title="Edit" id = "edit-${i}">
                          <i class="fa-solid fa-pen text-gray-2"></i>
                        </div>
                        <div class="trash deleteIcon rounded-3 d-flex justify-content-center align-items-center" title="Delete" id = "delete-${i}">
                          <i class="fa-solid fa-trash text-gray-2"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

        `;

    }
    document.querySelector("#contactCards").innerHTML = contacts;
}

let nameErrorMessage = document.querySelector("#nameErrorMessage");
let phoneNumberErrorMessage = document.querySelector("#phoneNumberErrorMessage");
let emailErrorMessage = document.querySelector("#emailErrorMessage");

function clear() {
    photoInput.value = null;
    nameInput.value = null;
    phoneNumber.value = null;
    emailAddress.value = null;
    address.value = null;
    group.value = null;
    notes.value = null;
    favCheckBox.checked = false;
    emergencyCheckBox.checked = false;
    nameInput.classList.remove("warn");
    phoneNumber.classList.remove("warn");
    emailAddress.classList.remove("warn");
    nameErrorMessage.classList.replace("d-flex", "d-none");
    phoneNumberErrorMessage.classList.add("d-flex", "d-none");
    emailErrorMessage.classList.add("d-flex", "d-none");
}


function isInFavorites(contact) {
    for (let i = 0; i < favoritesContacts.length; i++) {
        if (favoritesContacts[i].phoneNumber == contact.phoneNumber) {
            return true;
        }
    }
    return false;
}

function isInEmergency(contact) {
    for (let i = 0; i < emergencyContacts.length; i++) {
        if (emergencyContacts[i].phoneNumber == contact.phoneNumber) {
            return true;
        }
    }
    return false;
}

function reomveFromFavorites(contact) {

    var newFav = [];

    for (let i = 0; i < favoritesContacts.length; ++i) {
        if (favoritesContacts[i].phoneNumber != contact.phoneNumber) {
            newFav.push(favoritesContacts[i]);
        }
    }
    favoritesContacts = newFav;
}

function reomveFromEmergency(contact) {

    var newFav = [];

    for (let i = 0; i < emergencyContacts.length; ++i) {
        if (emergencyContacts[i].phoneNumber != contact.phoneNumber) {
            newFav.push(emergencyContacts[i]);
        }
    }
    emergencyContacts = newFav;
}

let contactCards = document.querySelector("#contactCards");
let editContactIndex = null;

contactCards.addEventListener("click", function (e) {

    var cards = document.querySelectorAll(".contact-card");
    for (let i = 0; i < cards.length; ++i) {
        var id = cards[i].id;

        let star1 = cards[i].querySelector(`#star-${i}`);
        let star2 = cards[i].querySelector(`#starr-${i}`);

        if (star1.contains(e.target)) {
            star1.classList.replace("d-flex", "d-none");
            star2.classList.replace("d-none", "d-flex");
            cards[i].querySelector(`#favCircle-${id}`).classList.replace("d-none", "d-flex");
            contactList[i].favoriteCheck = true;
            if (!isInFavorites(contactList[i])) {
                favoritesContacts.push(contactList[i]);
            }
            updateStatistics();
            updateFavState();
            displayFavorite(favoritesContacts);
        }

        if (star2.contains(e.target)) {
            star2.classList.replace("d-flex", "d-none");
            star1.classList.replace("d-none", "d-flex");
            cards[i].querySelector(`#favCircle-${id}`).classList.replace("d-flex", "d-none");
            contactList[i].favoriteCheck = false;
            reomveFromFavorites(contactList[i]);
            updateStatistics();
            updateFavState();
            displayFavorite(favoritesContacts);
        }


        let heart1 = cards[i].querySelector(`#heart-${i}`);
        let heart2 = cards[i].querySelector(`#heartt-${i}`);

        if (heart1.contains(e.target)) {
            heart1.classList.replace("d-flex", "d-none");
            heart2.classList.replace("d-none", "d-flex");
            cards[i].querySelector(`#emerCircle-${id}`).classList.replace("d-none", "d-flex");
            cards[i].querySelector(`#emergency-${id}`).classList.replace("d-none", "d-flex");
            contactList[i].emergencyTag = true;
            if (!isInEmergency(contactList[i])) {
                emergencyContacts.push(contactList[i]);
            }
            updateStatistics();
            updateEmerState();
            displayEmergency(emergencyContacts);
        }

        if (heart2.contains(e.target)) {
            heart2.classList.replace("d-flex", "d-none");
            heart1.classList.replace("d-none", "d-flex");
            cards[i].querySelector(`#emerCircle-${id}`).classList.replace("d-flex", "d-none");
            cards[i].querySelector(`#emergency-${id}`).classList.replace("d-flex", "d-none");
            contactList[i].emergencyTag = false;
            reomveFromEmergency(contactList[i]);
            updateEmerState();
            updateStatistics();
            displayEmergency(emergencyContacts);
        }

        let deleteIcon = document.querySelector(`#delete-${id}`);

        if (deleteIcon.contains(e.target)) {
            Swal.fire({
                title: "Delete Contact?",
                text: "Are you sure you want to delete Ali? This action cannot be undone.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#C62222",
                cancelButtonColor: "#606773",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    let deletedContact = contactList[i];
                    cards[i].remove();
                    contactList.splice(i, 1);
                    if (isInFavorites(deletedContact)) {
                        reomveFromFavorites(deletedContact);
                    }

                    if (isInEmergency(deletedContact)) {
                        reomveFromEmergency(deletedContact);

                    }

                    updateStatistics();
                    updateFavState();
                    updateEmerState();

                    localStorage.setItem("contacts", JSON.stringify(contactList));
                    localStorage.setItem("favorites", JSON.stringify(favoritesContacts));
                    localStorage.setItem("emergency", JSON.stringify(emergencyContacts));

                    display(contactList);
                    displayFavorite(favoritesContacts);
                    displayEmergency(emergencyContacts);

                    Swal.fire({
                        title: "Deleted!",
                        text: "Contact has been deleted.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            });


        }

        let editIcon = document.querySelector(`#edit-${id}`)

        if (editIcon.contains(e.target)) {
            addOrEditContact.innerHTML = "Edit Contact";
            returnValues(contactList[i]);
            addForm.classList.replace("d-none", "d-flex");
            editContactIndex = i;
        }

    }


    localStorage.setItem("contacts", JSON.stringify(contactList));
    localStorage.setItem("favorites", JSON.stringify(favoritesContacts));
    localStorage.setItem("emergency", JSON.stringify(emergencyContacts));
})

addContactBtn.addEventListener("click", function () {
    addOrEditContact.innerHTML = "Add New Contact"
    addForm.classList.replace("d-none", "d-flex");
})

crossBtn.addEventListener("click", function () {
    addForm.classList.replace("d-flex", "d-none");
})

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
})

cancelBtn.addEventListener("click", function () {
    clear();
    addForm.classList.replace("d-flex", "d-none");
})

uploadPhotoBtn.addEventListener("click", function () {
    photoInput.click();
})

function favBeforeUpdate(phoneNumber) {
    for (let i = 0; i < favoritesContacts.length; i++) {
        if (favoritesContacts[i].phoneNumber === phoneNumber) {
            return i;
        }
    }
    return -1;
}

function emerBeforeUpdate(phoneNumber) {
    for (let i = 0; i < emergencyContacts.length; i++) {
        if (emergencyContacts[i].phoneNumber === phoneNumber) {
            return i;
        }
    }
    return -1;
}

function searchContact() {
    var searchWord = searchInput.value;
    if (searchWord === "") {
        display(contactList);
    }

    var searchedContacts = [];
    for (var i = 0; i < contactList.length; ++i) {
        if (contactList[i].contactName.toLowerCase().includes(searchWord.toLowerCase()) || contactList[i].emailAddress.toLowerCase().includes(searchWord.toLowerCase()) || contactList[i].phoneNumber.includes(searchWord)) {
            searchedContacts.push(contactList[i]);
        }
    }

    if (searchedContacts.length != 0) {
        display(searchedContacts);
    }
    else {
        document.querySelector("#contactCards").innerHTML = `
            <div class="not-found d-flex align-items-center justify-content-center gap-3 flex-column py-5">
            <div class="not-found-icon d-flex justify-content-center align-items-center rounded-3">
            <i class="fa-solid fa-address-book fs-3"></i>
            </div>
            <div class="d-flex justify-content-center align-items-center flex-column">
            <p class="mb-0 no-contact">No contacts found</p>
            <p class="mb-0 click-add">Click "Add Contact" to get started</p>
            </div>
        </div>
        `;

    }
}

searchInput.addEventListener("input", function () {
    searchContact();
})


let nameRegex = /^[a-zA-Z\s]{2,50}$/;

nameInput.addEventListener("input", function () {
    let name = nameInput.value;
    if (!nameRegex.test(name)) {
        nameErrorMessage.classList.replace("d-none", "d-flex");
        nameInput.classList.add("warn")
    } else {
        nameErrorMessage.classList.replace("d-flex", "d-none");
        nameInput.classList.remove("warn");
    }
});


let phoneNumberRegex = /^(\+20)?(01[0125][0-9]{8})$/;

phoneNumber.addEventListener("input", function () {
    let phone = phoneNumber.value;
    if (!phoneNumberRegex.test(phone)) {
        phoneNumberErrorMessage.classList.replace("d-none", "d-flex");
        phoneNumber.classList.add("warn")
    } else {
        phoneNumberErrorMessage.classList.replace("d-flex", "d-none");
        phoneNumber.classList.remove("warn");
    }
})

let emailRegex = /^[a-zA-Z0-9]{1,10}(@gmail\.com)$/;

emailAddress.addEventListener("input", function () {
    let email = emailAddress.value;
    if (!emailRegex.test(email)) {
        emailErrorMessage.classList.replace("d-none", "d-flex");
        emailAddress.classList.add("warn")
    } else {
        emailErrorMessage.classList.replace("d-flex", "d-none");
        emailAddress.classList.remove("warn");
    }
})
let duplicatePhoneContactName;
function phoneNumberExist(number, ignoreEdit) {
    for (let i = 0; i < contactList.length; ++i) {
        if (contactList[i].phoneNumber === number) {
            if(ignoreEdit != null && i == ignoreEdit){
                continue;
            }
            duplicatePhoneContactName = contactList[i].contactName;
            return true;
        }
    }
    return false;
}

function validateContactForm() {

    if (nameInput.value.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Missing Name",
            text: "Please enter a name for the contact!",
        });
        return false;
    }

    if (!nameRegex.test(nameInput.value.trim())) {
        Swal.fire({
            icon: "error",
            title: "Invalid Name",
            text: "Name should contain only letters and spaces (2-50 characters)",
        });
        return false;
    }

    if (phoneNumber.value.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Missing Phone",
            text: "Please enter a phone number!",
        });
        return false;
    }

    if (!phoneNumberRegex.test(phoneNumber.value.trim())) {
        Swal.fire({
            icon: "error",
            title: "Invalid Phone",
            text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
        });
        return false;
    }

    if (phoneNumberExist(phoneNumber.value.trim() , editContactIndex)) {
        Swal.fire({
            icon: "error",
            title: "Duplicate Phone Number",
            text: `A contact with this phone number already exists: ${duplicatePhoneContactName}`,
        });
        return false;
    }

    if (
        emailAddress.value.trim() !== "" &&
        !emailRegex.test(emailAddress.value.trim())
    ) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email address",
        });
        return false;
    }

    return true;
}


saveBtn.addEventListener("click", function () {
    if (!validateContactForm()) return;
    let action = "";
    if (editContactIndex != null) {
        let oldPhoneNumber = contactList[editContactIndex].phoneNumber;
        let favOldIndex = favBeforeUpdate(oldPhoneNumber);
        let emerOldIndex = emerBeforeUpdate(oldPhoneNumber);

        editValues(contactList[editContactIndex]);
        if (contactList[editContactIndex].favoriteCheck) {
            if (favOldIndex !== -1) {
                favoritesContacts[favOldIndex] = contactList[editContactIndex];
            } else if (!isInFavorites(contactList[editContactIndex])) {

                favoritesContacts.push(contactList[editContactIndex]);
            }
        } else {
            reomveFromFavorites(contactList);
        }


        if (contactList[editContactIndex].emergencyTag) {
            if (emerOldIndex !== -1) {
                emergencyContacts[emerOldIndex] = contactList[editContactIndex];
            } else if (!isInEmergency(contactList[editContactIndex])) {
                emergencyContacts.push(contactList[editContactIndex]);
            }
        } else {
            reomveFromEmergency(contactList);
        }
        editContactIndex = null;
        localStorage.setItem("contacts", JSON.stringify(contactList));
        localStorage.setItem("favorites", JSON.stringify(favoritesContacts));
        localStorage.setItem("emergency", JSON.stringify(emergencyContacts));
        action = "Updated";
    }
    else {
        addContact();
        localStorage.setItem("contacts", JSON.stringify(contactList));
        localStorage.setItem("favorites", JSON.stringify(favoritesContacts));
        localStorage.setItem("emergency", JSON.stringify(emergencyContacts));
        action = "Added";
    }

    updateStatistics();
    updateEmerState();
    updateFavState();

    displayFavorite(favoritesContacts);
    displayEmergency(emergencyContacts);
    display(contactList);
    clear();

    addForm.classList.replace("d-flex", "d-none");

     Swal.fire({
        title: `${action}!`,
        text: `Contact has been ${action} Suceessfully!`,
        icon: "success",
        draggable: true,
        timer: 1500,
        showConfirmButton: false
    });
})