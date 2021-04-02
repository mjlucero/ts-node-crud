import path from 'path';
import winston from 'winston';

const includeDate = winston.format(info => {
	return {
		...info,
		message: `${new Date().toISOString()} ${info.message}`
	};
});

const Logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			level: 'debug',
			handleExceptions: true,
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			)
		}),
		new winston.transports.File({
			level: 'info',
			handleExceptions: true,
			format: winston.format.combine(includeDate(), winston.format.simple()),
			maxsize: 5120000, //5mb
			maxFiles: 5,
			filename: path.join(__dirname, '../logs/app.log')
		})
	]
});

export default Logger;
