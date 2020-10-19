import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateProject from '../../components/CreateProject/CreateProject';
import {newProject} from '../../store/action/newProject'

class NewProject extends Component {
    state = {
        isSignIn: true,
        formData: {
            desc: {
                value: '',
            },
            name: {
                value: '',
            },
            file: null
        },
    }
    componentDidMount() {
        document.title = 'New Project'
    }
    formSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('title', this.state.formData.name.value)
        data.append('desc', this.state.formData.desc.value)
        data.append('Zip_file', this.state.formData.file)
        this.props.createNewProject(data ,this.props.token)
    }
    inputChangeHandler = (event, element) => {
        const updateForm = {
            ...this.state.formData,
            [element]: {
                ...this.state.formData[element],
                value: event.target.value
            }
        }
        this.setState({ formData: updateForm })
    }
    onFileChange = event => {
        const newState = {
            ...this.state.formData,
            file: event.target.files[0]
        }
        this.setState({ formData: newState });

    };
    render() {
        return <CreateProject
            onSubmit={this.formSubmit}
            formData={this.state.formData}
            inputChangeHandler={this.inputChangeHandler}
            onFileChange={this.onFileChange}
            error={this.props.error}
            loading={this.props.loading}
            redirect={this.props.data} />
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.tokenId,
        error:state.new.error,
        loading:state.new.loading,
        data:state.new.data
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        createNewProject:(data,token)=>dispatch(newProject(data,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewProject);