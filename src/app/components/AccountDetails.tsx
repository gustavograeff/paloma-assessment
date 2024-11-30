import { Account } from "@/types/account";
import {
  MdAccountBalance,
  MdAccountCircle,
  MdAlternateEmail,
  MdCurrencyExchange,
  MdLocalPhone,
  MdMapsHomeWork,
} from "react-icons/md";

type AccountDetailsProps = { account: Account };

const AccountDetails = ({ account }: AccountDetailsProps): JSX.Element => {
  return (
    <div className="px-8 pt-0">
      <h2 className="mt-5 text-lg">Account details</h2>
      <div className="flex gap-2 flex-wrap flex-col">
        <span className="flex items-center gap-2 border-b border-gray-200 w-fit text-xl">
          <MdAccountCircle className="shrink-0" /> {account.accountName}
        </span>
        <span className="flex items-center gap-2 border-b border-gray-200 w-fit  text-xl">
          <MdAccountBalance className="shrink-0" /> {account.accountId}
        </span>
        <span className="flex items-center gap-2 border-b border-gray-200 w-fit  text-xl">
          <MdMapsHomeWork className="shrink-0" /> {account.address} -{" "}
          {account.country}
        </span>
        <span className="flex items-center gap-2 border-b border-gray-200 w-fit  text-xl">
          <MdCurrencyExchange /> {account.currency}
        </span>
        <span className="flex items-center gap-2 border-b border-gray-200 w-fit  text-xl">
          <MdAlternateEmail className="shrink-0" /> {account.email}
        </span>
        <span className="flex items-center gap-2 border-b border-gray-200 w-fit  text-xl">
          <MdLocalPhone className="shrink-0" /> {account.phoneNumber}
        </span>
      </div>
    </div>
  );
};

export default AccountDetails;
