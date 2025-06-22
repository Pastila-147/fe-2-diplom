// import { useState } from 'react'
// import TrainFilters from '../components/common/TrainFilters/TrainFilters'
// import TrainCard from '../components/cards/TrainCard'
// import Pagination from '../components/common/Pagination'
// import LastTickets from '../components/info/LastTickets/LastTickets'
// import '../App.css'
//
// const TRAINS_PER_PAGE = 5
//
// export default function SearchResults() {
//     const [routes, setRoutes] = useState([])
//     const [totalRoutes, setTotalRoutes] = useState(0)
//     const [page, setPage] = useState(1)
//     const [isLoading, setIsLoading] = useState(false);
//
//     const handleRoutesChange = (items, total) => {
//         setRoutes(items)
//         setTotalRoutes(total)
//         setIsLoading(false);
//     }
//
//     const totalPages = Math.ceil(totalRoutes / TRAINS_PER_PAGE)
//
//     return (
//         <div className="search-results-page">
//             <div className="page-container">
//                 <aside className="sidebar">
//                     <TrainFilters
//                         onRoutesChange={handleRoutesChange}
//                         offset={(page - 1) * TRAINS_PER_PAGE}
//                         limit={TRAINS_PER_PAGE}
//                         setIsLoading={setIsLoading}
//                     />
//                     <LastTickets/>
//                 </aside>
//
//                 <section className="main-section">
//                     <Loading isVisible={isLoading}/>
//
//                     {!isLoading && routes.length === 0 ? (
//                         <p className="no-results">Маршруты не найдены</p>
//                     ) : (
//                         <>
//                             {routes.map((route, index) => (
//                                 <TrainCard key={route._id || index} data={route}/>
//                             ))}
//
//                             {!isLoading && (
//                                 <Pagination
//                                     currentPage={page}
//                                     totalPages={totalPages}
//                                     onPageChange={setPage}
//                                 />
//                             )}
//                         </>
//                     )}
//                 </section>
//             </div>
//         </div>
//     )
// }
import { useState } from 'react'
import TrainFilters from '../components/common/TrainFilters/TrainFilters'
import TrainCard from '../components/cards/TrainCard'
import Pagination from '../components/common/Pagination'
import LastTickets from '../components/info/LastTickets/LastTickets'
import Loading from '../components/common/Loading'
import '../App.css'

const TRAINS_PER_PAGE = 5

export default function SearchResults() {
    const [routes, setRoutes] = useState([])
    const [totalRoutes, setTotalRoutes] = useState(0)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const handleRoutesChange = (items, total) => {
        setRoutes(items)
        setTotalRoutes(total)
        setIsLoading(false)
    }

    const totalPages = Math.ceil(totalRoutes / TRAINS_PER_PAGE)

    return (
        <div className="search-results-page">
            <div className="page-container">
                <aside className="sidebar">
                    <TrainFilters
                        onRoutesChange={handleRoutesChange}
                        offset={(page - 1) * TRAINS_PER_PAGE}
                        limit={TRAINS_PER_PAGE}
                        setIsLoading={setIsLoading}
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
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </section>
            </div>
        </div>
    )
}
