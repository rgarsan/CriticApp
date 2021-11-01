import RestaurantCard from "../../app/components/restaurant.card";
import { apiService } from "../../app/services/apiService";
import { CriticDispachers, CriticStore } from "../../app/store/store";
import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components'
import RestaurantHeader from "./restaurants.header";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

const StyledRestaurantsContainer = styled.div`
    button{
        margin: 16px 0;
    }
  
`;

function RestaurantContainer(props) {
    const [filter,setFilter]=useState({name:"",rating:0,page:0})
    const {state,dispatch} = useContext(CriticStore)
    const {restaurants,restaurantsHaveMoreResults} = state;
    const history = useHistory()

    const loadMore = ()=>{
        setFilter({...filter,page:filter.page +1})
    }
    const goToReviews = (id)=> history.push(`restaurants/`)

    useEffect( ()=> {
        apiService.getRestaurants(filter)
        .then(restaurants => {
            if(filter.page > 0)
            dispatch(CriticDispachers.appendrestaurants(restaurants))
            else
            dispatch(CriticDispachers.setRestaurants(restaurants))

        })
    }, [filter])

       
    return(
        <StyledRestaurantsContainer>
            <RestaurantHeader filter={filter} onFilterChanged={setFilter}/>
        {restaurants && restaurants.map( restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} onReviewClick={goToReviews}/>
        ))}
        {restaurantsHaveMoreResults && 
            <Button variant="outlined" color="secondary" onClick={loadMore}>READ MORE</Button>
        }
       
        </StyledRestaurantsContainer>
    )
}


export default RestaurantContainer;