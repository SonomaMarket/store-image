import React from 'react'

import Image from '../Image'
import type { ImagesSchema } from '../ImageTypes'

export const getImagesAsJSXList = (
  images: ImagesSchema,
  isMobile: boolean,
  height: string | number,
  preload?: boolean
) => {
  return images.reduce(
    (
      imgArray: JSX.Element[],
      {
        image,
        mobileImage,
        description,
        experimentalPreventLayoutShift,
        width = '100%',
        initialDisplayDate,
        endDisplayDate,
        ...props
      },
      idx
    ) => {
      if (shouldDisplayImage(initialDisplayDate, endDisplayDate))
        imgArray.push(<Image
          key={idx}
          src={isMobile && mobileImage ? mobileImage : image}
          alt={description}
          maxHeight={height}
          width={width}
          experimentalPreventLayoutShift={experimentalPreventLayoutShift}
          preload={preload && idx === 0}
          {...props}
        />)

      return imgArray
    }, []
  )
}


function shouldDisplayImage(startDate: string | undefined, endDate: string | undefined) {
  if (!startDate && !endDate)
    return true

  if (new Date(startDate || 0) <= new Date() && new Date(endDate || "12/12/2100") >= new Date())
    return true
  return false
}
