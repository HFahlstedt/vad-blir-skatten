import { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import InputField from "../components/InputField";
import YearAndTableSelection from "../components/YearAndTableSelection";

const Benefit = () => {
  const [salary, setSalary] = useState(0);
  const [raised, setRaised] = useState(0);
  const [taxTable, setTaxTable] = useState(33);
  const [year, setYear] = useState(new Date().getFullYear());
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

  return (
    <Layout title="Vid löneförhöjning">
      <YearAndTableSelection
        year={year}
        onYearChanged={e => setYear(e.target.value)}
        table={taxTable}
        onTableChanged={e => setTaxTable(e.target.value)}
      />
      <InputField
        label={"Nuvarande ön"}
        value={salary}
        onValueChanged={e => setSalary(parseInt(e.target.value, 10))}
      />
      <InputField
        label={"Ny lön"}
        value={raised}
        onValueChanged={e => setRaised(parseInt(e.target.value, 10))}
      />
      <button
        className="button is-primary is-pulled-right"
        onClick={() => setSearch({ salary, taxTable, year, benefit: raised })}
      >
        Beräkna
      </button>
      <div className="section">
        <p>Lön: {result ? result.salary : ""}</p>
        <p>Skatt: {result ? result.taxAmount : ""}</p>
        <p>Nettolön: {result ? result.afterTax : ""}</p>
        <p>Nettoökning: {result ? result.netRaise : ''}</p>
      </div>
    </Layout>
  );
};

export default Benefit;
