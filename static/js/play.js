$(document).ready(function() {
  const socket = io.connect(location.href.slice(0, location.href.search('play') + 4))
  const gameCode = location.href.slice(1-5)
  var playerID = null

  socket.emit('joinRoom', gameCode)

  socket.on('playerID', function(ID) {
    playerID = ID
  })

  socket.on('updatePlayers', function(players) {
    $('.players').html(players)
    console.log('Updating Players')
  })

  $('.startGame').click(function() {
    socket.emit('startGame', gameCode)
  })

  socket.on('startGame', function(players, location) {
    var content
    if (players[playerID] == 'Spy') {
      content = '<h1>You are the spy</h1>'
    } else {
      content = '<h1>'+location+'</h1><h3>'+players[playerID]+'</h3>'
    }
    $('body').html(content)
  })
})
