import { AddBusiness, AddHomeWork, AddLocationAlt, AddTask, Bed, LocationOn } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { useValue } from '../context/ContextProvider'
import AddProject from './addProject/AddProject'
import AddRoom from './addRoom/AddRoom'
import ClusterMap from './map/ClusterMap'
import Protected from './protected/Protected'
import Rooms from './rooms/Rooms'

const BottomNav = () => {
    const {state:{section}, dispatch}=useValue()
    const ref = useRef()
    useEffect(()=>{
        ref.current.ownerDocument.body.scrollTop = 0;
    }, [section])
  return (
    <Box ref={ref}>
            {{
                0: <ClusterMap />,
                1: <Rooms />,
                2: (
                    <Protected>
                        <AddRoom />
                    </Protected>
                ),
                3: (
                    
                        <AddProject />
                    
                ),   
            }[section]}
        <Paper
        elevation={3}
        sx={{position:'fixed', bottom:0, left:0, right:0, zIndex:2}}
        >
            <BottomNavigation
            showLabels
            value={section}
            onChange={(e, newValue)=>dispatch({type:'UPDATE_SECTION',payload:newValue})}
            >
                <BottomNavigationAction label='Map' icon={<LocationOn />} />
                <BottomNavigationAction label='Rooms' icon={<Bed />} />
                <BottomNavigationAction label='Add' icon={<AddLocationAlt />} />
                <BottomNavigationAction label='Add' icon={<AddTask />} />
            </BottomNavigation>
        </Paper>
    </Box>
  )
}

export default BottomNav