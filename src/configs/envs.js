const env = {
    DEV: 'localhost',
    PROD:'',
    PORT: '5000',
}

const { DEV, PORT } = env;
export const URL = `http://${DEV}:${PORT}`