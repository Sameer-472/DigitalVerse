import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AllBlogs } from '../AllBlogs/AllBlogs';
import MyBlogs from '../MyBlogs/MyBlogs';
import {useNavigate , Link } from 'react-router-dom';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ColorTabs() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate() 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' , display: "flex" , justifyContent: "center", color: "white"}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="white">
         <Tab  label="All Blogs" {...a11yProps(0)} />   
         <Tab  label="All Blogs" {...a11yProps(1)} />   
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} style={{color: "white"}}>
          <AllBlogs/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyBlogs/>
      </TabPanel>
    </Box>
  );
}