import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UsersData({ data }) {
  return (
    <div>
      <Table>
        <TableCaption>Daftar Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Last Sign In</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(({ email, last_sign_in_at }) => (
            <TableRow key={email}>
              <TableCell className="font-medium">{email}</TableCell>
              <TableCell>{new Date(last_sign_in_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
