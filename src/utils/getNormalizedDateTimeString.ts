const MS_IN_DAY = 60 * 60 * 24 * 1000;

const DAYS_MAP: ReadonlyArray<string> = ['сегодня', 'вчера'];

const getNormalizedDateTimeString = ( dateTimeISOstring: string ) => {
  const date = new Date( dateTimeISOstring );

  const time = new Intl.DateTimeFormat( 'ru-ru',
    {
      timeZoneName: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }
  )
  .format( date )
  .replace( 'GMT', 'i-GMT' );

  const dayDifference = Math.trunc( ( +new Date() - +date ) / MS_IN_DAY );

  if ( dayDifference <= 1 && dayDifference >= 0 ) {
    return `${ DAYS_MAP[dayDifference] }, ${ time }`;
  }

  return `${
    dayDifference
  } ${
    declOfNum( dayDifference, ['день', 'дня', 'дней'] )
  } назад, ${
    time
  }`;
};

function declOfNum( number: number, titles: Array<string> ) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[ ( number%100>4 && number%100<20 )? 2 : cases[( number%10<5 )?number%10:5] ];
}

export default getNormalizedDateTimeString;
