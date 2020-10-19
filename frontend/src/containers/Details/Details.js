import React, { Component } from 'react';
import ProjectDetails from '../../components/CardDetails/CardDetails';
import { fetchDetails } from '../../store/action/ProjectDetails'
import { connect } from 'react-redux';
import Axios from 'axios';

class Details extends Component {
    componentDidMount() {
        this.id = this.props.location.pathname.toString().slice(9)
        this.props.details(this.id, this.props.token);
    }
    getFile = () => {
        Axios.get(`http://127.0.0.1:8000/projects/file/${this.id}`, {
            responseType: 'blob',
            headers: {
                'Content-Type': 'multipart/form-data',
                
            }
        })
            .then((res) => {
                const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', this.props.project.fileName); //any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            }).catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <React.Fragment>
                <ProjectDetails
                    project={this.props.project}
                    loading={this.props.loading}
                    error={this.props.error}
                    getFile={this.getFile} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.tokenId,
        project: state.details.project,
        loading: state.details.loading,
        error: state.details.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        details: (id, token) => dispatch(fetchDetails(id, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);