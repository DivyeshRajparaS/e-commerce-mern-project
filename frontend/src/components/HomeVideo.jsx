import React from 'react'
import { assets } from '../assets/assets'

function HomeVideo() {
    return (
        <>
            <video style={{ borderRadius: '0 0 40px 40px' }} loop autoPlay muted>
                <source src={assets.iPhone} />
            </video>
        </>
    )
}

export default HomeVideo;