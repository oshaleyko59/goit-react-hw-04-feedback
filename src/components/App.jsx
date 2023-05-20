import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SectionTitle } from './SectionTitle';
import { Statistics } from './Statistics';
import { FeedbackOptions } from './FeedbackOptions';

export const App = ({options}) => {
  const [stat, setStat] = useState(
    options.reduce((acc, opt) => {
      acc[opt.id] = 0;
      return acc;
    }, {})
  );

  const handleClick = ({ target: { id } }) => {
    const s = { ...stat };
    s[id] = s[id] + 1;
    setStat(s);
  };

  const getCategories = () => {
    return options.map(option => ({
      ...option,
      value: stat[option.id],
    }));
  };

  return (
    <div>
      <SectionTitle title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleClick} />
      </SectionTitle>
      <SectionTitle title="Statistics">
        <Statistics
          categories={getCategories()}
          percentFor={{ ids: ['good'], label: 'Positive feedback(%)' }}
        />
      </SectionTitle>
    </div>
  );
};

App.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};
