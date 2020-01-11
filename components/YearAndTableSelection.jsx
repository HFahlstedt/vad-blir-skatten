import { Fragment } from "react";

const YearAndTableSelection = props => {
  const tableNumbers = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
  const years = [2016, 2017, 2018, 2019, 2020];

  return (
    <Fragment>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">År</label>
        </div>
        <div className="control">
          <div className="select is-small">
            <select value={props.year} onChange={e => props.onYearChanged(e)}>
              {years.map(y => (
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
            <select value={props.table} onChange={e => props.onTableChanged(e)}>
              {tableNumbers.map(t => (
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
