import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { getUserByUID } from './ducks/userReducer'
import { connect } from 'react-redux'

class User extends Component {
  constructor() {
    super()

    this.state = {
      userFetched: false,
    }
  }

  componentDidMount() {
    this.props.getUserByUID().then(() => {
      this.setState({ userFetched: true })
    })
  }

  render() {
    return this.state.userFetched && <div>{this.props.children}</div>
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserByUID }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
