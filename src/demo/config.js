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
        },
        {
            label: "Type",
            key: "type",
            search: true,
        },
        {
            label: "Random Number",
            link: true,
            key: "randomNumber",
            search: true,
        }
    ]
}