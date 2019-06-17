import React from 'react'
import './message-item.scss'

class MessageItem extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render() {
        return (
            <React.Fragment>
                <div className='message-item'>
                    <div className={'message-item-avatar ' + this.props.value.fr }>
                        <div className='avatar-img'>
                        </div>
                    </div>
                    <div className={'message-item-content ' + this.props.value.fr}>
                        <div className='content'>
                            {this.props.value.message}
                        </div>
                        <div className='created'>
                            {this.props.value.created}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default MessageItem