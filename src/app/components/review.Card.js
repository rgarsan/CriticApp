import { Grid, Rating, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components'
import { CRITIC_PALETTE } from '../themes/themes';

const StyledReviewCard = styled.div`
    text-align: left;
    padding: 16px;
    margin: 16px 0;
    &:hover{
    box-shadow: 0 0 2px 2px ${CRITIC_PALETTE.light};
}
  .crt-review-image-container{
      height: 64px;
      overflow: hidden;

      .crt-review-image{
           width: 64px;
           height: 60px;
      }
  }
  .crt-review-rating{
    text-align: right;
    flex-grow: 1;
  }
  .crt-review-date{
      color: #dddddd;
      font-style:italic
  }
  p{
    color: #888888;
  }
`;

function ReviewCard({review}) {

    const formateDate = (date)=>{
        if(date===null) return ""
        return new Date(date).toLocaleDateString("en-US")

    }
    return (
        <StyledReviewCard> 
            <Grid container direction="column" spacing={4}>
                <Grid item container spacing={2}>
                    <Grid item className="crt-review-image-container" >
                        <img className="crt-review-image" src={review.userImage} alt="userImage"/>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" className="crt-review-date">{formateDate(review.date)}</Typography>
                    </Grid>
                  {/* <Grid item className="crt-review-rating">
                        <Rating name="reviewRating" size="medium" value={review.rating}/>
                    </Grid> */} 
                </Grid>
                <Grid item container>
                     <Typography variant="body2">{review.comment}</Typography>
                </Grid>
                {review.reply && 
                    <Grid item container spacing={2}>
                    <Grid item className="crt-review-image-container"> 
                    <img className="crt-review-image" src={review.reply.userImage} alt="userImage"/>
                    </Grid>
                    <Grid item>
                    <Typography variant="body2">{formateDate(review.reply.date)}</Typography>
                    <Typography variant="body2">{review.reply.comment}</Typography>
                    </Grid>
                </Grid>
                }
                
            </Grid>
        </StyledReviewCard>
    );
}

export default ReviewCard;