import { format } from 'date-fns';
import { Format } from 'shared/constants/date';

export const formatDate = (
  date: string | number | Date,
  formatStr: string = Format.DATE
) => {
  return date ? format(new Date(date), formatStr) : date;
};

export const getDayName = (date: number | string | Date) =>
  new Intl.DateTimeFormat('en-Us', { weekday: 'long' }).format(new Date(date));
