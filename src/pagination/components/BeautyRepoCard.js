import React from 'react';
import {Link} from "react-router-dom";

const BeautyRepoCard = props => {

    const {repo} = props;
    return (

        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{repo.name}</h3>
                <p className="card-description">{props.repo.description}</p>
                <div className='repo-info'>
                    <small className="text-muted">size: {repo.size / 1000}mb</small>
                    <small className="text-muted">created at: {new Date(repo.created_at).toDateString()}</small>
                    <small className="text-muted">last update: {repo.updated_at}</small>
                </div>


                <div className='repo-icons'>
                    <p><i className="fa fa-code"/>{repo.language}</p>
                    <p><i className="fa fa-star"/>{repo.stargazers_count}</p>
                    <p><i className="fa fa-eye"/>{repo.watchers_count}</p>
                    <p><i className="fa fa-code-branch"/>{repo.forks_count}</p>
                </div>


            </div>
            <div className='card-buttons'>
                <Link
                    to={`/repo/${repo.owner.login}/${repo.name}`}
                    type="button"
                    className="btn btn-primary">
                    Explore
                </Link>
                <a
                    href={repo.html_url}
                    type="button"
                    className="btn btn-secondary"
                >
                    <i className="fab fa-github"/>
                </a>
            </div>

            <div className='repo-owner'>
                <img className="card-img-top" src={repo.owner.avatar_url}
                     alt="picture"/>
                <h4 className='owner-name'>{repo.owner.login}</h4>

            </div>
        </div>


    )
};


export default BeautyRepoCard;
