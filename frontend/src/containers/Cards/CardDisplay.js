import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/UI/Error/Error';
import Cards from '../../components/Cards/Cards';
import { fetchProjects } from '../../store/action/projects';

import Spinner from '../../components/UI/Spinner/Spinner'
class CardContainer extends Component {
    componentDidMount() {
        document.title = 'File Sharing'
        this.props.fetchData()
    }

    showMoreHandler = (id) => {
        this.props.history.push(`/details/${id}`);
    }
    render() {
        let data = null;
        if (this.props.loading) {
            data = <Spinner />
        }
        let error = null;
        if (this.props.error) {
            console.log(this.props.error);
            error = <Error closeModal>{this.props.error}</Error>
        }
        return (
            <React.Fragment>
                {error}
                {data}
                <Cards data={this.props.project} more={this.showMoreHandler} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.tokenId,
        project: state.pro.projects,
        loading: state.pro.loading,
        error: state.pro.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(fetchProjects()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);