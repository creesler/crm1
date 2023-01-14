import { 
    FormControl, 
    FormControlLabel, 
    InputAdornment, 
    InputLabel, 
    MenuItem, 
    Radio, 
    RadioGroup, 
    Select, 
    Stack, 
    TextField, 
} from '@mui/material';
import React, { useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import InfoField from './InfoField';

const AddDetails = () => {
    const {
        state:{
            details:{
                // title, 
                task, 
                description, 
                price, 
                client, 
                employee, 
                status, 
                deadline}, filteredUsers 
        }, 
        dispatch,
    } = useValue();
    const [costType, setCostType] = useState(price ? 1 : 0);
    const handleCostTypeChange = (e) => {
        const costType = Number(e.target.value);
        setCostType(costType);
        if (costType === 0) {
      dispatch({ type: 'UPDATE_DETAILS', payload: { price: 0 } });
    } else {
      dispatch({ type: 'UPDATE_DETAILS', payload: { price: 15 } });
        }
    }
    const handlePriceChange = (e)=>{
        dispatch({type:'UPDATE_DETAILS', payload:{price:e.target.value}})
    }

    const handleSelectClient = (e)=>{

        dispatch({type:'UPDATE_DETAILS', payload:{client:e.target.value}})
    }

    const handleSelectEmployee = (e)=>{

        dispatch({type:'UPDATE_DETAILS', payload:{employee:e.target.value}})
    }

    const handleSelectStatus = (e)=>{

        dispatch({type:'UPDATE_DETAILS', payload:{status:e.target.value}})
    }

    const handleSelectDeadline = (e)=>{

        dispatch({type:'UPDATE_DETAILS', payload:{deadline:e.target.value}})
    }
   

  return (
    <Stack
    sx={{
        alignItems: 'center',
        '& .MuiTextField-root': { width: '100%', maxWidth: 500, m: 1 },
    }}
    >
        <FormControl>
            <RadioGroup
            name="costType"
            value={costType}
            row
            onChange={handleCostTypeChange}
            >
                {/* <FormControlLabel value={0} control={<Radio />} label="Free Stay"/>
                <FormControlLabel value={1} control={<Radio />} label="Nominal Fee"/> */}
                {Boolean(costType) && (
                    <TextField
              sx={{ width: '7ch !important' }}
              variant="standard"
                    InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
                    }}
              inputProps={{ type: 'number', min: 1, max: 50 }}
                    value={price}
                    onChange={handlePriceChange}
              name="price"
                    />
                )}
            </RadioGroup>
        </FormControl>
        <InfoField 
        mainProps={{name:'task', label:'Task', value:task}}
        mainLength={5}
        />
        <InfoField 
        mainProps={{name:'description', label:'Description', value:description}}
        mainLength={10}
        optionalProps={{multiline:true, rows:4}}
        />

        <InputLabel>Deadline</InputLabel>
        <input type="date" onChange={handleSelectDeadline}
            style={{border:10, borderRadius:3,fontSize:20}}
        />
        <br></br>


        <InputLabel>Select Client</InputLabel>
        <Select value={client} onChange={handleSelectClient} sx={{width:300}}>
            
          {filteredUsers.filter(({role}) => role === 'basic').sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 :0).map(({name}, index) => (
            
            <MenuItem key={index} value={name} >
              {name}
            </MenuItem>
          ))}
        </Select>



        <InputLabel>Assign VA</InputLabel>
        <Select value={employee} onChange={handleSelectEmployee} sx={{width:300}}>
            
          {filteredUsers.filter(({role}) => role === 'editor').sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 :0).map(({name}, index) => (
            
            <MenuItem key={index} value={name} >
              {name}
            </MenuItem>
          ))}
        </Select>


        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={handleSelectStatus} sx={{width:300}}>
            <MenuItem value={'assigned'}>Assigned</MenuItem>
            <MenuItem value={'ongoing'}>On-going</MenuItem>
            <MenuItem value={'done'}>Done</MenuItem>
        </Select>
        
        
       
    </Stack>
  );
};

export default AddDetails