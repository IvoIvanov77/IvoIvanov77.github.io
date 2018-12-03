import React, {Component} from "react";
import {searchReposForInfiniteScroll} from '../../actions/actions'
import {hyperLinkToObject} from "../../helpers/splitLinks";
// import UglyRepoCard from "../../pagination/components/UglyRepoCard";
// import {Table} from "react-bootstrap";
import '../../styles/repoCard.css'
import BeautyRepoCard from "../../pagination/components/BeautyRepoCard";

export class InfiniteScroll extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
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

            // console.log('offset = ' + offset);
            // console.log('height = ' + height);

            if (offset >= height) {
                console.log('At the bottom');
                loadRepos();

            }
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadRepos();
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    loadRepos = () => {
        if (this._isMounted) {
            this.setState({isLoading: true});
        }

        searchReposForInfiniteScroll(this.state.url)
            .then(res => {
                const link = res.headers.get('Link')
                if (link) {
                    const linksObj = hyperLinkToObject(link);
                    const url = linksObj.next;
                    const hasMore = !!linksObj.next;
                    if (this._isMounted) {
                        this.setState({
                            hasMore,
                            url
                        })
                    }

                } else {
                    if (this._isMounted) {
                        this.setState({
                            hasMore: false,
                        })
                    }

                }
                res.json().then(data => {
                        if (this._isMounted) {
                            this.setState(
                                {
                                    data: [...this.state.data, ...data.items],
                                    isLoading: false
                                }
                            );
                        }

                    }
                )
            }).catch((err) => {
            if (this._isMounted) {
                this.setState({
                    error: err.message,
                    isLoading: false,
                });
            }

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

