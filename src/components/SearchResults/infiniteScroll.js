import React, {Component, Fragment} from "react";
import {searchReposForInfiniteScroll} from '../../actions/actions'
import {hyperLinkToObject} from "../../helpers/splitLinks";
import UglyRepoCard from "../../pagination/components/UglyRepoCard";
import {Table} from "react-bootstrap";
import '../../styles/repoCard.css'
import BeautyRepoCard from "../../pagination/components/BeautyRepoCard";

export class InfiniteScroll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            data: [],
            url: `https://api.github.com/search/repositories?q=${this.props.match.params.queryString}`
        };


        window.onscroll = () => {
            const {
                loadRepos,
                state: {
                    error,
                    isLoading,
                    hasMore,
                },
            } = this;

            if (error || isLoading || !hasMore) return;
            const d = document.documentElement;
            const offset = d.scrollTop + window.innerHeight + 1;
            const height = d.offsetHeight;

            console.log('offset = ' + offset);
            console.log('height = ' + height);

            if (offset >= height) {
                console.log('At the bottom');
                loadRepos();

            }
        };
    }

    componentWillMount() {
        this.loadRepos();
    }

    loadRepos = () => {
        this.setState({isLoading: true});
        console.log(this.state.url);
        searchReposForInfiniteScroll(this.state.url)
            .then(res => {
                const link = res.headers.get('Link')
                if (link) {
                    let linksObj = hyperLinkToObject(link);
                    const url = linksObj.next;
                    const hasMore = !!linksObj.next;
                    this.setState({
                        hasMore,
                        url
                    })
                } else {
                    this.setState({
                        hasMore: false,
                    })
                }
                res.json().then(data => {
                        console.log(data)
                        this.setState(
                            {
                                data: [...this.state.data, ...data.items],
                                isLoading: false
                            }
                        );
                    }
                )
            }).catch((err) => {
            this.setState({
                error: err.message,
                isLoading: false,
            });
        })
    };

    render() {
        const {
            error,
            hasMore,
            isLoading,
            data,
        } = this.state;

        return (
            <div className="card-deck">
                {data.map(repo => (
                    <BeautyRepoCard key={repo.id} repo={repo}/>
                ))}
            </div>
        );
    }
}

