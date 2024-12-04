import { Transaction } from "@/types/transaction";
import clsx from "clsx";

type TableTransactionRowProps = {
  transaction: Transaction;
  noBorderBottom?: boolean;
};

const TableTransactionRow = ({
  transaction,
  noBorderBottom = false,
}: TableTransactionRowProps): JSX.Element => {
  const time = new Date(transaction.timestamp);

  return (
    <tr>
      <td
        className={clsx("p-3 border-r border-gray-300", {
          "border-b": !noBorderBottom,
        })}
      >
        {transaction.direction === "inflow"
          ? transaction.sourceName
          : transaction.destinationName}
      </td>
      <td
        className={clsx("p-3 border-r border-gray-300", {
          "border-b": !noBorderBottom,
        })}
      >
        {transaction.direction === "inflow" ? "+" : "-"}
        {transaction.amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          currency: transaction.currency,
        })}
      </td>
      <td
        className={clsx("p-3 border-r border-gray-300", {
          "border-b": !noBorderBottom,
        })}
      >
        {transaction.currency}
      </td>
      <td
        className={clsx("p-3", {
          "border-b border-gray-300": !noBorderBottom,
        })}
      >
        {time.toLocaleString()}
      </td>
    </tr>
  );
};

export default TableTransactionRow;
