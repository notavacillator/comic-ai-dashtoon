import classNames from "classnames";
import img from '../assets/filler-image.jpg'; 
import './Pagination.css'
const range = (start, end) => {
    return [...Array(end).keys()].map((el) => el + start)
};

const PaginationItem = ({ page, currentPage, onPageChange }) => {
    const liClasses = classNames({
        'page-item': true,
        active: page === currentPage
    })


    return (
        <li className={liClasses} onClick={() => onPageChange(page)}>
            <span className="page-link">{page}</span>
        </li>
    )
}


const Pagination = ({ currentPage, total, limit, onPageChange, imageArray }) => {
    const pagesCount = Math.ceil(total / limit);
    const pages = range(1, pagesCount);
    return (
        <div className=" border-4 border-blue-900 flex flex-col justify-center items-center">
            <div className="border-4 border-green-400 rounded-md">
                {
                    imageArray[currentPage - 1]  ? 
                        (
                            <img src={imageArray[currentPage - 1]} alt={`Fetched  `} />

                        ) :
                        (
                            <img src={img} alt={`filler `} className="object-cover h-[32rem] w-[32rem]" />

                        )
                }

            </div>
            <ul className="pagination">
                {pages.map(page => (
                    <PaginationItem
                        page={page}
                        key={page}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                    />
                ))}
            </ul>
            {/* <p>page no. {page}</p> */}
        </div>

    )
};
export default Pagination;