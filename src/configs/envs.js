const env = {
    DEV: 'localhost',
    PROD:'',
    PORT: '6000',
}

const { DEV, PORT } = env;
export const URL = `http://${DEV}:${PORT}`