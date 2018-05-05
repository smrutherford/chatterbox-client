// http://parse.sfm6.hackreactor.com/chatterbox/classes/messages

$(document).ready(function() {

  app.fetch();

  // click handler for refresh
  $('#get-new-messages').click( function() {
    console.log('clicked get-new-messages');
    $('#chats').empty();
    app.fetch();
  })


  // click handler for send new message
  $('#send-new-message').click(function() {
    let msgText = $('#new-message').val();
    let username = location.search.slice(10);

    let msgObj = {
      'roomname': 'Main Room',
      'text': msgText,
      'username': username
    }
    app.send(msgObj);
  });

  // click handler for select a room
  $('#roomSelect').on('click', function() {
    $('#myDropdown').toggle();
  });

  //$('body').prepend('<div><img src="https://www.americanscientist.org/sites/americanscientist.org/files/2017-105-3-152-cheng-01-large.jpg"></div>')
  
});