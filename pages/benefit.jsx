import { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import AmountInputField from "../components/AmountInputField";
import YearAndTableSelection from "../components/YearAndTableSelection";

const Benefit = () => {
  const [salary, setSalary] = useState(0);
  const [benefit, setBenefit] = useState(0);
  const [taxTable, setTaxTable] = useState(33);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');
  const [benefitValidationMessage, setBenefitValidationMessage] = useState('');
  const [search, setSearch] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const withoutBenefit = await api.fetchTaxAmount(salary, taxTable, year);
      const fetchedData = await api.fetchTaxAmount(salary+benefit, taxTable, year);
      
      setResult({
        ...withoutBenefit,
        taxAmount: fetchedData.taxAmount,
        afterTax: salary - fetchedData.taxAmount,
        benefit,
        cost: fetchedData.afterTax - withoutBenefit.afterTax 
      });
    };

    if (salary > 0) {
      fetchResult();
    }
  }, [search]);

  useEffect(() => {
    const numSalary = parseInt(salary, 10);
    let salaryIsValid = false;

    if (isNaN(numSalary)) {
      salaryIsValid = false;
      setValidationMessage("Lön måste bestå av siffror");
    } else {
      salaryIsValid = numSalary > 0;
      setValidationMessage(
        numSalary <= 0 ? "Lön måste vara större än noll" : ""
      );
    }

    const numBenefit = parseInt(benefit, 10);

    if (isNaN(numBenefit)) {
      setIsValid(false);
      setBenefitValidationMessage('Förmån måste bestå av sifror');
    } else {
      setIsValid(salaryIsValid && numBenefit > 0);
      setBenefitValidationMessage(salaryIsValid && numBenefit > 0 ? '' : 'Förmån måste vara större än noll');
    }
  }, [salary, benefit]);

  return (
    <Layout title="Med förmån">
      <YearAndTableSelection
        year={year}
        onYearChanged={e => setYear(e.target.value)}
        table={taxTable}
        onTableChanged={e => setTaxTable(e.target.value)}
      />
      <AmountInputField
        label={"Lön"}
        value={salary}
        validationMessage={validationMessage}
        onValueChanged={e => setSalary(parseInt(e.target.value, 10))}
      />
      <AmountInputField
        label={"Förmån"}
        value={benefit}
        validationMessage={benefitValidationMessage}
        onValueChanged={e => setBenefit(parseInt(e.target.value, 10))}
      />
      <button
        className="button is-primary is-pulled-right"
        disabled={!isValid}
        onClick={() => setSearch({ salary, taxTable, year, benefit })}
      >
        Beräkna
      </button>
      <div className="section">
        <p>Lön: {result ? result.salary : ""}</p>
        <p>Skatt: {result ? result.taxAmount : ""}</p>
        <p>Förmån: {result ? result.benefit : ""}</p>
        <p>Nettolön: {result ? result.afterTax : ""}</p>
        <p>Kostnad för förmån: {result ? result.cost : ''}</p>
      </div>
    </Layout>
  );
};

export default Benefit;
