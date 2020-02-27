import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const useTableAndYear = () => {
  const { year, table, availableYears, availableTables } = useSelector(
    state => ({
      availableYears: state.availableYears,
      availableTables: state.availableTables,
      year: state.year,
      table: state.table,
    })
  );
  const dispatch = useDispatch();

  const setYear = year => dispatch({ type: 'SET_YEAR', payload: year });
  const setTable = table => dispatch({ type: 'SET_TABLE', payload: table });

  return { availableYears, availableTables, year, table, setYear, setTable };
};

const YearAndTableSelection = props => {
  const {
    availableYears,
    availableTables,
    year,
    table,
    setYear,
    setTable,
  } = useTableAndYear();

  return (
    <Fragment>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">År</label>
        </div>
        <div className="control">
          <div className="select is-small">
            <select value={year} onChange={e => setYear(e.target.value)}>
              {availableYears.map(y => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Skattetabell</label>
        </div>
        <div className="control">
          <div className="select is-small">
            <select value={table} onChange={e => setTable(e.target.value)}>
              {availableTables.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default YearAndTableSelection;
