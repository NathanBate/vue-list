export default {
    showList: true,
    showHeading: true,
    itemsPerPage: 10,
    rowLinkable: true,
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
            label: "Action Button Example",
            button: true,
            key: "buttonExample",
            search: false,
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
        },

    ]
}
