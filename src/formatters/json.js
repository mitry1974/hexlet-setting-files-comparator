import { addFormatter } from '.';

const prefix = 'json';

const format = parcedData => JSON.stringify(parcedData);

addFormatter(prefix, format);
