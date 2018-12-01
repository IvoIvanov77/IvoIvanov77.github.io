import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

export class AdvancedSearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyWord: '',
            params: {
                language: '',
                user: '',
                minStars: '',
                maxStars: ''
            },
            redirect: false,
            queryString: ''

        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        const target = e.target;
        const key = target.name;
        const value = target.value;
        if(key === 'keyWord'){
            this.setState((prevState) => {
                prevState[key] = value;
                return {prevState}
            });
        }else{
            this.setState((prevState) => {
                prevState.params[key] = value;
                return {prevState}
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        // const {dispatch} = this.props;
        const queryString = this.createQueryString();
        this.setState({queryString, redirect:true});
    }

    createQueryString() {
        let queryString = '';
        const {keyWord, params} = this.state;
        if (keyWord) {
            queryString = queryString.concat(`${keyWord}`)
        }
        Object.entries(params).forEach(
            ([key, value]) => {
                if (value) {
                    switch (key) {
                        case 'minStars' :
                            queryString = queryString.concat(` stars:${value}..*`);
                            break;
                        case 'maxStars' :
                            if(queryString.endsWith('*')){
                                queryString = queryString.replace(/.$/,value)
                            }else{
                                queryString = queryString.concat(` stars:..${value}`);
                            }

                            break;
                        default:
                            queryString = queryString.concat(` ${key}:${value}`)
                    }
                }
            }
        );
        return queryString
    }


    render() {
        const {queryString, redirect} = this.state;
        if (redirect) {
            return (
                <Redirect exact to={`/repos/${queryString}`}/>
            )
        }
        return (
            <form className="form-horizontal" onSubmit={this.onSubmit}>
                <fieldset>
                    <legend>Advanced search</legend>
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="key_word">Key Word</label>
                        <div className="col-md-4">
                            <input
                                id="key_word"
                                name="keyWord"
                                type="text"
                                value={this.state.keyWord}
                                placeholder="Search for keyword in name or description"
                                className="form-control input-md"
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="owner">Owner username</label>
                        <div className="col-md-4">
                            <input
                                id="owner"
                                name="user"
                                type="text"
                                placeholder="Owner"
                                className="form-control"
                                value={this.state.params.user}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="language">Language</label>
                        <div className="col-md-4">
                            <input
                                id="language"
                                name="language"
                                type="text"
                                placeholder="Language"
                                className="form-control"
                                value={this.state.params.language}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="min_stars">Min stars</label>
                        <div className="col-md-4">
                            <input
                                id="min_stars"
                                name="minStars"
                                type="number"
                                placeholder="Stars, greater than or equal to:"
                                className="form-control"
                                value={this.state.params.minStars}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="max_stars">Max stars</label>
                        <div className="col-md-4">
                            <input
                                id="max_stars"
                                name="maxStars"
                                type="number"
                                placeholder="Stars, less than or equal to:"
                                className="form-control"
                                value={this.state.params.maxStars}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>


                    {/*<div className="form-group">*/}
                    {/*<label className="col-md-4 control-label" htmlFor="selectbasic"/>*/}
                    {/*<div className="col-md-2">*/}
                    {/*<input id="selectbasic" name="selectbasic" className="form-control"/>*/}
                    {/*</div>*/}
                    {/*</div>*/}


                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="submit"/>
                        <div className="col-md-4">
                            <button id="submit" name="submit" className="btn btn-primary">Search</button>
                        </div>
                    </div>

                </fieldset>
            </form>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         result: state.foundRepos
//     }
// }
//
// export const AdvancedSearchContainer = connect(mapStateToProps)(AdvancedSearchForm);