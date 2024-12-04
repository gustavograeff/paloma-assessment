import { useDebounce } from "@/app/hooks/useDebounce";
import { HomeSearchParams } from "@/app/page";
import { currencies, Currency } from "@/types/transaction";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef } from "react";
import MultiSelect, { Option } from "../../Input/InputMultiSelect";
import InputText from "../../Input/InputText";

type TableTransactionsFiltersProps = { onFilterChange: () => void };

const TableTransactionsFilters = ({
  onFilterChange,
}: TableTransactionsFiltersProps): JSX.Element => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams: HomeSearchParams = Object.fromEntries(useSearchParams());

  const minValueInputRef = useRef<HTMLInputElement | null>(null);
  const maxValueInputRef = useRef<HTMLInputElement | null>(null);
  const currenciesInputRef = useRef<Option[]>([]);

  const initialCurrencyFilterOptions = useMemo(() => {
    if (!searchParams.currencies) return [];

    return (JSON.parse(searchParams.currencies) as Currency[]).map(
      (currency) => {
        return {
          id: currency,
          label: currency,
        };
      }
    );
  }, [searchParams.currencies]);

  const onFiltersChange = () => {
    const searchParamsNew = new URLSearchParams(searchParams);

    if (minValueInputRef.current?.value)
      searchParamsNew.set("min", minValueInputRef.current.value);
    else searchParamsNew.delete("min");

    if (maxValueInputRef.current?.value)
      searchParamsNew.set("max", maxValueInputRef.current.value);
    else searchParamsNew.delete("max");

    if (currenciesInputRef.current.length > 0)
      searchParamsNew.set(
        "currencies",
        JSON.stringify(
          currenciesInputRef.current.map((currency) => currency.id)
        )
      );
    else searchParamsNew.delete("currencies");

    router.push(`${pathName}?${searchParamsNew.toString()}`, { scroll: false });
  };

  const debouncedFiltersChange = useDebounce(onFiltersChange);

  const handleFilterChange = () => {
    debouncedFiltersChange();
    onFilterChange();
  };

  return (
    <div className="mt-4 flex flex-wrap gap-4">
      <InputText
        ref={minValueInputRef}
        defaultValue={searchParams.min}
        label="Min amount"
        type="number"
        onChange={handleFilterChange}
      />
      <InputText
        ref={maxValueInputRef}
        defaultValue={searchParams.max}
        label="Max amount"
        type="number"
        onChange={handleFilterChange}
      />
      <MultiSelect
        label="Currencies"
        initialOptions={initialCurrencyFilterOptions}
        onChangeOptions={(selectedCurrencies) => {
          handleFilterChange();
          currenciesInputRef.current = selectedCurrencies;
        }}
        options={currencies.map((currency) => {
          return {
            label: currency,
            id: currency,
          };
        })}
        placeholder="Choose your options"
      />
    </div>
  );
};

export default TableTransactionsFilters;
