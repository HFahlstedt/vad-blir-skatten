import { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import YearAndTableSelection from "../components/YearAndTableSelection";
import AmountInputField from "../components/AmountInputField";
import Result from "../components/Result";

const Salary = () => {
  const [salary, setSalary] = useState(0);
  const [taxTable, setTaxTable] = useState(33);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isValid, setIsValid] = useState(true);
  const [search, setSearch] = useState({ salary, taxTable, year });
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      const fetchedData = await api.fetchTaxAmount(salary, taxTable, year);

      let key = 0;
      const rows = [];

      rows.push({ key: key++, label: 'Lön', amount: fetchedData.salary });
      rows.push({ key: key++, label: 'Skatt', amount: fetchedData.taxAmount, isTax: true });
      rows.push({ key: key++, label: 'Nettolön', amount: fetchedData.afterTax, isSum: true });   

      setResult(rows);
    };

    if (salary > 0) {
      fetchResult();
    }
  }, [search]);

  return (
    <Layout title="Endast lön">
      <YearAndTableSelection
        year={year}
        onYearChanged={e => setYear(e.target.value)}
        table={taxTable}
        onTableChanged={e => setTaxTable(e.target.value)}
      />
      <AmountInputField
        label={"Lön"}
        value={salary}
        onValueChanged={v => setSalary(v)}
        onValidate={setIsValid}
      />
      <button
        className="button is-primary is-pulled-right"
        disabled={!isValid}
        onClick={() => setSearch({ salary, taxTable, year })}
      >
        Beräkna
      </button>
      <Result resultRows={result}/>
    </Layout>
  );
};

export default Salary;
