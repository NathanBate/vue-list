export default {
    showList: true,
    showHeading: true,
    itemsPerPage: 10,
    rowLinkable: true,
    searchBar: true,
    inertiaLinks: false,
    rowLinkTarget: "_blank",
    actionButton: {
        label: 'New',
        link: 'https://inertiajs.com'
    },
    columns: [
        {
            label: "Name",
            key: "name",
            search: true,
        },
        {
            label: "Type",
            key: "type",
            search: true,
        },
        {
            label: "Random Number",
            key: "randomNumber",
            search: true,
        }
    ]
}