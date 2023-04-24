
$(document).ready(function(){
  
    $('#addPet').on('click','#addPetSubmit', function (e) {
      const selectedType = $('#type option:selected');
      const type = selectedType.text();
      // To get the content from the form, we can use jQuery to select the input fields by their IDs and retrieve their values using the .val() method. For example:
      const name = $('#name').val();
      const birthDate = $('#Birthday').val();
      const ownerId = $('#owner').val();
      const notes = $('#notes').val();

      // To pass the data to an API, we can use jQuery's AJAX method to make a POST request to the API endpoint with the data as the request body. For example:

      $.ajax({
        url: `${window.BASE_URL}/pet`,
        method: 'POST',
        data: JSON.stringify({
          type: type,
          name: name,
          birthDate: birthDate,
          ownerId: ownerId,
          notes: notes
        }),
        contentType: 'application/json',
        success: function(response) {
          // Handle successful response from API
          console.log(response);
          $('#addPet').modal('hide');
          location.reload(); // Add this line to refresh the page
        },
        error: function(error) {
          // Handle error response from API
          console.log(error);
        }
      }); 

    });

    $('#editPet').on('click','#editPetSubmit', function (e) {
      const selectedType = $('#editPet #type option:selected');
      const type = selectedType.text();
      const name = $('#editPet #name').val();
      const birthDate = $('#editPet #Birthday').val();
      const ownerId = $('#editPet #owner').val();
      const notes = $('#editPet #notes').val();
      console.log(notes);
      const petId = e.target.dataset.petId;

      $.ajax({
        url: `${window.BASE_URL}/pet/${petId}`,
        method: 'PATCH',
        data: JSON.stringify({
          id: petId,
          type: type,
          name: name,
          birthDate: birthDate,
          ownerId: ownerId,
          notes: notes
        }),
        contentType: 'application/json',
        success: function(response) {
          // Handle successful response from API
          console.log(response);
          $('#editPet').modal('hide');
          location.reload(); // Add this line to refresh the page
        },
        error: function(error) {
          // Handle error response from API
          console.log(error);
        }
      });
    });

    $('#deletePet').on('click','#deletePetConfirm', function (e) {
      const petId = e.target.dataset.petId;

        $.ajax({
        url: `${window.BASE_URL}/pet/${petId}`,
        method: 'DELETE',
        // when the status code is 200, reload the page
        statusCode: {
          200: function() {
            $('#deletePet').modal('hide');
            location.reload();
          }
        },
        error: function(error) {
          // Handle error response from API
          console.log(error);
        }
      });
    }

  );

  })