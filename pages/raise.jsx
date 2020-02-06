import { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import AmountInputField from '../components/AmountInputField';
import YearAndTableSelection from '../components/YearAndTableSelection';
import Result from '../components/Result';

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

      let key = 0;
      const rows = [];
      rows.push({ key: key++, label: 'Lön', amount: newTax.salary });
      rows.push({
        key: key++,
        label: 'Skatt',
        amount: newTax.taxAmount,
        isTax: true,
      });
      rows.push({
        key: key++,
        label: 'Nettolön',
        amount: newTax.afterTax,
        isSum: true,
      });
      rows.push({
        key: key++,
        label: 'Nettoökning',
        amount: newTax.afterTax - current.afterTax,
      });

      setResult(rows);
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
        label={'Nuvarande lön'}
        value={salary}
        onValueChanged={value => setSalary(value)}
        onValidate={valid => setIsSalaryValid(valid)}
      />
      <AmountInputField
        label={'Ny lön'}
        value={raised}
        onValueChanged={value => setRaised(value)}
        onValidate={valid => setIsRaisedValid(valid)}
      />
      <button
        className="button is-primary is-pulled-right"
        disabled={!isValid}
        onClick={() => setSearch({ salary, taxTable, year, benefit: raised })}>
        Beräkna
      </button>
      <Result resultRows={result} />
    </Layout>
  );
};

export default Benefit;
