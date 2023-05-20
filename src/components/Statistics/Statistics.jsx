import PropTypes from 'prop-types';
import css from './Statistics.module.css';
import { Notification } from 'components/Notification';

export const Statistics = ({ categories, percentFor }) => {
  const totals = categories.reduce((acc, cat) => {
    acc[0] = cat.value + acc[0];
    if (percentFor.ids.includes(cat.id)) acc[1] = cat.value + acc[1];
    return acc;
  }, [0, 0]);

  const percent = Math.round(totals[1]*100/totals[0]);

  return totals[0] === 0 ? (
    <Notification message="There is no feedback" />
  ) : (
    <ul className={css.container}>
      {categories.map(({ id, label, value }) => (
        <li key={id}>
          {label}: {value}
        </li>
      ))}
      <li key="total">Total: {totals[0]}</li>
      <li key="percent">{percentFor.label}: {percent}</li>
    </ul>
  );
};

Statistics.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  percentFor: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string.isRequired),
    label: PropTypes.string.isRequired,
  }),
};
