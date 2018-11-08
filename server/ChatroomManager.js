const Chatroom = require('./Chatroom')
const chatroomTemplates = require('../config/chatroom')

module.exports = function() {
  const chatrooms = new Map(chatroomTemplates.map(chat => [chat.username, Chatroom(chat)]))

  function removeClient(client) {
    chatrooms.forEach(chat => {
      chat.removeUser(client)
    })
  }
  function getChatroomByName(chatroomName) {
    return chatrooms.get(chatroomName)
  }
  function serializeChatrooms() {
    return Array.from(chatrooms.values()).map(chat => chat.serialize())
  }

  return {
    removeClient,
    getChatroomByName,
    serializeChatrooms,
  }
}
