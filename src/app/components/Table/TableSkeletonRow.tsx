import Skeleton from "react-loading-skeleton";

const TableSkeletonRow = (): JSX.Element => {
  return (
    <tr>
      <td className="p-3 border-b border-r border-gray-300">
        <Skeleton width={56} />
      </td>
      <td className="p-3 border-b border-r border-gray-300">
        <Skeleton width={56} />
      </td>
      <td className="p-3 border-b border-r border-gray-300">
        <Skeleton width={56} />
      </td>
      <td className="p-3 border-b border-gray-300">
        <Skeleton width={56} />
      </td>
    </tr>
  );
};

export default TableSkeletonRow;
