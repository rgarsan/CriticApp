
const {createContext, useReducer } = require("react")

/*CONST */

const RESTAURANT_PER_PAGE = 5
const RESVIEWS_PER_PAGE = 5

/*INITIAL STATE */
const initialState = {
    googleUser:null,
    appUser:null,
    restaurans:[],
    restaurantsHaveMoreResults:false,
    restaurantWithDetails:null,
    reviewsHaveMoreResults:false,
}

/*STORE CONTEXT */


const CriticStore = createContext(initialState)

const {Provider} = CriticStore;

/*ACTIONS */
const ACTIONS = {
    LOGIN:"login",
    LOGOUT:"logout",
    SET_APPUSER:"setappuser",
    SET_RESTAURANS:"restaurants",
    APPEND_RESTAURANTS:"appendrestaurants",
    SET_RESTAURANT:"setrestaurant",
    APPEND_RESVIEWS:"appendreviews",


}

/*DISPACHERS */

const CriticDispachers = {
    login:(googleUser)=>({type:ACTIONS.LOGIN, payload:googleUser}),
    logout:()=>({type:ACTIONS.LOGOUT}),
    setAppUser:(appUser)=>({type:ACTIONS.SET_APPUSER, payload:appUser}),
    setRestaurants:(restaurants)=>({type:ACTIONS.SET_RESTAURANS, payload:restaurants}),
    appendrestaurants:(restaurants)=>({type:ACTIONS.APPEND_RESTAURANTS, payload:restaurants}),
    setRestaurant:(restaurantWithDetails)=>({type:ACTIONS.SET_RESTAURANT, payload:restaurantWithDetails}),
    appendreviews:(reviews)=>({type:ACTIONS.APPEND_RESVIEWS, payload:reviews}),


}

function CriticReducers(state,action){
    switch(action.type){
        case ACTIONS.LOGIN:return{...state,googleUser:action.payload}
        case ACTIONS.LOGOUT:return{...state,googleUser:null,appUser:null}
        case ACTIONS.SET_APPUSER:return{...state,appUser:action.payload}
        case ACTIONS.SET_RESTAURANS:return{...state,restaurants:action.payload,restaurantsHaveMoreResults:action.payload.length >= RESTAURANT_PER_PAGE}
        case ACTIONS.APPEND_RESTAURANTS:return{...state,restaurants:[...state.restaurants,...action.payload],restaurantsHaveMoreResults:action.payload.length >= RESTAURANT_PER_PAGE}
        case ACTIONS.SET_RESTAURANT:return{...state,restaurantWithDetails:action.payload, reviewsHaveMoreResults:action.payload.reviews.length >= RESVIEWS_PER_PAGE}
        case ACTIONS.APPEND_RESVIEWS:return{...state,
                                                restaurantWithDetails:{...state.restaurantWithDetails,
                                                                        reviews:[...state.restaurantWithDetails.reviews,...action.payload]},
                                                reviewsHaveMoreResults:action.payload.length >= RESVIEWS_PER_PAGE
    }
        default: throw Error("Unknown action")
    }

}

function CriticStoreProvider({children}){
    const [state, dispatch] = useReducer(CriticReducers, initialState);

    return( <Provider value={{state,dispatch}}>{children}</Provider> )
}

export { CriticStore,CriticStoreProvider,CriticDispachers }