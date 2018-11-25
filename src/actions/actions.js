import Fetcher from "../helpers/fetcher";
import {hyperLinkToObject} from "../helpers/splitLinks";

const GITHUB_API_URL = 'https://api.github.com';

function startAjaxCall() {return {type: 'START_AJAX_CALL', ajaxCalls:0}}
function gotReposByOwner(data) {return {type: 'GOT_USER_REPOS', data}}
function gotReposBySearchCriteria(data) {return {type: 'GOT_FOUND_REPOS', data}}
function gotSingleRepo(data) {return {type: 'GOT_SINGLE_REPO', data}}
function gotTree(data) {return {type: 'GOT_TREE', data}}
function gotContent(data) {return {type: 'GOT_CONTENT', data}}
function successAjaxCall() {return {type: 'SUCCESS_AJAX_CALL'}}
function handleError(errorMessage) {return {type: 'FAIL_AJAX_CALL', errorMessage}}

export {
    getRepoByOwnerAndRepoName, getRepoTreeById, getFileContent,
    getReposWithLinks, getRepoTreeByOwnerAndRepoName, searchRepos
}

const fetcher = new Fetcher(GITHUB_API_URL);

function getData(url, dataAction, init, contentType) {
    return dispatch => {
        dispatch(startAjaxCall());
        fetcher.get(url, init, contentType)
            .then(
                data => {
                    if(data.message){
                        dispatch(handleError(data.message))
                    }else{
                        dispatch(dataAction(data));
                        dispatch(successAjaxCall())

                    }
                },
                error => {
                    dispatch(handleError(error.message))
                }
            );
    };
}

// function getRepos(owner) {
//     const init = {
//         mode: "cors"
//     };
//
//     const url = `users/${owner}/repos`;
//     return getData(url, gotReposByOwner, init);
// }

function getReposWithLinks(owner) {
    return dispatch => {
        dispatch(startAjaxCall());
        getAllRepos(owner).then(data => {
            dispatch(gotReposByOwner(data));
            dispatch(successAjaxCall())
        });
    };
}

async function getAllRepos(owner) {
    let fetcher = new Fetcher('');
    const init = {
        mode: "cors"
    };
    let url = `https://api.github.com/users/${owner}/repos?per_page=100`;
    let hasNext = true;
    let allRepos = [];
    while (hasNext) {
        let response = await fetcher.get(url, init, 'json', true);
        let links = response.headers.get('Link');
        if(links){
            let linksObj = hyperLinkToObject(links);
            url = linksObj.next;
            hasNext = !!linksObj.next;
        }else{
            hasNext = false;
        }
        let data =  await response.json();
        allRepos = allRepos.concat(data);

    }
    return allRepos;
}


function getRepoTreeById(repoId) {
    const url = `repositories/${repoId}/git/trees/master?recursive=1`;
    return getData(url, gotTree);
}

function getRepoTreeByOwnerAndRepoName(owner, repoName) {
    const url = `repos/${owner}/${repoName}/git/trees/master?recursive=1`;
    return getData(url, gotTree);
}

function getRepoByOwnerAndRepoName(owner, repoName) {
    const url = `repos/${owner}/${repoName}`;
    return getData(url, gotSingleRepo);
}

function getFileContent(repoId, path) {
    const url = `repositories/${repoId}/contents/${path}`;
    const init = {
        headers:{
            Accept:'application/vnd.github.VERSION.raw'
        }
    };
    return getData(url, gotContent, init, 'text');
}

function searchRepos(queryString) {
    const url = `search/repositories?q=${queryString}&per_page=100`;
    return getData(url, gotReposBySearchCriteria);
}

// https://api.github.com/search/code?q=addClass+in:file+language:js+repo:jquery/jquery