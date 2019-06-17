import React from 'react';
import './App.scss';
import socketIOClient from 'socket.io-client'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      socketServer: '192.168.1.152:5000',
      receiveMessages: ''
    }
  }

  componentDidMount() {
    let socket = socketIOClient(this.state.socketServer)
    let self = this
    socket.on('receive-message', (value) => {
      let messages = self.state.receiveMessages
      messages = messages + '\n' + value
      self.setState({
        receiveMessages: messages
      })
    })
  }

  onKeyPress = event => {
    let socket = socketIOClient(this.state.socketServer)
    if (event.key === 'Enter') {
      console.log(event.target.value)
      socket.emit('send-message', event.target.value)  
    }
  }

  render() {
    return (
      <div className="App">
        <div className='App-Container'>
          <div className='chat-box'>
            <div className='receive-messages'>
              <textarea value={this.state.receiveMessages}></textarea>
            </div>
            <div className='send-message'>
              <input onKeyPress={this.onKeyPress}></input>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
