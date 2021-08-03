interface ICookieOptions {
  expires?: Date | number | string;
  path?: string;
  domain?: string;
  secure?: boolean;

  [propName: string]: any;
};

export function setCookie(
  name: string,
  value: string,
  options: ICookieOptions
) {

  if ( options.expires instanceof Date ) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent( name ) + '=' + encodeURIComponent( value );

  for ( let optionKey in options ) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];

    if ( !optionValue ) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie( name: string ) {
  setCookie( name, '', {
    'max-age': -1
  } );
}

export function getCookie( name: string ) {
  const matches = document.cookie.match(
    // eslint-disable-next-line
    new RegExp( '(?:^|; )' + name.replace( /([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1' ) + '=([^;]*)' )
  );
  return matches ? decodeURIComponent( matches[1] ) : undefined;
}
