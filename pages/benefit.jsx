import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
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
      if (salary) {
        const res = await fetch(
          "https://us-central1-vad-blir-skatten-121416.cloudfunctions.net/vad-blir-skatten?" +
            new URLSearchParams({
              salary: salary + benefit,
              tab: taxTable,
              year: year
            })
        );

        const json = await res.json();
        console.log(json);

        setResult({ ...json, salary, afterTax: salary - json.taxAmount, benefit });
      }
    };

    fetchResult();
  }, [search]);

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
        <p>Lön: {result ? result.salary : ''}</p>
        <p>Skatt: {result ? result.taxAmount : ''}</p>
        <p>Förmån: {result ? result.benefit : ''}</p>
        <p>Nettolön: {result ? result.afterTax : ''}</p>
      </div>
    </Layout>
  );
};

export default Benefit;
