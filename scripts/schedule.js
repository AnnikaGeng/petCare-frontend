
let date;
let skills;

$(document).ready(function() {
    const scheduleURL = `${window.BASE_URL}/schedule`;
    const availableEmployeeURL = `${window.BASE_URL}/user/employee/availability`;

    const tbody = document.querySelector('#tbody');

    // get all schedules
    const getData = async () => {
        const response = await fetch(scheduleURL);
        const data = await response.json();
        data.forEach(schedule => {
            const tr = document.createElement('tr');
            const id = document.createElement('td');
            id.innerText = schedule.id;

            const employeeId = document.createElement('td');
            employeeId.innerText = schedule.employeeIds;

            const petId = document.createElement('td');
            petId.innerText = schedule.petIds;

            const date = document.createElement('td');
            date.innerText = schedule.date;

            const activities = document.createElement('td');
            activities.innerText = schedule.activities;

            const action = document.createElement('td');

            // Add onclick function to "Delete" button
            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'mx-2');
            deleteButton.dataset.bsToggle = 'modal';
            deleteButton.dataset.bsTarget = '#deleteSchedule';
            deleteButton.dataset.scheduleId = schedule.id;
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => {
                handleDeleteSchedule(schedule.id);
            });

            action.appendChild(deleteButton);
            tr.appendChild(id);
            tr.appendChild(employeeId);
            tr.appendChild(petId);
            tr.appendChild(petId);
            tr.appendChild(date);
            tr.appendChild(activities);
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

    // add schedule
    $('#nextButton').click(function() {
        const day = $('#date').val();
        skills = getCheckedValues('skills');
        const time = $('#time').val();
        date = `${day} ${time}`;

        const data = {
            date: date,
            skills: skills
        };
        if (date === '') {
            alert('Please select a date');
            return;
        }
        if (skills.length === 0) {
            alert('Please select at least one service');
            return;
        }
        if (time === '') {
            alert('Please select a time');
            return;
        }

        console.log(data);

        $.ajax({
            url: availableEmployeeURL,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(data) {
                const availableEmployees = data;
                if (availableEmployees.length === 0) {
                    alert('No available employee');
                    return;
                }
                const employeeSelect = $('#employeeSelect');
                employeeSelect.empty();
                availableEmployees.forEach(employee => {
                    const option = document.createElement('option');
                    option.value = employee.id;
                    option.innerText = employee.name;
                    employeeSelect.append(option);
                }
                );
                $('#addSchedule').modal('hide');
                $('#employeeModal').modal('show');
            },
            error: function(error) {
                console.log(error);
                console.log('error');
            }
        });
    })

    $('#createButton').click(function() {
        const employeeId = $('#employeeSelect').val();
        const petId = $('#perIds').val();

        const data = {
            employeeIds: [employeeId],
            petIds: [petId],
            date: date,
            activities: skills
        };
        console.log(data);
        $.ajax({
            url: scheduleURL,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(data) {
                alert('Schedule created successfully');
                location.reload();
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    // delete schedule
    const handleDeleteSchedule = (scheduleId) => {
        $('#confirmDelete').click(function() {
            $.ajax({
                url: `${scheduleURL}/${scheduleId}`,
                type: 'DELETE',
                statusCode: {
                    200: function() {
                        alert('Schedule deleted successfully');
                        location.reload();
                    }
                },
                error: function(error) {
                    alert('Error deleting schedule, please try again');
                    console.log(error);
                }

            });
        });
    }


});