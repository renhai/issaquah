const env = process.env.PROFILE || process.env.NODE_ENV || 'production';
export default require(`./${env}`); // eslint-disable-line
