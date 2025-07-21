import AccountNavigation from "@/components/AccountNavigation";
import { getLoggedInUser } from "@/lib/actions/customer.actions";
import Button from "@/components/Button";

export const metadata = {
  title: "Account | ŠišajMe",
};

const AccountPage = async () => {
  const loggedUser = await getLoggedInUser();

  return (
    <div className="w-full max-w-7xl px-4 sm:px-8 mx-auto py-6">
      <section className="space-y-5 mb-10 text-center sm:text-left">
        {loggedUser && (
          <>
            <h1 className="heading-h1">
              Dobrodošli, {loggedUser.name.split(" ").at(0)} 👋
            </h1>
            <p className="text-textGray-500 text-lg font-medium">
              Vaša savršena frizura u samo nekoliko klikova. Zakažite svoj
              termin u par sekundi!
            </p>
            <Button
              href={`/customers/${loggedUser.$id}/new-appointment`}
              className="w-full sm:w-auto"
            >
              Zakažite termin
            </Button>
          </>
        )}
      </section>

      <h2 className="text-2xl font-semibold mb-5 sm:mb-8 text-center sm:text-left">
        Postavke računa
      </h2>

      <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
        <div className="w-full sm:w-1/3">
          <AccountNavigation />
        </div>

        <div className="w-full sm:w-2/3">{/* Ostali sadržaj ako ga ima */}</div>
      </div>
    </div>
  );
};

export default AccountPage;