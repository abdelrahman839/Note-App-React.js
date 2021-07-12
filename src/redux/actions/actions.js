
export function SignIn() {
    return (dispatch) => dispatch({ type: 'SIGNIN' });
}
export function SignOut() {
    return (dispatch) => dispatch({ type: 'SIGNOUT' });
}
export function goToHome(){
    return(dispatch)=>dispatch({type:'GOHOME'});
}
export function goToFavorite(){
    return(dispatch)=>dispatch({type:'GOFAVORITE'});
}