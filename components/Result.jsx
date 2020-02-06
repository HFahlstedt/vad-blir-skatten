const Result = props => {
  const { resultRows } = props;

  const formatAmount = amount =>
    amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <div className="section">
      {resultRows ? (
        <table className="table is-striped">
          <tbody>
            {props.resultRows.map(r => (
              <tr className={r.isSum ? 'sum' : ''} key={r.key}>
                <td>{r.label}</td>
                <td className={r.isTax ? 'tax' : ''}>
                  {formatAmount(r.amount * (r.isTax ? -1 : 1))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ''
      )}
      <style jsx>{`
        tr.sum {
          font-weight: bold;
        }
        td.tax {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default Result;
