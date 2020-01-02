const list = document.getElementById('list');
const formName = document.getElementById('formName');
const formUrl = document.getElementById('formUrl');
const addButton = document.getElementById('addButton');
let updateButton = document.getElementById('updateButton');

// fetch the dogs list
function getDogs() {
    fetch('http://localhost:3000/facultys')
        .then(function (response) {
            // Trasform server response to get the dogs
            response.json().then(function (dogs) {
                appendDogsToDOM(dogs);
            });
        });
};

// post dogs
function postDog() {
    // creat post object
    const postObject = {
        name: formName.value,
        img: formUrl.value,
        about: formAbout.value

    }
    // post dog
    fetch('http://localhost:3000/facultys', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        // Get the new dogs list
        getDogs();
        // Reset Form
        resetForm();
    });
}

// delete dog
function deleteDog(id) {
    // delete dog
    fetch(`http://localhost:3000/facultys/${id}`, {
        method: 'DELETE',
    }).then(function () {
        // Get the new dogs list
        getDogs();
    });
}

// update dog
function updateDog(id) {
    // creat put object
    const putObject = {
        name: formName.value,
        img: formUrl.value,
        about: formAbout.value
    }
    // update dog
    fetch(`http://localhost:3000/facultys/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(function () {
        // Get the new dogs list
        getDogs();

        // change button event from update to add
        addButton.disabled = false;

        // remove all event from update button
        clearUpdateButtonEvents();

        // Reset Form
        resetForm();
    });
}

// copy edited dog information to form and add event listener on update button
function editDog(dog) {
    // copy dog information to form
    formName.value = dog.name;
    formUrl.value = dog.img;
    formAbout.value = dog.about;

    // disable add button
    addButton.disabled = true;

    // clear all events update button events
    clearUpdateButtonEvents();

    // enable and add event on update button
    updateButton.disabled = false;
    updateButton.addEventListener('click', function () {
        updateDog(dog.id)
    });

}

// Create and append img and name DOM tags
function appendDogsToDOM(dogs) {
    // remove dog list if exist
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    // create and append tags
    for (let i = 0; i < dogs.length; i++) {
        // create image obj
        let img = document.createElement('img');
        img.width = 250;
        img.height = 200;
        img.src = dogs[i].img;
        // create name obj
        let name = document.createElement('span');
        name.innerText = dogs[i].name;
        //create about obj
        let about = document.createElement('p');
        about.innerText = dogs[i].about;
        // create button and event for edit and delete
        let editButton = document.createElement('button')
        // add event on btn and pass dog id more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
        editButton.addEventListener('click', function () {
            editDog(dogs[i])
        });
        editButton.innerText = 'Edit';
        let deleteButton = document.createElement('button')
        // add event on btn and pass dog object more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
        deleteButton.addEventListener('click', function () {
            deleteDog(dogs[i].id)
        });
        deleteButton.innerText = 'Delete';
        // create a container for img and name
        let oneSpace = document.createElement('br');
        let towSpace = document.createElement('br');

        let container = document.createElement('div');
        container.style.display = 'grid';
        container.style.border = 'solid 2px yellow';
        container.style.padding = '30px';
        container.style.backgroundColor = '#e6e6ff';
        // append elements to container
        container.appendChild(img);
        container.appendChild(oneSpace);
        container.appendChild(towSpace);
        container.appendChild(name);
        container.appendChild(about);
        container.appendChild(editButton);
        container.appendChild(deleteButton);

        // append container to DOM (list div)
        list.appendChild(container);
    }
}

// reset form
function resetForm() {
    formName.value = '';
    formUrl.value = '';
    formAbout.value = '';
}
//  remove Update Button to clear events more at https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
function clearUpdateButtonEvents() {
    let newUpdateButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
    updateButton = document.getElementById('updateButton');
}
// add event listener on add button
addButton.addEventListener('click', postDog);

// get dogs
getDogs();
