import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { getLoggedInUser } from "@/lib/actions/customer.actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await getLoggedInUser();

  if (user) {
    redirect("/account");
  } else {
    redirect("/sign-in");
  }
};

export default Home;
