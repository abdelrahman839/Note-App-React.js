export function reducer(prevState, action) {
    if (action.type === 'SIGNIN') {
        return {...prevState, isLogIn: prevState.isLogIn = true }

    } else if (action.type === 'SIGNOUT') {
        return {...prevState, isLogIn: prevState.isLogIn = false }
    } else if (action.type === 'GOHOME') {
        return {...prevState, routePath: prevState.routePath = 'home' };
    } else if (action.type === 'GOFAVORITE') {
        return {...prevState, routePath: prevState.routePath = 'favorite' };
    }
    return prevState;
}
