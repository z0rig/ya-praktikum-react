const getId = () => `${ ( ~~( Math.random() * 1e8 ) ).toString( 16 ) }`;
export default getId;
