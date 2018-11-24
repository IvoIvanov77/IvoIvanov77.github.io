import React from "react";
import {Link} from "react-router-dom";

export const RepoDirectory = ({ directory, repoId }) => {
    let contentLink;
    if(directory.type === 'blob'){
        contentLink = <Link
            to={{pathname:'/content',
                state: {
                    type:directory.type,
                    directoryPath: directory.path,
                    repoId
                }
            }}
            style={{paddingLeft:"20px"}}
        >Content</Link>
    }
    return (
        <li>
            <a href={directory.url}>
                <i className="fa fa-folder-open-o"/>
                {directory.path}
            </a>
            {contentLink}

        </li>
    );
};