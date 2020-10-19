import React, { Component } from 'react';
import Form from '../../components/Auth/Auth'
import { authMethod } from '../../store/action/authActions';
import { connect } from 'react-redux'

class Auth extends Component {
    state = {
        showPassword: false,
        isSignIn: true,
        formData: {
            email: {
                value: '',
            },
            name: {
                value: '',
            },
            password: {
                value: '',
            },
        },
        formIsvalid:false
    }

    checkData = (value) => {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        const isEmail = pattern.test(value);
        const newState = {
            ...this.state,
            formIsvalid:isEmail
        }
        this.setState(newState)
    }
    formSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.formData.name.value, this.state.formData.email.value, this.state.formData.password.value, this.state.isSignIn)
        // this.props.history.push('/');
    }
    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    switchSignMethod = () => {
        this.setState({ isSignIn: !this.state.isSignIn })
    }
    inputChangeHandler = (event, element) => {
        const updateForm = {
            ...this.state.formData,
            [element]: {
                ...this.state.formData[element],
                value: event.target.value
            }
        }
        this.checkData(event.target.value)

        this.setState({ formData: updateForm })
    }

    render() {
        this.state.isSignIn?document.title='Sign In':document.title='Sign Up'
        return <Form isSignIn={this.state.isSignIn} 
        formData={this.state.formData}
        isDisable={this.state.formIsvalid}
        inputChangeHandler={this.inputChangeHandler}
        formSubmit={this.formSubmit}
        showPassword={this.state.showPassword} 
        handleClickShowPassword={this.handleClickShowPassword}
        switchSignMethod={this.switchSignMethod}
        loading={this.props.loading}
        token={this.props.token}
        error={this.props.error}/>
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.tokenId,
        loading: state.auth.loading,
        error: state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (name, email, password, isSignup) => dispatch(authMethod(name, email, password, isSignup)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);