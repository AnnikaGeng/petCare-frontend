
(() => {
    "use strict"; 

    const allPetUrl =  `${window.BASE_URL}/pet`;

    const tbody = document.querySelector('#tbody');
    
    const editPet = async (petId) => {
      const editPetUrl = `${allPetUrl}/${petId}`;
      const response = await fetch(editPetUrl);
      const data = await response.json();
      // Do something with the fetched data
      console.log(data);
      // Populate the modal with the data
      const typeInput = document.querySelector('#editPet #type');
      typeInput.value = data.type;

      const nameInput = document.querySelector('#editPet #name');
      nameInput.value = data.name;

      const birthDateInput = document.querySelector('#editPet #Birthday');
      birthDateInput.value = data.birthDate;

      const ownerIdInput = document.querySelector('#editPet #owner');
      ownerIdInput.value = data.ownerId;

      const notesInput = document.querySelector('#editPet #notes');
      notesInput.value = data.notes;

      const editPetSubmit = document.querySelector('#editPetSubmit');
      editPetSubmit.setAttribute('data-pet-id', petId);
    }

    const deletePet = async (petId) => {
      const deletePetConfirm = document.querySelector('#deletePetConfirm');
      deletePetConfirm.setAttribute('data-pet-id', petId);

      // const response = await fetch(deletePetUrl, {
      //   method: 'DELETE'
      // });
      // //if status code is 200, then reload the page
      // if (response.status === 200) {
      //   location.reload();
      // } else {
      //   //if status code is not 200, then log the error
      //   const data = await response.json();
      //   console.log(data);
      // }
      
    }

    const getData = async () => {
        const response = await fetch(allPetUrl);
        const data = await response.json();
    
        data.forEach(pet => {
            const tr = document.createElement('tr');

            const id = document.createElement('td');
            id.textContent = pet.id;
            tr.appendChild(id);
            
            const typeCell = document.createElement('td');
            typeCell.textContent = pet.type;
            tr.appendChild(typeCell);
            
            const nameCell = document.createElement('td');
            nameCell.textContent = pet.name;
            tr.appendChild(nameCell);
            
            const ownerIdCell = document.createElement('td');
            ownerIdCell.textContent = pet.ownerId;
            tr.appendChild(ownerIdCell);
            
            const birthDateCell = document.createElement('td');
            birthDateCell.textContent = pet.birthDate;
            tr.appendChild(birthDateCell);
            
            const notesCell = document.createElement('td');
            notesCell.textContent = pet.notes;
            tr.appendChild(notesCell);
            
            const actionsCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'btn btn-dark btn-sm px-2';
            editButton.setAttribute('data-bs-toggle', 'modal');
            editButton.setAttribute('data-bs-target', '#editPet');
            editButton.onclick = function() {
              editPet(pet.id);
            };
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'btn btn-danger btn-sm ms-1';
            deleteButton.setAttribute('data-bs-toggle', 'modal');
            deleteButton.setAttribute('data-bs-target', '#deletePet');
            deleteButton.onclick = function() {
              deletePet(pet.id);
            };
            actionsCell.appendChild(deleteButton);
            
            tr.appendChild(actionsCell);
            
            tbody.appendChild(tr);
            }
        );
    }

    

    getData();
    

})();