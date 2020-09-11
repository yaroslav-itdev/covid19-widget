import './loadEnv'; // Must be the first import
import config from "./config";
import app from './server';
import logger from './shared/logger';

// Start the server
app.listen(config.port, () => {
    logger.info('Express server started on port: ' + config.port);
});
