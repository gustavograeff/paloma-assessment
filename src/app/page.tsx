"use client";

import { Account, AccountResponse } from "@/types/account";
import { Transaction } from "@/types/transaction";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Skeleton from "react-loading-skeleton";
import AccountDetails from "./components/AccountDetails";
import Button from "./components/Button/Button";
import InputSelect from "./components/Input/InputSelect";
import TableNoResultRow from "./components/Table/TableNoResultRow";
import TableSkeletonRow from "./components/Table/TableSkeletonRow";
import TableTransactionRow from "./components/Table/TableTransactionRow";
import TableTransactionsHead from "./components/Table/TrableTransactionsHead";
import TableTransactionsFilters from "./components/Table/Transactions/TableTransactionsFilters";
import { apiUrl, webSocketUrl } from "./constants/api";
import { useAbortController } from "./hooks/useAbortController";
import useWebSocket from "./hooks/useWebSocket";

export type HomeSearchParams = {
  accountId?: string;
  min?: string;
  max?: string;
  sinceTransaction?: string;
  currencies?: string;
};

const retryFetchAccountsMilliseconds = 2000;

export default function Home() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams: HomeSearchParams = Object.fromEntries(useSearchParams());

  const { abortController, abortReset } = useAbortController();

  const [isFetchingAccounts, setIsFetchingAccounts] = useState(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isWebsocketConnectionPaused, setIsWebsocketConnectionPaused] =
    useState(false);

  const fetchAccountsErrorMessageRef = useRef<AccountResponse["error"]>(null);
  const accountInputRef = useRef<HTMLSelectElement | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const alreadyShownTransactions = useRef<Transaction[]>([]);

  const selectedAccount = useMemo(() => {
    return accounts.find(
      (account) => account.accountId === searchParams.accountId
    );
  }, [accounts, searchParams.accountId]);

  const {
    isLoading: isLoadingFirstMessage,
    messages: transactions,
    ws,
    open,
    setMessages,
    isOpen,
  } = useWebSocket();

  const filteredTransactions = useMemo(() => {
    const { max, min, currencies } = searchParams;

    return (
      isWebsocketConnectionPaused
        ? alreadyShownTransactions.current
        : transactions
    ).filter((message) => {
      if (min) if (message.amount < parseFloat(min)) return false;

      if (max) if (message.amount > parseFloat(max)) return false;

      if (currencies && !currencies.match(message.currency)) return false;

      return true;
    });
  }, [isWebsocketConnectionPaused, transactions, searchParams]);

  const fetchAccounts = useCallback(async (): Promise<AccountResponse> => {
    const response = await fetch(`${apiUrl}/accounts`, {
      signal: abortController.current.signal,
    });

    return await response.json();
  }, [abortController]);

  const populateAccountsState = useCallback(async () => {
    try {
      const accounts = await fetchAccounts();

      setIsFetchingAccounts(false);

      if (accounts.error || !accounts.data || accounts.data.length === 0) {
        fetchAccountsErrorMessageRef.current =
          accounts.error || "Something went wrong";
        setAccounts([]);

        if (!retryTimeoutRef.current && !isFetchingAccounts) {
          setIsFetchingAccounts(true);

          retryTimeoutRef.current = setTimeout(() => {
            populateAccountsState();
            retryTimeoutRef.current = null;
          }, retryFetchAccountsMilliseconds);
        }
        return;
      }

      fetchAccountsErrorMessageRef.current = null;
      setAccounts(accounts.data);
    } catch {
      fetchAccountsErrorMessageRef.current = "Something went wrong";
      setAccounts([]);

      setIsFetchingAccounts(false);

      if (!retryTimeoutRef.current && !isFetchingAccounts) {
        setIsFetchingAccounts(true);
        retryTimeoutRef.current = setTimeout(() => {
          populateAccountsState();
          retryTimeoutRef.current = null;
        }, retryFetchAccountsMilliseconds);
      }
    }
  }, [fetchAccounts, isFetchingAccounts, setAccounts]);

  useEffect(() => {
    populateAccountsState();

    return () => {
      abortReset("Component unmount");
    };
  }, [abortReset, populateAccountsState]);

  useEffect(() => {
    if (searchParams.accountId) setIsWebsocketConnectionPaused(false);
    else setIsWebsocketConnectionPaused(true);
  }, [searchParams.accountId]);

  useEffect(() => {
    if (!searchParams.accountId) {
      ws?.close(1000, "Closing old connection");
      if (accountInputRef.current) accountInputRef.current.value = "";
      return;
    }

    if (isFetchingAccounts) return;

    const matchedAccount = accounts.find(
      (account) => account.accountId === searchParams.accountId
    );

    if (accountInputRef.current) {
      accountInputRef.current.value = matchedAccount?.accountId ?? "";
    }

    if (!matchedAccount) return;
    if (!searchParams.accountId) return;

    const queryParams = new URLSearchParams();

    if (searchParams.sinceTransaction)
      queryParams.set("since", searchParams.sinceTransaction);
    else queryParams.delete("since");

    if (!ws) {
      open(
        `${webSocketUrl}/accounts/${
          matchedAccount.accountId
        }/transactions?${queryParams.toString()}`
      );
      return;
    }

    if (ws?.readyState === ws?.CLOSED) {
      open(
        `${webSocketUrl}/accounts/${
          matchedAccount.accountId
        }/transactions?${queryParams.toString()}`
      );
    }
  }, [
    accounts,
    isFetchingAccounts,
    open,
    searchParams.accountId,
    searchParams.sinceTransaction,
    ws,
  ]);

  useEffect(() => {
    if (isWebsocketConnectionPaused) return;
    alreadyShownTransactions.current = filteredTransactions ?? [];
  }, [filteredTransactions, isWebsocketConnectionPaused]);

  const handlePauseResumeTransactionListener = () => {
    if (!selectedAccount) return;

    const matchedAccount = accounts.find((account) => {
      return account.accountId === selectedAccount.accountId;
    });

    if (!matchedAccount) return;

    setIsWebsocketConnectionPaused((prev) => !prev);
  };

  if (isFetchingAccounts)
    return (
      <div className="m-8">
        <Skeleton width={56} />
        <Skeleton width={180} />
      </div>
    );

  if (accounts.length === 0 && fetchAccountsErrorMessageRef.current) {
    return (
      <div className="m-8">
        <p>{fetchAccountsErrorMessageRef.current}, trying again...</p>
      </div>
    );
  }

  const handleAccountInputChange: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setMessages([]);
    ws?.close(1000, "Remove old connection");

    const matchedAccount = accounts.find((account) => {
      return account.accountId === e.target.value;
    });

    if (!matchedAccount) {
      router.push(pathName);
      return;
    }

    const searchParamsNew = new URLSearchParams(searchParams);

    searchParamsNew.set("accountId", matchedAccount.accountId);

    router.push(`${pathName}?${searchParamsNew.toString()}`);
  };

  const handleFilterChange = () => {
    abortReset("Debounce cancel previous");
  };

  return (
    <div>
      <InputSelect
        ref={accountInputRef}
        className="m-8"
        label="Account"
        placeholder="Select an account"
        options={
          accounts.map((account) => {
            return {
              label: account.accountName,
              value: account.accountId,
            };
          }) ?? []
        }
        defaultValue={searchParams.accountId}
        onChange={handleAccountInputChange}
      />

      {selectedAccount && (
        <div className="mb-8">
          <AccountDetails account={selectedAccount} />

          <div className="h-1 bg-gray-700 my-12"></div>
          <div className="mx-8">
            <h3 className="mt-8">Transactions</h3>

            <TableTransactionsFilters onFilterChange={handleFilterChange} />

            <div className="flex gap-8 items-center mt-6 sticky">
              <Button
                className="px-10 py-3 rounded bg-gray-800 text-white"
                onClick={handlePauseResumeTransactionListener}
              >
                {isWebsocketConnectionPaused || !isOpen ? "Resume" : "Pause"}
              </Button>
              <span>
                Connection Status:{" "}
                {isWebsocketConnectionPaused || !isOpen ? "Paused" : "Active"}
              </span>
            </div>

            <table className="w-full max-w-screen-lg mt-4 border border-separate border-spacing-0 border-gray-300 rounded">
              <TableTransactionsHead />

              <tbody>
                {isLoadingFirstMessage && transactions.length === 0 ? (
                  <TableSkeletonRow />
                ) : filteredTransactions.length === 0 ? (
                  <TableNoResultRow />
                ) : (
                  filteredTransactions.map((transaction) => {
                    return (
                      <TableTransactionRow
                        key={transaction.transactionId}
                        transaction={transaction}
                      />
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
