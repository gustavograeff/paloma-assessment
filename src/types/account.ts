export type Account = {
  accountId: string;
  accountName: string;
  currency: "USD" | "CAD" | "EUR" | "GBP" | "AUD" | "JPY";
  country: string;
  address: string;
  phoneNumber: string;
  email: string;
};

export type AccountResponse =
  | {
      data: Array<Account>;
      error: null;
    }
  | {
      data: null;
      error: string;
    };

export const accountsMock: AccountResponse = {
  data: [
    {
      accountId: "7059ef6a-0e25-5db3-a16f-02a8fc34cffe",
      accountName: "Vivian Jenkins",
      currency: "EUR",
      country: "Morocco",
      address: "765 Chadrick Springs, Overland Park 1639, Botswana",
      phoneNumber: "+764397271050211",
      email: "Kennedy.Cole57724@email.local",
    },
    {
      accountId: "9e64f7e8-7ddf-5d8d-817d-42812d9ec4ce",
      accountName: "Jacinthe Schinner",
      currency: "AUD",
      country: "United Arab Emirates",
      address: "488 Wisozk Dale, Racine 7706, Brazil",
      phoneNumber: "+935305884366521",
      email: "Kaden.Turcotte31792@email.local",
    },
  ],
  error: null,
};

export const accountsMockError = {
  data: null,
  error: "Something went wrong",
};
