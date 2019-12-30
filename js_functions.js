

// MongoDB

function extract_images ( i ){
  //Connect to the db
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://localhost:27017/projectDB", {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
      if (err)  { return window.alert(err); }
      var dbo = db.db("projectDB");
      dbo.collection("Images").find().toArray(function(err, result) {
      m = "<img src=";
      m += result[i].path;
      m += `class="memberPhoto">`;
      if ( i == 0 )
        m += `<h4> Buna! <br><br>Eu sunt Floroiu Miruna, studenta la Facultatea de Matematica si Informatica a
            Universitatii Bucuresti.
            <br>Ador sa calatoresc, sa pictez si sa codez :3
            <br><br><a href="https://github.com/miruna1224"></a>
            <a href="https://www.linkedin.com/in/miruna-floroiu-72533216a/"></a>
            <a href="https://www.facebook.com/wT80gH"></a>
        </h4>`;
      else m += `<h4> <br> Hello! <br> <br> Eu sunt Niga Alexandru-Constantin, student la Facultatea de Matematica si Informatica
          a Universitatii din Bucuresti.
          <br>Sunt plin de energie cand sunt inconjurat de oameni faini si ador sa ascult muzica si sa pictez!
          <br><br><a href="https://github.com/alexniga"></a>
          <a href="https://www.linkedin.com/in/alexandru-niga/"></a>
          <a href="https://www.facebook.com/alex.niga.71"></a>
      </h4>`;
      console.log ( m );
      var newNode = document.createElement('div');
      newNode.innerHTML = m;
      document.getElementById('aici').appendChild(newNode);
      db.close();
    });
  });
}


function simplu(){
   var newNode = document.createElement('div');
   newNode.innerHTML = 'bai mergeee calm down si alte alea';
   document.getElementById('aici').appendChild(newNode);
}








//php functions

function Hide() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

function AddToCart ( a ){
    alert ( "star " + a + " " + "Added to cart");
    $.get("ItemView.php", { id: a });
}



 function LogoutJS() {
 	alert ( "deci ajunge aici ");
 	$("button").click(function(){
		$.ajax({
			type: "POST",
			url: 'php_functions.php',
			data:{
				action:'Logout'
			},
			success:function(output) {
				alert("success");
			}
			error: function(outpuy){
				alert("error");
			}

		});
 	}
 }


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
