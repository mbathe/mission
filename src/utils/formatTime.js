import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
}

export function fDateTime(date) {   
  return format(new Date(date), 'dd MMM yyyy HH:mm', { locale: fr });
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p', { locale: fr });
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}
