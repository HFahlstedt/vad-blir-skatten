import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { withRedux } from '../lib/redux';
import Layout from '../components/Layout';
import AmountInputField from '../components/AmountInputField';
import YearAndTableSelection from '../components/YearAndTableSelection';
import Result from '../components/Result';

const Benefit = () => {
  const { year, taxTable } = useSelector(state => ({
    year: state.year,
    taxTable: state.table,
  }));

  const [salary, setSalary] = useState(0);
  const [benefit, setBenefit] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [isSalaryValid, setIsSalaryValid] = useState(false);
  const [isBenefitValid, setIsBenefitValid] = useState(false);
  const [search, setSearch] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const withoutBenefit = await api.fetchTaxAmount(salary, taxTable, year);
      const fetchedData = await api.fetchTaxAmount(
        salary + benefit,
        taxTable,
        year
      );

      let key = 0;
      const rows = [];

      rows.push({
        key: key++,
        label: 'Lön',
        amount: withoutBenefit.salary,
      });
      rows.push({
        key: key++,
        label: 'Skatt',
        amount: fetchedData.taxAmount,
        istax: true,
      });
      rows.push({ key: key++, label: 'Förmån', amount: benefit });
      rows.push({
        key: key++,
        label: 'Nettolön',
        amount: salary - fetchedData.taxAmount,
        isSum: true,
      });
      rows.push({
        key: key++,
        label: 'Nettokostnad förmån',
        amount: fetchedData.afterTax - withoutBenefit.afterTax,
      });

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
      <YearAndTableSelection />
      <AmountInputField
        label={'Lön'}
        value={salary}
        onValueChanged={value => setSalary(value)}
        onValidate={valid => setIsSalaryValid(valid)}
      />
      <AmountInputField
        label={'Förmån'}
        value={benefit}
        onValueChanged={value => setBenefit(value)}
        onValidate={valid => setIsBenefitValid(valid)}
      />
      <button
        className="button is-primary is-pulled-right"
        disabled={!isValid}
        onClick={() => setSearch({ salary, taxTable, year, benefit })}>
        Beräkna
      </button>
      <Result resultRows={result} />
    </Layout>
  );
};

export default withRedux(Benefit);
