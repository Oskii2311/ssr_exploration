import React, { useEffect, useState } from "react";

const Index = () => {
  const [users, setData] = useState([]);
  const [isCheckedAll, setChecked] = useState(false);

  const fetchData = async () => {
    const res = await fetch(`https://randomuser.me/api/?results=5000`);
    const data = await res.json();
    setData(
      data.results.map(user => ({
        name: user.name.first,
        surname: user.name.last,
        city: user.location.city,
        streetName: user.location.street.name,
        id: user.login.uuid
      }))
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTableHeader = () => {
    const header = Object.keys(users[0]);
    return (
      <>
        <th>
          <input type="checkbox" onChange={() => setChecked(state => !state)} />
        </th>
        {header.map((key, index) => (
          <th key={index}>{key.toUpperCase()}</th>
        ))}
      </>
    );
  };

  const renderTableData = () => {
    return users.map(user => {
      const { name, surname, city, streetName, id } = user;
      return (
        <tr key={id} style={{ backgroundColor: isCheckedAll && "#e2e2e2" }}>
          <td>
            <input type="checkbox" />
          </td>
          <td>{name}</td>
          <td>{surname}</td>
          <td>{city}</td>
          <td>{streetName}</td>
          <td>{id}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <table className="usersTable">
        <tbody>
          <tr>{users.length > 0 && renderTableHeader()}</tr>
          {users.length > 0 && renderTableData()}
        </tbody>
      </table>
      <style jsx global>{`
        .usersTable {
          text-align: center;
          font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          border: 3px solid #ddd;
          width: 100%;
        }

        .usersTable td,
        .usersTable th {
          border: 1px solid #ddd;
          padding: 8px;
        }

        .usersTable tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        .usersTable tr:hover {
          background-color: #ddd;
        }

        .usersTable th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: center;
          background-color: #4caf50;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Index;
