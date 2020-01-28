import { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import AmountInputField from "../components/AmountInputField";
import YearAndTableSelection from "../components/YearAndTableSelection";

const Benefit = () => {
  const [salary, setSalary] = useState(0);
  const [raised, setRaised] = useState(0);
  const [taxTable, setTaxTable] = useState(33);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isValid, setIsValid] = useState(false);
  const [isSalaryValid, setIsSalaryValid] = useState(false);
  const [isRaisedValid, setIsRaisedValid] = useState(false);
  const [search, setSearch] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const current = await api.fetchTaxAmount(salary, taxTable, year);
      const newTax = await api.fetchTaxAmount(raised, taxTable, year);

      setResult({
        ...newTax,
        netRaise: newTax.afterTax - current.afterTax
      });
    };

    if (salary > 0) {
      fetchResult();
    }
  }, [search]);

  useEffect(() => {
    setIsValid(isSalaryValid && isRaisedValid);
  }, [isSalaryValid, isRaisedValid]);

  return (
    <Layout title="Vid löneförhöjning">
      <YearAndTableSelection
        year={year}
        onYearChanged={e => setYear(e.target.value)}
        table={taxTable}
        onTableChanged={e => setTaxTable(e.target.value)}
      />
      <AmountInputField
        label={"Nuvarande lön"}
        value={salary}
        onValueChanged={value => setSalary(value)}
        onValidate={valid => setIsSalaryValid(valid)}  
      />
      <AmountInputField
        label={"Ny lön"}
        value={raised}
        onValueChanged={value => setRaised(value)}
        onValidate={valid => setIsRaisedValid(valid)}
      />
      <button
        className="button is-primary is-pulled-right"
        disabled={!isValid}
        onClick={() => setSearch({ salary, taxTable, year, benefit: raised })}
      >
        Beräkna
      </button>
      <div className="section">
        <p>Lön: {result ? result.salary : ""}</p>
        <p>Skatt: {result ? result.taxAmount : ""}</p>
        <p>Nettolön: {result ? result.afterTax : ""}</p>
        <p>Nettoökning: {result ? result.netRaise : ""}</p>
      </div>
    </Layout>
  );
};

export default Benefit;
