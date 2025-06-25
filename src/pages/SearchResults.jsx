import {useEffect, useState} from 'react'
import TrainFilters from '../components/common/TrainFilters/TrainFilters'
import TrainCard from '../components/cards/TrainCard'
import Pagination from '../components/common/Pagination'
import LastTickets from '../components/info/LastTickets/LastTickets'
import Loading from '../components/common/Loading'
import '../App.css'
import LoadingBar from "../components/common/LoadingBar/LoadingBar";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchTrains,
    selectSearchQuery,
    setPage,
    setSort,
    setTrainsOnPage,
    TrainsSort
} from "../store/searchResultSlice";
import debounce from 'lodash.debounce';

const TRAINS_PER_PAGE = 5

export default function SearchResults() {
    const isLoading = useSelector((state) => state.loading.isLoading)
    const dispatch = useDispatch();

    const routes = useSelector(state => state.searchResult.trains.items || [])
    const totalRoutes = useSelector(state => state.searchResult.trains.total_count || 0)
    const page = useSelector(state => state.searchResult.page)

    const totalPages = Math.ceil(totalRoutes / TRAINS_PER_PAGE)

    //dispatch(setSort(TrainsSort.Date))
    //dispatch(setTrainsOnPage(20))

    const useDebouncedSearch = (query) => {
        const dispatch = useDispatch();

        useEffect(() => {
            const debounced = debounce(() => {
                dispatch(fetchTrains(query));
            }, 300);

            debounced();

            return () => debounced.cancel();
        }, [query, dispatch]);
    };

    const searchQuery = useSelector(selectSearchQuery);
    useDebouncedSearch(searchQuery);

    const onPageChange = (page) => {
        dispatch(setPage(page))
    }

    return (
        <div className="search-results-page">
            <div className="page-container">
                <aside className="sidebar">
                    <TrainFilters
                        offset={(page - 1) * TRAINS_PER_PAGE}
                        limit={TRAINS_PER_PAGE}
                    />
                    <LastTickets />
                </aside>

                <section className="main-section">
                    {!isLoading && routes.length === 0 && (
                        <p className="no-results">Маршруты не найдены</p>
                    )}

                    {!isLoading && routes.length > 0 && (
                        <>
                            {routes.map((route, index) => (
                                <TrainCard key={route._id || index} data={route} />
                            ))}

                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                            />
                        </>
                    )}
                </section>
            </div>
        </div>
    )
}
