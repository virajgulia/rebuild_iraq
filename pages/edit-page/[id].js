import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { updateProfile } from "../../redux/actions/user";
import { Navigate } from "react-router-dom";
import { Add, ArrowBack } from "@material-ui/icons";
import { Box } from "@material-ui/core";

function EditPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [lastName, setLastName] = useState("")
  const [isAdmin, setIsAdmin] = useState()
  const router = useRouter();
  const { id } = router.query;

  console.log(id, "User Id");

  const url = "https://rebulding-iraq.vercel.app/api/user/all";
  // const url = "http://localhost:3000/api/user/all";

  const jwtToken = localStorage.getItem("zyen_token");
  const config = {
    headers: {
      Authorization: jwtToken,
    },
  };

  const applyStateValue = (data) => {
    data &&
      data
        .filter((el) => el._id === id)
        .map((e) => {
          setName(e.firstName);
          setLastName(e.lastName)
          setEmail(e.email);
          setPass(e.password);
          setIsAdmin(e.isAdmin)
        });
  };

  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        applyStateValue(res.data)
        console.log(res)
      }

      )
      .catch((err) => console.log(err));
  }, []);
  function updateUser() {
    const url = `https://rebulding-iraq.vercel.app/api/user/edit/${id}`;
    // const url = `http://localhost:3000/api/user/edit/${id}`;
    let data = {
      firstName: name,
      lastName,
      isAdmin
    }
    console.log(data)

    axios
      .put(url, data)
      .then((res) => {
        router.push('/dash')
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }


  return (
    <>
      <section>
        <Box px={5} py={2}>
          <ArrowBack sx={{ mx: 5 }} onClick={() => router.push('/dash')} />
        </Box>
      </section>
      <div className="rich-text-editor">
        <div className="form-add-news form-add-listing px-5">
          <div>
            <TextField
              label="First name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
              style={{ width: "100%", marginBottom: "15px" }}
            />
          </div>
          <div>
            <TextField
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoFocus
              required
              style={{ width: "100%", marginBottom: "15px" }}
            />
          </div>

          {/* <div>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", marginBottom: "15px" }}
            />
          </div> */}
          {/* 
          <div>
            <TextField
              label="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              style={{ width: "100%", marginBottom: "15px" }}
            />
          </div> */}
          <div>
            <span style={{ fontSize: 12, color: "#9B9B9B" }}>User Type</span>
            <FormControl
              required
              style={{ width: "100%", marginBottom: "15px" }}
            >
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                onChange={(e) => setIsAdmin(e.target.value == 'Admin')}
                value={isAdmin ? 'Admin' : 'User'}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Publisher">Publisher</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            {/* <Switch /> */}
            <span>Confirmed</span>
          </div>
          <div style={{ display: "flex", marginBottom: 30 }}>
            <h6 style={{ marginRight: 65, fontWeight: "bolder" }}>Note</h6>
            <TextField
              id="outlined-basic"
              label="Add Note"
              variant="outlined"
              // rows={10}
              style={{ width: 800, height: 5, marginRight: 20 }}
            // size="large"
            />
            <Button
              variant="contained"
              className="btn-custom"
              color="primary"
              style={{ height: 55, width: 10 }}
            >
              Enter
            </Button>
          </div>
          <div style={{ display: "flex" }}>
            <h6 style={{ marginRight: 25, fontWeight: "bolder" }}>
              Client Log
            </h6>
            <div
              style={{
                width: 800,
                height: 250,
                borderWidth: 2,
                borderColor: "black",
                borderStyle: "solid",
                display: "flex",
                flexDirection: "column",
                overflow: "scroll",
              }}
            // size="large"
            >
              <table>
                <tr>
                  <th style={{ fontSize: 17 }}>Date</th>
                  <th style={{ fontSize: 17 }}>Admin Name</th>
                  <th style={{ fontSize: 17 }}>Note</th>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="btn-custom-next">
          <Button onClick={updateUser} variant="contained" className="btn-custom" color="primary">
            Update
          </Button>
          <Button
            variant="contained"
            className="btn-custom mx-2"
            color="primary"
          >
            <Link legacyBehavior href={"/dash"}>Close</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
export default EditPage;
