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
      <h1 className="text-2xl font-semibold mb-5 sm:mb-8 text-center sm:text-left">
        Postavke računa
      </h1>

      <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
        <div className="w-full sm:w-1/3">
          <AccountNavigation />
        </div>

        <div className="w-full sm:w-2/3 space-y-5">
          {loggedUser && (
            <>
              <h3 className="heading-h1 text-center sm:text-left">
                Dobrodošli, {loggedUser.name.split(" ").at(0)} 👋
              </h3>
              <p className="text-textGray-500 mt-3 mb-6 text-lg font-medium text-center sm:text-left">
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
        </div>
      </div>
    </div>
  );
};

export default AccountPage;