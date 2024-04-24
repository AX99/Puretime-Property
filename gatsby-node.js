exports.onCreatePage = ({ page, actions }) => {
    if (page.path.match(/404/)) {
      return;
    }
  
    // ...
  };