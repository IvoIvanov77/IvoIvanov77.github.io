export function arrangeIntoTree(directories) {
    const tree = [];

    directories.forEach(dir => {

        const pathParts = dir.path.split('/');
        let currentLevel = tree; // initialize currentLevel to root

        pathParts.forEach(part =>  {
            // check to see if the path already exists.
            const existingPath = currentLevel.find(d => d.name === part);

            if (existingPath) {
                // The path to this item was already in the tree, so don't add it again.
                // Set the current level to this path's children
                currentLevel = existingPath.children;
            } else {
                const newParams = {
                    name:part,
                    children:[]
                };

                const extendedDirectoryObject = Object.assign({}, dir, newParams);

                currentLevel.push(extendedDirectoryObject);
                currentLevel = extendedDirectoryObject.children;
            }
        });
    });

    return removeEmpty(tree);
}


const removeEmpty = (arr) => {
    arr.forEach(obj => {
        if (obj.children.length > 0 ) {
            removeEmpty(obj.children);
        }
        else {
            delete obj.children;
        }

    })
    return arr;
};


