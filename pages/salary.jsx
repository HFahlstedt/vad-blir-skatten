import { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import YearAndTableSelection from "../components/YearAndTableSelection";
import InputField from "../components/InputField";

const Salary = () => {
  const [salary, setSalary] = useState(0);
  const [taxTable, setTaxTable] = useState(33);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isValid, setIsValid] = useState(true);
  const [search, setSearch] = useState({ salary, taxTable, year });
  const [result, setResult] = useState({ salary: 0, tax: 0, afterTax: 0 });

  useEffect(() => {
    const fetchResult = async () => {
      const fetchedData = await api.fetchTaxAmount(salary, taxTable, year);
      setResult(fetchedData);
    };

    if (salary > 0) {
      fetchResult();
    }
  }, [search]);

  useEffect(() => {
      const numSalary = parseInt(salary);

    if (numSalary == NaN) {
        setIsValid(false);
    } else {
        setIsValid(numSalary > 0);
    }
  }, [salary]);

  return (
    <Layout title="Endast lön">
      <YearAndTableSelection
        year={year}
        onYearChanged={e => setYear(e.target.value)}
        table={taxTable}
        onTableChanged={e => setTaxTable(e.target.value)}
      />
      <InputField
        label={"Lön"}
        value={salary}
        onValueChanged={e => setSalary(e.target.value)}
      />
      <button
        className="button is-primary is-pulled-right"
        disabled={!isValid}
        onClick={() => setSearch({ salary, taxTable, year })}
      >
        Beräkna
      </button>
      <div className="section">
        <p>Lön: {result.salary}</p>
        <p>Skatt: {result.taxAmount}</p>
        <p>Nettolön: {result.afterTax}</p>
      </div>
    </Layout>
  );
};

export default Salary;
