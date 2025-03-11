import { Button } from "@/components/ui/button"

export function DonationList() {
  const donations = [
    { id: 1, name: "Rahul Sharma", amount: "₹5,000", date: "2023-03-15", status: "Completed" },
    { id: 2, name: "Priya Patel", amount: "₹2,500", date: "2023-03-14", status: "Completed" },
    { id: 3, name: "Amit Singh", amount: "₹10,000", date: "2023-03-12", status: "Completed" },
    { id: 4, name: "Neha Gupta", amount: "₹1,000", date: "2023-03-10", status: "Completed" },
    { id: 5, name: "Vikram Mehta", amount: "₹7,500", date: "2023-03-08", status: "Completed" },
  ]

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {donations.map((donation) => (
            <tr
              key={donation.id}
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <td className="p-4 align-middle">{donation.id}</td>
              <td className="p-4 align-middle font-medium">{donation.name}</td>
              <td className="p-4 align-middle">{donation.amount}</td>
              <td className="p-4 align-middle">{donation.date}</td>
              <td className="p-4 align-middle">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200">
                  {donation.status}
                </span>
              </td>
              <td className="p-4 align-middle">
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

