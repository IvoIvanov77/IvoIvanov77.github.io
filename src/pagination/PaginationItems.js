import React, {Component} from 'react';
import '../styles/pagination.css';

import Pagination from './components/Pagination';
import RepoCard from './components/RepoCard';

class PaginationItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCountries: [],
            currentCountries: [],
            currentPage: null,
            pageLimit: 10
        }
    }

    componentDidMount(){
        this.setState({allCountries: this.props.data})
    }


    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            const allCountries = this.props.data;
            const {currentPage,  pageLimit} = this.state;
            const offset = (currentPage - 1) * pageLimit;
            const currentCountries = allCountries.slice(offset, offset + pageLimit);
            this.setState({allCountries, currentPage, currentCountries});

        }
    }

    onPageChanged = data => {
        const {allCountries} = this.state;
        const {currentPage,  pageLimit} = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentCountries = allCountries.slice(offset, offset + pageLimit);

        this.setState({currentPage, currentCountries});
    };

    render() {
        const {allCountries, currentCountries, currentPage, pageLimit} = this.state;
        const totalCountries = allCountries.length;
        const totalPages = Math.ceil(totalCountries / pageLimit);

        if (totalCountries === 0) return <div>{'No repos'}</div>;

        const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

        return (
            <div className="container mb-5">
                <div className="row d-flex flex-row py-5">

                    <div
                        className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-center">

                            <h2 className={headerClass}>
                                <strong className="text-secondary">{totalCountries}</strong> Countries
                            </h2>

                            {currentPage && (
                                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{currentPage}</span> / <span
                                    className="font-weight-bold">{totalPages}</span>
                </span>
                            )}

                        </div>

                        <div className="d-flex flex-row py-4 align-items-center">
                            <Pagination totalRecords={totalCountries} pageLimit={pageLimit} pageNeighbours={1}
                                        onPageChanged={this.onPageChanged}/>
                        </div>
                    </div>
                    <div className="col-md-12">

                        <div className="table-responsive">
                            <table id="mytable" className="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Stars</th>
                                    <th>Creation time</th>
                                    <th>Language</th>
                                    <th>Open in Github</th>
                                    <th>Explore</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentCountries.map(repo => <RepoCard key={repo.id} repo={repo}/>)}
                                </tbody>

                            </table>

                        </div>

                    </div>


                </div>
            </div>
        );
    }

}

export default PaginationItems;
