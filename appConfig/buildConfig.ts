declare const __STAGE__: string;
declare const __VERSION__: string;
declare const __BUILD__: string;
declare const __IS_NODE_PRODUCTION__: string;

const builConfig = {
    STAGE: __STAGE__,
    VERSION: __VERSION__,
    BUILD: __BUILD__,
    IS_NODE_PRODUCTION: __IS_NODE_PRODUCTION__
}

export default builConfig