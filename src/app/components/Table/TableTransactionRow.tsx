import { Transaction } from "@/types/transaction";

type TableTransactionRowProps = { transaction: Transaction };

const TableTransactionRow = ({
  transaction,
}: TableTransactionRowProps): JSX.Element => {
  const time = new Date(transaction.timestamp);

  return (
    <tr>
      <td className="p-3 border-b border-r border-gray-300">
        {transaction.direction === "inflow"
          ? transaction.sourceName
          : transaction.destinationName}
      </td>
      <td className="p-3 border-b border-r border-gray-300">
        {transaction.direction === "inflow" ? "+" : "-"}
        {transaction.amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: transaction.currency,
        })}
      </td>
      <td className="p-3 border-b border-r border-gray-300">
        {transaction.currency}
      </td>
      <td className="p-3 border-b border-gray-300">{time.toLocaleString()}</td>
    </tr>
  );
};

export default TableTransactionRow;
