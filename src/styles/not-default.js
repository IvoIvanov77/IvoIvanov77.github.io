export default {
    tree: {
        base: {
            listStyle: 'none',
            backgroundColor: '#3C3F41',
            margin: 0,
            padding: 10,
            color: '#eef9ff',
            fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
            fontSize: '14px',
        },
        node: {
            base: {
                position: 'relative',
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                background: '#35373c'
            },
            toggle: {
                base: {
                    position: 'relative',
                    float: 'left',
                    display: 'inline-block',
                    verticalAlign: 'center',
                    marginLeft: '-5px',
                    height: '16px',
                    width: '16px'
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-7px 0 0 -7px',
                    height: '14px'
                },
                height: 8,
                width: 8,
                arrow: {
                    fill: '#9DA5AB',
                    strokeWidth: 0
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    color: '#9DA5AB',
                    fontSize: '14px',
                    whiteSpace: 'nowrap'
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '24px',
                    verticalAlign: 'middle',
                    overflow: 'hidden'
                }
            },
            subtree: {
                listStyle: 'none',
                marginLeft: '4px',

            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};