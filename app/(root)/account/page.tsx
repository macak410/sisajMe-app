import AccountNavigation from "@/components/AccountNavigation";

export const metadata = {
  title: "Account",
};

const AccountPage = () => {
  return (
    <div className="flex gap-16">
      <div>
        <h1 className="text-2xl font-semibold mb-5">Account Settings</h1>

        <AccountNavigation />
      </div>

      <div className="space-y-5">
        <h3 className="text-3xl font-bold">Dobrodošli 👋</h3>
        <p className="text-lg font-medium text-textGray-500">
          Ovdje možete uređivati ​​svojim terminima.
        </p>
      </div>
    </div>
  );
};

export default AccountPage;
