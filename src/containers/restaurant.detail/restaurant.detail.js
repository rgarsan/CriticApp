import { Button, Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components'
import RestaurantCard from '../../app/components/restaurant.card';
import { apiService } from '../../app/services/apiService';
import { CriticDispachers, CriticStore } from '../../app/store/store';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ReviewCard from '../../app/components/review.Card';

const StyledRestaurantDetailContainer  = styled.div`
   button{
        margin: 16px 0;
    }
  
`;

function RestaurantDetailContainer(props) {
    const [page,setPage]= useState(0)
    const {id} = useParams()
    const {state,dispatch} = useContext(CriticStore)
    const {restaurantWithDetails,reviewsHaveMoreResults} = state
   


    useEffect(()=>{
        apiService.getRestaurant(id)
                    .then((restaurantWithDetails)=> dispatch(CriticDispachers.setRestaurant(restaurantWithDetails)))

    },[id])

    if(restaurantWithDetails===null) return (<>...</>)
    const {restaurant,bestReview,worstReview,reviews}=restaurantWithDetails

    const loadMore=()=> {
        setPage(page +1 )
        apiService.getReviews(restaurant.id,page +1)
            .then(reviews => dispatch(CriticDispachers.appendreviews(reviews)))
    }



    return (
        <StyledRestaurantDetailContainer>
            <RestaurantCard restaurant={restaurant} showReviews={false}/>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {bestReview &&
                    <>
                        <Typography variant="h4">Best Reviews<ThumbUpIcon/></Typography>
                        <ReviewCard review={bestReview}/>
                        </>
                        }
                </Grid>
                <Grid item xs={6}>
                {worstReview &&
                    <>
                        <Typography variant="h4">Worst Reviews<ThumbDownAltIcon/></Typography>
                        <ReviewCard review={worstReview}/>
                        </>
                        }
                </Grid>
            </Grid>
            {reviews && reviews.map(review => (
                <ReviewCard key={review.id} review={review}/>
            ))}
            {reviewsHaveMoreResults && 
            <Button variant="outlined" color="secondary" onClick={loadMore}>READ MORE</Button>
        }
        </StyledRestaurantDetailContainer>
    );
}

export default RestaurantDetailContainer;