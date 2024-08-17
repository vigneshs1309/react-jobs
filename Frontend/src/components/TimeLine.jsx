import React from 'react'

import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineBody,
  TimelineIcon,
  Typography
} from "@material-tailwind/react"

const TimeLine = ({ experiences }) => {
  return (
    <div className='w-[26rem] sm:w-[32rem]'>
      <Timeline>
        {experiences.map((experience, index) => (
          <TimelineItem key={index}>
            <TimelineConnector/>
            <TimelineHeader className='h-3'>
              <TimelineIcon />
              <Typography variant='h5' className='leading-none text-indigo-700'>
                {experience.job}
              </Typography>
            </TimelineHeader>
              <TimelineBody className='pb-8'>
              <Typography color='blue-gray' className='leading-none mb-3'>
                {experience.company}
              </Typography>
              <Typography as={"p"} className='font-normal text-gray-600 '>
                {experience.description}
              </Typography>
            </TimelineBody>
        </TimelineItem>
        ))
        }  
      </Timeline>
    </div>
  )
}

export default TimeLine