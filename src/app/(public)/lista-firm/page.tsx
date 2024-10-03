import Link from "next/link";

import { routes } from "~/routes/routes";
import { api } from "~/trpc/server";

import { Heading, Text } from "~/components/common";

const CompanyListPage = async () => {
  const companiesList = await api.company.getAllCompanies.query();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Lista firm</h1>
      <ul className="space-y-4">
        {companiesList.map((company) => (
          <li key={company.id} className="rounded-lg border-2 p-4">
            <Link href={routes.companyPage(company.slug)} className="block">
              <Heading className="text-xl font-semibold">{company.company.companyName}</Heading>
              <Text size='sm' color='muted'>{company.company.city}, {company.company.country}</Text>
              <Text size='sm'>{company.description || "Brak opisu"}</Text>
              <Text size='sm' color='muted'>NIP: {company.company.nip}</Text>
              <Text size='sm' color='muted'>Adres: {company.company.addressLine1}, {company.company.postalCode} {company.company.city}</Text>
              <Text size='sm' color='muted'>Telefon: {company.company.phoneNumber}</Text>
              <Text size='sm' color='muted'>Email: {company.company.email}</Text>
              <Text size='sm' color='muted'>Strona WWW: {company.company.website || "Brak"}</Text>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyListPage;