



const Print = ({ userData,ref }) => {
   
    return (
      <div ref={ref}>
        <div className="w-full mb-4 text-center text-xl font-semibold uppercase underline underline-offset-2">
          Laporan Daftar Users
        </div>
        <table className="border-collapse border border-black w-full">
          <thead>
            <tr>
              <th className="border border-black py-2">No</th>
              <th className="border border-black py-2">Username</th>
              <th className="border border-black py-2">Email</th>
              <th className="border border-black py-2">Role</th>
            </tr>
          </thead>
  
          <tbody>
            {userData &&
              userData.map(
                ({ email, username, role, id }, i) =>
                  role !== "admin" && (
                    <tr key={i}>
                      <td className={"border border-black text-center p-1 "}>
                        {i + 1}
                      </td>
                      <td className={"border border-black p-1"}>{username}</td>
                      <td className={"border border-black p-1"}>{email}</td>
                      <td className={"border border-black p-1"}>{role}</td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Print;
  