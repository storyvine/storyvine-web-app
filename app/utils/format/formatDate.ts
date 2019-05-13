import * as moment from 'moment';

export default (value: string) => moment(value).format('MM/DD/YYYY');
