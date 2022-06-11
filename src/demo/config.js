export default {
    showList: true,
    itemsPerPage: 10,
    rowLinkable: true,
    actionButton: {
        label: 'New',
        link: 'https://inertiajs.com'
    },
    columns: [
        {
            label: "Name",
            link: true,
            key: "name",
            search: true,
            width: '50%',
        },
        {
            label: "Type",
            key: "type",
            width: '15rem',
            search: true,
        },
        {
            label: "Random Number",
            link: true,
            key: "randomNumber",
            search: true
        }
    ]
}