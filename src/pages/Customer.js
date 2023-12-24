
import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";


const api = process.env.REACT_APP_BASEURL;
const Customer = () => {
  const [customers, setCustomers] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const [isError, setIsError] = useState(false);


  const onSubmit = async (e) => {
    console.log(id);
    e.preventDefault();
    if (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      email.trim().length > 0
    ) {
      await fetch(`${api}customers${id.length > 0 ? `/${id}` : ""}`, {
        method: id.length > 0 ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          emailAddress: email,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          fetchData();
          onclickClear();
          toast.success("Save Successfully", {
            duration: 4000,
            position: "top-right",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          setIsError(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsError(true);
    }
  };

  const fetchData = async () => {
    await fetch(`${api}customers`, {
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.length > 0) {
          setCustomers(res);
        }else{
          setCustomers([])
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickName = (item) => {
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setEmail(item.emailAddress);
    setId(String(item.id));
  };

  const onclickClear = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setId("");
    setIsError(false);
  };

  const onclickDelete = (e) => {
    e.preventDefault();
    fetch(`${api}customers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        fetchData();
        onclickClear();
        toast.success("Delete Successfully", {
          duration: 4000,
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {console.log(customers)}
      <div className="min-h-screen relative font-roboto flex items-center flex-col justify-center">
        <div className="w-[600px] max-[591px]:w-full flex flex-col justify-center items-center px-5">
          <div className="flex flex-col items-center gap-2">
            <div className="font-semibold text-[#0077b6]">FORM CUSTOMER</div>
          </div>

          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 mt-[30px] max-[591px]:w-full"
          >
            <div className="flex max-[591px]:flex-col max-[591px]:items-start items-center gap-2">
              <label htmlFor="name" className="w-[100px]">
                First Name
              </label>
              <div className="max-[591px]:hidden">:</div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`border py-2 px-5 max-[591px]:w-full ${
                  firstName.trim().length <= 0 && isError && "border-red-400"
                } `}
              />
              {firstName.trim().length <= 0 && isError && (
                <div className="text-red-400">Data harus diisi</div>
              )}
            </div>
            <div className="flex max-[591px]:flex-col max-[591px]:items-start items-center  gap-2">
              <label htmlFor="name" className="w-[100px]">
                Last Name
              </label>
              <div className="max-[591px]:hidden">:</div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`border py-2 px-5 max-[591px]:w-full ${
                  lastName.trim().length <= 0 && isError && "border-red-400"
                } `}
              />
              {lastName.trim().length <= 0 && isError && (
                <div className="text-red-400">Data harus diisi</div>
              )}
            </div>
            <div className="flex max-[591px]:flex-col max-[591px]:items-start items-center  gap-2">
              <label htmlFor="name" className="w-[100px]">
                Email
              </label>
              <div className="max-[591px]:hidden">:</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`border py-2 px-5 max-[591px]:w-full ${
                  email.trim().length <= 0 && isError && "border-red-400"
                } `}
              />
              {email.trim().length <= 0 && isError && (
                <div className="text-red-400">Data harus diisi</div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <button
                type="submit"
                className="px-5 py-2 bg-[#0077b6] rounded-md text-white"
              >
                {id.length > 0 ? "Update" : "Save"}
              </button>

              {id.length > 0 && (
                <button
                  onClick={onclickDelete}
                  type="submit"
                  className="px-5 py-2 bg-red-400 text-white rounded-md "
                >
                  Delete
                </button>
              )}

              {id.length > 0 && (
                <button
                  onClick={onclickClear}
                  type="submit"
                  className="px-5 py-2 bg-gray-300 rounded-md "
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          <div className="mt-[30px] w-full overflow-x-auto">
            <table className="border w-full">
              <thead>
                <tr className="text-center font-bold whitespace-nowrap">
                  <td className="border py-2 px-3">First Name</td>
                  <td className="border py-2 px-3">Last Name</td>
                  <td className="border py-2 px-3">Email</td>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 &&
                  customers.map((item, i) => (
                    <tr>
                      <td
                        onClick={() => onClickName(item)}
                        className="border py-2 px-3  max-w-[150px] cursor-pointer underline text-blue-300"
                      >
                        {item.firstName}
                      </td>
                      <td className="border py-2 px-3 overflow-x-auto whitespace-nowrap max-w-[150px]">
                        {item.lastName}
                      </td>
                      <td className="border py-2 px-3 overflow-x-auto whitespace-nowrap max-w-[150px]">
                        {" "}
                        {item.emailAddress}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
