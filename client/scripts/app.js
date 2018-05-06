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
    let $msg = MessageNodeMaker(msg);
    $('#chats').append($msg);
  },
  fetch: function(roomName) {
    let dataObj = {
      order: '-createdAt'  
    };
    if(roomName) {
      dataObj['where'] = {"roomname": roomName};
    }
    $.ajax({
      url: this.server, 
      data: dataObj,
      success: function(data){
        app.clearMessages();
        data.results.forEach(msg => {
          app.renderMessage(msg);
        })
        app.addRoomNames(data);
      }
    })
  },
  getExistingRoomNames: function() {
    let existingRoomNames = [];
    // console.log('children: ', $('#roomSelect').children().length)
    $('#roomSelect').children().each((i, child) => {
      existingRoomNames.push(child.text);
    });
    return existingRoomNames;
  },
  addRoomNames: function(data) {
    console.log('data: ', data);
    let roomNames = [];
    data.results.forEach(chat => {
      let roomName = chat.roomname;
      // console.log(chat.roomname);
      // if (typeof roomName === 'string') {
      //   roomName = roomName.replace(/\"\'/g, '');
      // }
      if (
        roomName && 
        typeof roomName === 'string' && 
        !roomNames.includes(roomName)
      ) {
        roomNames.push(roomName);
      }
    });
    console.log('roomNames: ', roomNames);
    let existingRoomNames = this.getExistingRoomNames();
    roomNames.forEach(roomName => {
      if (!existingRoomNames.includes(roomName)) {
        this.renderRoom(roomName);
      }
    });
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  renderRoom: function(roomName){
    $('#roomSelect').append(`<option class='room'>${roomName}</option>`);
  },
  highlightFriends: function(chats){
    chats.each((i, chat) => {
      let username = $(chat).data('chatObj').username;
      console.log('username: ', username);
      console.log('friendsList: ', friendsList);
      if(friendsList.includes(username)) {
        console.log('found a friend');
        $(chat).addClass('friend');
      }
    });
  }

};

const MessageNodeMaker = function(chat) {
  let $chat = $('<div class="chat"></div>');
  let $user = $('<span class="username"></span>');
  let $text = $('<span class="text"></span>'); 

  $user.text(DOMPurify.sanitize(chat.username));
  $text.text(DOMPurify.sanitize(chat.text));        
  $user.appendTo($chat);
  $text.appendTo($chat);
  $chat.data('chatObj', chat);
  return $chat;
} 

const friendsList = [];