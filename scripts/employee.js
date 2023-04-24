
$(document).ready(function() {
    const employeeURL = `${window.BASE_URL}/user/employee`;

    const tbody = document.querySelector('#tbody');
    
    // get all employees
    const getData = async () => {
        const response = await fetch(employeeURL);
        const data = await response.json();
        data.forEach(employee => {
            const tr = document.createElement('tr');
            const id = document.createElement('td');
            id.innerText = employee.id;
            
            const name = document.createElement('td');
            name.innerText = employee.name;
            
            const skills = document.createElement('td');
            skills.innerText = employee.skills;

            const daysAvailable = document.createElement('td');
            daysAvailable.innerText = employee.daysAvailable;
            
            const action = document.createElement('td');
            
            // Add onclick function to "Edit" button
            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.classList.add('btn', 'btn-dark', 'btn-sm');
            editButton.dataset.bsToggle = 'modal';
            editButton.dataset.bsTarget = '#editEmployee';
            editButton.dataset.employeeId = employee.id;
            editButton.innerText = 'Edit';
            editButton.addEventListener('click', () => {
                handleEditEmployee(employee.id);
            });
            action.appendChild(editButton);
            
            // Add onclick function to "Delete" button
            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'mx-2');
            deleteButton.dataset.bsToggle = 'modal';
            deleteButton.dataset.bsTarget = '#deleteEmployee';
            deleteButton.dataset.employeeId = employee.id;
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => {
                handleDeleteEmployee(employee.id);
            });
            
            action.appendChild(deleteButton);
            tr.appendChild(id);
            tr.appendChild(name);
            tr.appendChild(skills);
            tr.appendChild(daysAvailable);
            tr.appendChild(action);
            tbody.appendChild(tr);
        });
    }
    getData();

    const getCheckedValues = (formClass) => {
        const checkedValues = [];
        $(`.${formClass} input:checked`).each(function() {
          checkedValues.push($(this).val());
        });
        return checkedValues;
      }

    // Add employee
    $('#addEmployee').on('click', '#addEmployeeSubmit', function() {
        const name = $('#addEmployee #name').val();
        const skills = getCheckedValues('skills');
        const daysAvailable = getCheckedValues('daysAvailable');
        const employee = {name, skills, daysAvailable};
        // console.log(employee);
        $.ajax({
            url: employeeURL,
            type: 'POST',
            data: JSON.stringify(employee),
            contentType: 'application/json',
            success: function() {

                location.reload();
            }, 
            error: function() {
                console.log('error');
            }
        });
    });

    const setCheckedValues = (formId, values) => {
        $(`.${formId} input`).prop('checked', false);
        values.forEach(value => {
          $(`.${formId} input[value='${value}']`).prop('checked', true);
        });
      }

    // Edit employee
    const handleEditEmployee = (id) => {
        const url = `${employeeURL}/${id}`;
        const editEmployeeSubmit = $('#editEmployeeSubmit');

        $.ajax({
            url: url,
            type: 'GET',
            success: function(employee) {
                $('#editEmployee #name').val(employee.name);
                setCheckedValues('editSkills', employee.skills);
                setCheckedValues('editDaysAvailable', employee.daysAvailable);
            },
            error: function() {
                console.log('error');
            }
        });

        editEmployeeSubmit.on('click', function(e) {
            const name = $('#editEmployee #name').val();
            const skills = getCheckedValues('editSkills');
            const daysAvailable = getCheckedValues('editDaysAvailable');
            const employee = 
            {
                id: id, 
                name: name,
                skills: skills,
                daysAvailable: daysAvailable 
            };

            $.ajax({
                url: url,
                type: 'Patch',
                data: JSON.stringify(employee),
                contentType: 'application/json',
                success: function() {
                    location.reload();
                },
                error: function() {
                    console.log('error');
                }
            });
        });
    }

    // Delete employee
    const handleDeleteEmployee = (id) => {
        const url = `${employeeURL}/${id}`;
        const deleteEmployeeSubmit = $('#deleteEmployeeConfirm');

        deleteEmployeeSubmit.on('click', function(e) {
            $.ajax({
                url: url,
                type: 'DELETE',
                statusCode: {
                    200: function() {
                      $('#deleteEmployee').modal('hide');
                      location.reload();
                    }
                  },
                  error: function(error) {
                    // Handle error response from API
                    console.log(error);
                  }
            });
        });
    }

});



