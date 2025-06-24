import { useState } from 'react'
import TrainFilters from '../components/common/TrainFilters/TrainFilters'
import TrainCard from '../components/cards/TrainCard'
import Pagination from '../components/common/Pagination'
import LastTickets from '../components/info/LastTickets/LastTickets'
import Loading from '../components/common/Loading'
import '../App.css'
import LoadingBar from "../components/common/LoadingBar/LoadingBar";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../store/loadingSlice";
import {setPage} from "../store/filtersSlice";

const TRAINS_PER_PAGE = 5

export default function SearchResults() {
    //const [page, setPage] = useState(1)
    const isLoading = useSelector((state) => state.loading.isLoading)
    const dispatch = useDispatch();

    const routes = useSelector(state => state.filters.trains.items || [])
    const totalRoutes = useSelector(state => state.filters.trains.total_count || 0)
    const page = useSelector(state => state.filters.page)

    const totalPages = Math.ceil(totalRoutes / TRAINS_PER_PAGE)

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

                    {isLoading && <Loading isVisible={isLoading} />}

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
