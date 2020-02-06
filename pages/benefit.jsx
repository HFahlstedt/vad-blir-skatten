import { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import AmountInputField from "../components/AmountInputField";
import YearAndTableSelection from "../components/YearAndTableSelection";
import Result from "../components/Result";

const Benefit = () => {
  const [salary, setSalary] = useState(0);
  const [benefit, setBenefit] = useState(0);
  const [taxTable, setTaxTable] = useState(33);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isValid, setIsValid] = useState(false);
  const [isSalaryValid, setIsSalaryValid] = useState(false);
  const [isBenefitValid, setIsBenefitValid] = useState(false);
  const [search, setSearch] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const withoutBenefit = await api.fetchTaxAmount(salary, taxTable, year);
      const fetchedData = await api.fetchTaxAmount(salary+benefit, taxTable, year);
      
      let key = 0;
      const rows = [];

      rows.push({ key: key++, label: 'Lön', amount: withoutBenefit.salary});
      rows.push({ key: key++, label: 'Skatt', amount: fetchedData.taxAmount, istax: true });
      rows.push({ key: key++, label: 'Förmån', amount: benefit });
      rows.push({ key: key++, label: 'Nettolön', amount: salary - fetchedData.taxAmount, isSum: true });
      rows.push({ key: key++, label: 'Nettokostnad förmån', amount: fetchedData.afterTax - withoutBenefit.afterTax });

      setResult(rows);
    };

    if (salary > 0) {
      fetchResult();
    }
  }, [search]);

  useEffect(() => {
    setIsValid(isSalaryValid && isBenefitValid);
  }, [isSalaryValid, isBenefitValid]);

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
        onValueChanged={value => setSalary(value)}
        onValidate={valid => setIsSalaryValid(valid)}
      />
      <AmountInputField
        label={"Förmån"}
        value={benefit}
        onValueChanged={value => setBenefit(value)}
        onValidate={valid => setIsBenefitValid(valid)}
      />
      <button
        className="button is-primary is-pulled-right"
        disabled={!isValid}
        onClick={() => setSearch({ salary, taxTable, year, benefit })}
      >
        Beräkna
      </button>
      <Result resultRows={result}/>
    </Layout>
  );
};

export default Benefit;
