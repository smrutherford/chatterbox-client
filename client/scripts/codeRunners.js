// http://parse.sfm6.hackreactor.com/chatterbox/classes/messages

$(document).ready(function() {

  app.fetch();

  // click handler for refresh
  $('#get-new-messages').click( function() {
    console.log('clicked get-new-messages');
    $('#chats').empty();
    let data = app.fetch();
    console.log(data);
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
  $('#roomSelect').change(function() {
    console.log('this.text(): ', $(this).val());
    let roomName = $(this).val();
    app.fetch(roomName);
  })
  

  //$('body').prepend('<div><img src="https://www.americanscientist.org/sites/americanscientist.org/files/2017-105-3-152-cheng-01-large.jpg"></div>')
  
}); 