// // import axios from 'axios'

// // const allUsers = axios.get('/api/users').then(response => {
// //   console.log('response', response)
// //   return allUsers
// // })

// module.exports = function() {
//   const clients = new Map()

//   function addClient(client) {
//     clients.set(client.id, { client })
//   }

//   function registerClient(client, user) {
//     clients.set(client.id, { client, user })
//   }

//   function removeClient(client) {
//     clients.delete(client.id)
//   }

//   function getAvailableUsers() {
//     const usersTaken = new Set(
//       Array.from(clients.values())
//         .filter(client => client.user)
//         .map(client => client.user.username)
//     )
//     return allUsers.filter(user => !usersTaken.has(user.username))
//   }

//   function isUserAvailable(username) {
//     return getAvailableUsers().some(user => user.username === username)
//   }

//   function getUserByName(userName) {
//     return allUsers.find(user => user.username === userName)
//   }

//   function getUserByClientId(clientId) {
//     return (clients.get(clientId) || {}).user
//   }

//   return {
//     addClient,
//     registerClient,
//     removeClient,
//     getAvailableUsers,
//     isUserAvailable,
//     getUserByName,
//     getUserByClientId,
//   }
// }
