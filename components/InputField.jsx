const InputField = props => (
  <div className="field is-horizontal">
    <div className="field-label is-normal">
      <label className="label">{props.label}</label>
    </div>
    <div className="field-body">
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            value={props.value}
            onChange={e => props.onValueChanged(e)}
          />
        </div>
        <p className={`help is-danger ${props.validationMessage === '' ? 'is-hidden' : ''}`}>{props.validationMessage}</p>
      </div>
    </div>
  </div>
);

export default InputField;
