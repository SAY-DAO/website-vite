export function dateConvertor(string) {
  const d = new Date(string);
  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    dateStyle: 'full',
  }).format(d);
}

export function dateTimeConvertor(string) {
  const d = new Date(string);
  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Iran',
  }).format(d);
}

export function persianMonthString(date) {
  if (!date) {
    return null;
  }
  return new Intl.DateTimeFormat('en-US-u-ca-persian', {
    month: 'short',
  }).format(date);
}

export function persianDay(value) {
  return parseInt(
    new Intl.DateTimeFormat('en-US-u-ca-persian', { day: 'numeric' }).format(
      value,
    ),
    10,
  );
}

export function persianMonth(value) {
  return parseInt(
    new Intl.DateTimeFormat('en-US-u-ca-persian', { month: 'numeric' }).format(
      value,
    ),
    10,
  );
}

export function persianYear(value) {
  if (!value) {
    return null;
  }
  return parseInt(
    new Intl.DateTimeFormat('en-US-u-ca-persian', { year: 'numeric' }).format(
      value,
    ),
    10,
  );
}
