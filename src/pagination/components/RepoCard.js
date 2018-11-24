import React from 'react';
import {Link} from "react-router-dom";
const RepoCard = props => {


  return (

      <tr>
          <td>{props.repo.name}</td>
          <td>{props.repo.description}</td>
          <td>{props.repo.stargazers_count}</td>
          <td>{props.repo.created_at}</td>
          <td>{props.repo.language}</td>
          {/*download https://api.github.com/repos/hadley/devtools/zipball/master*/}


          <td>
              <a href={props.repo.html_url}>
                  <i className="fa fa-folder-open-o"/>
                  open
              </a>

          </td>
          <td>
              <Link to={'/repository/' + props.repo.id}> explore</Link>
          </td>
      </tr>
    // <div className="col-sm-12 col-md-12 country-card">
    //   <div className="country-card-container border-gray rounded border mx-2 my-3 d-flex flex-row align-items-center p-0 bg-light">
    //     <div className="px-3">
    //
    //       <h3 className="country-name text-dark d-block font-weight-bold">{ props.repo.name }</h3>
    //       <p className="country-region text-secondary">{ props.repo.description }</p>
    //
    //     </div>
    //
    //   </div>
    // </div>
  )
};



export default RepoCard;
