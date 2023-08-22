import React from 'react'

const ShowMore = ({maxLength, locationStatePageLimit, pageLimit, canShowMore, isLoadingData, setIsLoadingData, setPageLimit}) => {

    return (
        <div className='btn container__flex--center--row pad-m show-more-btn mar-auto'
            style={!canShowMore || isLoadingData ? { display: "none" } : { display: "flex" }}
        >
            <span
                className='cta-btn container__flex--center--row '
                onClick={() => {
                setIsLoadingData(true)
                setPageLimit(pageLimit)
                }}
            >
                Show more
            </span>
      </div>
    )
  }

export default ShowMore
