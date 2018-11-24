export default {
    component: {
        width: '45%',
        display: 'inline-block',
        verticalAlign: 'top',
        padding: '20px',
        '@media (maxWidth: 640px)': {
            backgroundColor: 'red',
            width: '100%',
            display: 'block'
        }
    },
    viewer: {
        base: {
            fontSize: '14px',
            whiteSpace: 'pre-wrap',
            backgroundColor: '#282C34',
            border: 'solid 1px black',
            padding: '20px',
            color: '#eef9ff',
            minHeight: '250px'
        }

    }
};
