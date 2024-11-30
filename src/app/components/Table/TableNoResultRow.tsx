const TableNoResultRow = (): JSX.Element => {
  return (
    <tr>
      <td colSpan={4} className="p-3 text-center">
        No transactions found
      </td>
    </tr>
  );
};

export default TableNoResultRow;
