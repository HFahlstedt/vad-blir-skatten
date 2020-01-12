import { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import InputField from "../components/InputField";
import YearAndTableSelection from "../components/YearAndTableSelection";

const Benefit = () => {
  const [salary, setSalary] = useState(0);
  const [benefit, setBenefit] = useState(0);
  const [taxTable, setTaxTable] = useState(33);
  const [year, setYear] = useState(new Date().getFullYear());
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

  return (
    <Layout title="Med förmån">
      <YearAndTableSelection
        year={year}
        onYearChanged={e => setYear(e.target.value)}
        table={taxTable}
        onTableChanged={e => setTaxTable(e.target.value)}
      />
      <InputField
        label={"Lön"}
        value={salary}
        onValueChanged={e => setSalary(parseInt(e.target.value, 10))}
      />
      <InputField
        label={"Förmån"}
        value={benefit}
        onValueChanged={e => setBenefit(parseInt(e.target.value, 10))}
      />
      <button
        className="button is-primary is-pulled-right"
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
