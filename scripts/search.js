

$(document).ready(function() {
    const searchTable = $('.searchTable');
    const tbody = $('.searchTable tbody');
    const searchBaseURL = `${window.BASE_URL}/schedule`; 
    
    // change activity of tab when clicked
    $('.nav-link').click(function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        searchTable.hide();
        // show corresponding section
        $('.section').removeClass('active');
        $($(this).attr('href')).addClass('active');
    }
    );

    // get result from pet id
    $('#searchByPet').click(function(event) {
        event.preventDefault();
        const petId = $('#petInput').val();
        const url = `${searchBaseURL}/pet/${petId}`;
        const getDate = async () => {
            const response = await fetch(url)
            const data = await response.json();
            if (data.length === 0) {
                alert('No schedule found');
                return;
            }
            tbody.empty();
            searchTable.show();
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

                tr.appendChild(id);
                tr.appendChild(employeeId);
                tr.appendChild(petId);
                tr.appendChild(date);
                tr.appendChild(activities);
                tbody.append(tr);
            });
        }
        getDate();
        
    });

    // get result from employee id
    $('#searchByEmployee').click(function(event) {
        event.preventDefault();
        const employeeId = $('#employeeInput').val();
        const url = `${searchBaseURL}/employee/${employeeId}`;
        const getDate = async () => {
            const response = await fetch(url)
            const data = await response.json();
            if (data.length === 0) {
                alert('No schedule found');
                return;
            }
            tbody.empty();
            searchTable.show();
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

                tr.appendChild(id);
                tr.appendChild(employeeId);
                tr.appendChild(petId);
                tr.appendChild(date);
                tr.appendChild(activities);
                tbody.append(tr);
            });
        }
        getDate();
        
    });

    // get result from owner id
    $('#searchByOwner').click(function(event) {
        event.preventDefault();
        const ownerId = $('#ownerInput').val();
        const url = `${searchBaseURL}/customer/${ownerId}`;
        const getDate = async () => {
            const response = await fetch(url)
            const data = await response.json();
            if (data.length === 0) {
                alert('No schedule found');
                return;
            }
            tbody.empty();
            searchTable.show();
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

                tr.appendChild(id);
                tr.appendChild(employeeId);
                tr.appendChild(petId);
                tr.appendChild(date);
                tr.appendChild(activities);
                tbody.append(tr);
            });
        }
        getDate();
        
    });

});