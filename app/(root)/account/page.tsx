import AccountNavigation from "@/components/AccountNavigation";
import { getLoggedInUser } from "@/lib/actions/customer.actions";
import Button from "@/components/Button";

export const metadata = {
  title: "Account | ŠišajMe",
};

const AccountPage = async () => {
  const loggedUser = await getLoggedInUser();

  return (
    <div className="flex gap-16">
      <div>
        <h1 className="text-2xl font-semibold mb-5">Postavke Računa</h1>
        <AccountNavigation />
      </div>

      <div className="space-y-5">
        {loggedUser && (
          <>
            <h3 className="heading-h1">
              Dobrodošli, {loggedUser.name.split(" ").at(0)} 👋
            </h3>
            <p className="text-textGray-500 mt-5 mb-8 text-lg font-medium">
              Vaša savršena frizura u samo nekoliko klikova. Zakažite svoj
              termin u par sekundi!
            </p>
            <Button
              href={`/customers/${loggedUser.$id}/new-appointment`}
              className="self-start"
            >
              Zakažite termin
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountPage;