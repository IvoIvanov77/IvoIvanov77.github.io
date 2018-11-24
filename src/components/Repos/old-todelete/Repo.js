import React from "react";
import {Link} from "react-router-dom";

export const Repo = ({ repo }) => {
    return (
        <li>
            <a href={repo.html_url}>
                <i className="fa fa-folder-open-o"/>
                {repo.name}
            </a>
            <Link to={'/repository/' + repo.id}>    Get Repo Tree</Link>
        </li>
    );
};