import classNames from "classnames";
import './Pagination.css'
const range = (start, end) => {
    return [...Array(end).keys()].map((el) => el + start)
};

const PaginationItem = ({ page, currentPage, onPageChange, imageArray }) => {
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
        <div className=" border-4">
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
            <div>
                {
                    imageArray[currentPage - 1] ?
                        <img src={imageArray[currentPage - 1]} alt={`Fetched Image `} />
                        :
                        null
                }

            </div>
            {/* <p>page no. {page}</p> */}
        </div>

    )
};
export default Pagination;