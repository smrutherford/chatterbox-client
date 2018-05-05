var app = {
  init: function(){},
  server: "http://parse.sfm6.hackreactor.com/chatterbox/classes/messages",
  send: function (message) {


    $.ajax({
      type: "POST",
      url: this.server,
      data: JSON.stringify(message), 
      contentType: "application/json"
    })
  }, 
  renderMessage: function(msg) {
    let $msg = MessageNodeMaker(msg.username, msg.text, msg.roomName);
    $('#chats').append($msg);
  },
  fetch: function() {
    $.ajax({
      url: this.server, 
      data: {order: '-createdAt'},
      success: function(data){
        data.results.forEach(msg => {
          app.renderMessage(msg);
        })
      }
    })
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  renderRoom: function(){}

};

const MessageNodeMaker = function(username, text, roomName) {
  let $msg = $('<div class="msg"></div>');
  let $user = $('<span class="user"></span>');
  let $text = $('<span class="text"></span>'); 

  $user.text(JSON.stringify(username));
  $text.text(JSON.stringify(text));        
  $user.appendTo($msg);
  $text.appendTo($msg);
  return $msg;
}