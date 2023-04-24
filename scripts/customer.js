
$(document).ready(function(){
    const customerURL = `${window.BASE_URL}/user/customer`;

    // Get all customers
    const getData = async () => {
        const response = await fetch(customerURL);
        const data = await response.json();
        data.forEach(customer => {
            const tr = document.createElement('tr');
            const id = document.createElement('td');
            id.innerText = customer.id;
            
            const name = document.createElement('td');
            name.innerText = customer.name;

            const phoneNumber = document.createElement('td');
            phoneNumber.innerText = customer.phoneNumber;

            const notes = document.createElement('td');
            notes.innerText = customer.notes;

            const petIds = document.createElement('td');
            petIds.innerText = customer.petIds; 

            const action = document.createElement('td');

            // Add onclick function to "Edit" button
            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.classList.add('btn', 'btn-dark', 'btn-sm');
            editButton.dataset.bsToggle = 'modal';
            editButton.dataset.bsTarget = '#editCustomer';
            editButton.dataset.customerId = customer.id;
            editButton.innerText = 'Edit';
            editButton.addEventListener('click', () => {
                handleEditCustomer(customer.id);
            });
            action.appendChild(editButton);

            // Add onclick function to "Delete" button
            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'mx-2');
            deleteButton.dataset.bsToggle = 'modal';
            deleteButton.dataset.bsTarget = '#deleteCustomer';
            deleteButton.dataset.customerId = customer.id;
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => {
                handleDeleteCustomer(customer.id);
            });

            action.appendChild(deleteButton);
            tr.appendChild(id);
            tr.appendChild(name);
            tr.appendChild(phoneNumber);
            tr.appendChild(notes);
            tr.appendChild(petIds);
            tr.appendChild(action);
            tbody.appendChild(tr);
        });
    }
    getData();

    // Add a new customer

    $('#addCustomer').on('click','#addCustomerSubmit', function (e) {
        const name = $('#addCustomer #name').val();
        const phoneNumber = $('#addCustomer #phoneNumber').val();
        const notes = $('#addCustomer #notes').val();
        // const errorToast = $('#errorToast');
        

        $.ajax({
            url: customerURL,
            type: 'POST',
            data: JSON.stringify({
                name: name,
                phoneNumber: phoneNumber,
                notes: notes,
            }),
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
                location.reload();
            },
            error: function (data) {
                e.preventDefault();
                console.log(data);
                // const toast = bootstrap.Toast.getOrCreateInstance(errorToast);
                // toast.show();
            }
        });
    });

    // Edit a customer
    const handleEditCustomer = (id) => {
        const editCustomerSubmit = $('#editCustomerSubmit');
        const editCustomerName = $('#editCustomer #name');
        const editCustomerPhoneNumber = $('#editCustomer #phoneNumber');
        const editCustomerNotes = $('#editCustomer #notes');
        const editCustomerErrorToast = $('#errorToast');

        // Get the customer info
        $.ajax({
            url: `${customerURL}/${id}`,
            type: 'GET',
            success: function (data) {
                editCustomerName.val(data.name);
                editCustomerPhoneNumber.val(data.phoneNumber);
                editCustomerNotes.val(data.notes);
            },
            error: function (data) {
                console.log(data);
            }
        });

        // Edit the customer
        editCustomerSubmit.on('click', function (e) {
            const name = editCustomerName.val();
            const phoneNumber = editCustomerPhoneNumber.val();
            const notes = editCustomerNotes.val();

            $.ajax({
                url: `${customerURL}/${id}`,
                type: 'PATCH',
                data: JSON.stringify({
                    id: id,
                    name: name,
                    phoneNumber: phoneNumber,
                    notes: notes,
                }),
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);
                    location.reload();
                },
                error: function (data) {
                    e.preventDefault();
                    console.log(data);
                    const toast = bootstrap.Toast.getOrCreateInstance(editCustomerErrorToast);
                    toast.show();
                }
            });
        });
    }

    // Delete a customer
    const handleDeleteCustomer = (id) => {
        const deleteCustomerSubmit = $('#deleteCustomerConfirm');
        const deleteCustomerErrorToast = $('#errorToast');

        deleteCustomerSubmit.on('click', function (e) {
            $.ajax({
                url: `${customerURL}/${id}`,
                type: 'DELETE',
                statusCode: {
                    200: function() {
                      $('#deletePet').modal('hide');
                      location.reload();
                    }
                  },
                  error: function(error) {
                    // Handle error response from API
                    console.log(error);
                    const toast = bootstrap.Toast.getOrCreateInstance(deleteCustomerErrorToast);
                    toast.show();
                  }
            });
        });
    }

});
