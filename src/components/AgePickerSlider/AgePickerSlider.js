import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import './AgePickerSlider.scss';

const AgePickerSlider = (props) => {
  const [sliderValue, setSliderValue] = useState(18);
  const [selectedAge, setSelectedAge] = useState(18);

  const handleAgePickerChange = (e, newValue) => {
    setSliderValue(newValue);
  };

  const handleSaveValue = (e, newValue) => {
    // Here we save the actual chosen value
    setSelectedAge(newValue);
  };

  return (
    <div className="age-picker">
      <div className="selected-age-display">גיל: {sliderValue}</div>
      <div className="slider-component">
        <Slider
          value={sliderValue}
          onChange={handleAgePickerChange}
          onChangeCommitted={handleSaveValue}
          min={18}
          max={29}
          track={false}
        />
      </div>
    </div>
  );
};

AgePickerSlider.propTypes = {};

export default AgePickerSlider;
