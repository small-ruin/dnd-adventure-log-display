import { handlebars } from 'hbs';
import { readFile } from 'fs';
import { join } from 'path';

readFile(join(process.cwd(), 'views/request.hbs'), (err, data) => {
    if (err) {
        throw err;
    }

    handlebars.registerPartial('script', data.toString());
});