const env = {
    DEV: 'localhost',
    PROD:'',
    PORT: '5500',
}

const { DEV, PORT } = env;
export const URL = `http://${DEV}:${PORT}`