export class Room {
  constructor(name, io) {
    this.name = name;
    this.socket = io.of('/'+name);

    this.bindSocketEvents();
  }

  bindSocketEvents() {
    this.socket.on('connection', socket => {
      console.log(socket.id, 'joined');
    });
  }

}
