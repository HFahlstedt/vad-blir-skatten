import { useState, useEffect } from 'react';

const AmountInputField = props => {
  const [value, setValue] = useState(props.value);
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const numValue = parseInt(value, 10);
    let valid = false;

    if (isNaN(numValue)) {
      setValidationMessage(`${props.label} måste bestå av siffror.`);
    } else if (value <= 0) {
      setValidationMessage(`${props.label} måste vara större än noll.`);
    } else {
      valid = true;
      props.onValueChanged(numValue);
    }
    setIsValid(valid);
    props.onValidate(valid);
  }, [value]);

  return (
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
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </div>
          <p className={`help is-danger ${isValid ? 'is-hidden' : ''}`}>
            {validationMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AmountInputField;
