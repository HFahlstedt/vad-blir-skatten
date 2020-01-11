const SalaryInput = props => (
  <div className="field is-horizontal">
    <div className="field-label is-normal">
      <label className="label">Lön</label>
    </div>
    <div className="field-body">
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            value={props.salary}
            onChange={e => props.onSalaryChanged(e)}
          />
        </div>
      </div>
    </div>
  </div>
);

export default SalaryInput;
