import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

const dataFromAnotherDiv = [
  'Napa',
  'Peracitamol',
  'Rolak',
  'Ace',
  'Viagin',
  'Hekto',
];

function getStyles(name, selectedValues, theme) {
  return {
    fontWeight:
      selectedValues.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function App() {
  const theme = useTheme();
  const [selectedValues, setSelectedValues] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState('');

  const handleItemClick = (item) => {
    // If the item is already selected, remove it; otherwise, add it
    const updatedValues = selectedValues.includes(item)
      ? selectedValues.filter((value) => value !== item)
      : [...selectedValues, item];

    setSelectedValues(updatedValues);

    // Update the search input to reflect the selected values
    // setSearchInput(updatedValues.join(' '));
  };

  const handleDeleteChip = (item) => {
    const updatedValues = selectedValues.filter((value) => value !== item);
    setSelectedValues(updatedValues);
    // setSearchInput(updatedValues.join(' '));
  };

  return (
    <div >
      <TextField
      style={{minWidth:"400px"}}
        label="Search"
        variant="outlined"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        InputProps={{
          startAdornment: (
            <div style={{display:"flex", paddingTop: '10px'}}>
              {selectedValues.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => handleDeleteChip(item)} // Make the chip deletable
                  
                  sx={{ marginRight: 1, marginBottom: 1, cursor: 'pointer', }}
                />
              ))}
            </div>
          ),
        }}
      />
      <div style={{marginTop:"20px"}}>
        {dataFromAnotherDiv.map((item) => (
          <Chip
            key={item}
            label={item}
            onClick={() => handleItemClick(item)}
            style={getStyles(item, selectedValues, theme)}
            
            sx={{ marginRight: 1, marginBottom: 1, cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
}
