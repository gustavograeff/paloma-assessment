const TableTransactionsHead = (): JSX.Element => {
  return (
    <thead>
      <tr className="text-left bg-gray-200">
        <th className="w-2/6 p-3 border-b border-r border-gray-300">Account</th>
        <th className="w-1/6 p-3 border-b border-r border-gray-300">Amount</th>
        <th className="w-1/6 p-3 border-b border-r border-gray-300">
          Currency
        </th>
        <th className="w-2/6 p-3 border-b border-gray-300">Time</th>
      </tr>
    </thead>
  );
};

export default TableTransactionsHead;
