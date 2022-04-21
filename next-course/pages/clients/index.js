import Link from "next/link";

function ClientsPage() {
  const clients = [
    { id: "max", name: "Maximilian" },
    { id: "manu", name: "Manuel" },
  ];

  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map((item) => (
          <li key={item.id}>
            {/* <Link href={`/clients/${item.id}`}>{item.name}</Link> */}

            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: item.id },
              }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;
