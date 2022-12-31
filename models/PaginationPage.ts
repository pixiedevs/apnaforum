interface PaginationPage {
    curr: number
    last: number
    has_next: boolean
    has_prev: boolean
};

export const defaultPaginationPage = () => ({ has_next: true, has_prev: false, curr: 1, last: 2 })

export default PaginationPage
