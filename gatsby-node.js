exports.onCreatePage = ({page, actions}) => {
    const {createPage} = actions;

    if (page.path.match(/404/)) {
        createPage(page);
    }
}
