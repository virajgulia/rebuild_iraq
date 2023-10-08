// import React, { Component } from "react";
// import TextField from "@material-ui/core/TextField";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import moment from "moment";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import { connect } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
// import Button from "@material-ui/core/Button";
// import { addNews, updateNews } from "../../redux/actions/news";
// import ArticleEditor from "../ArticleEditor/ArticleEditor";

// class ActionNews extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editor: "",
//     };
//   }

//   componentDidMount = async () => {
//     if (this.props.newsDetail) {
//       const { newsDetail } = this.props;
//       await this.setState({
//         id: newsDetail._id,
//         title: newsDetail.title,
//         description: newsDetail.description,
//         // link: newsDetail.link,
//         status: newsDetail.status,
//         editor: newsDetail.editorHtml,
//         thumbnail: newsDetail.thumbnail,
//         releasedDate: moment(newsDetail.releasedDate).format("YYYY-MM-DD"),
//       });
//     }
//   };

//   onChangeEditor = (value) => {
//     this.setState({ editor: value });
//   };

//   onChange = async (name) => {
//     if (name === "image") {
//       await this.setState({ [name]: event.target.files[0] });
//     } else {
//       await this.setState({ [name]: event.target.value });
//     }
//   };

//   handleChange = (event) => {
//     this.setState({ status: event.target.value });
//   };

//   handleActionNews = async () => {
//     const { title, description, status, releasedDate, editor, image } =
//       this.state;
//     if (title && description && status && releasedDate) {
//       const data = {
//         description,
//         title,
//         status,
//         releasedDate,
//         editorHtml: editor,
//       };

//       const fd = new FormData();
//       if (image) fd.append("image", image);
//       fd.append("data", JSON.stringify(data));

//       if (this.props.newsDetail) {
//         await this.props.updateNews(this.state.id, fd);
//         if (this.props.isEditNews) {
//           toast.success("Update news successfully!");
//           await this.setState({});
//           await this.props.handleClose();
//         } else {
//           toast.error("Update news failed!");
//         }
//       } else {
//         await this.props.addNews(fd);
//         if (this.props.isAddNews) {
//           toast.success("Add news successfully!");
//           await this.setState({});
//           await this.props.handleClose();
//         } else {
//           toast.error("Add news failed!");
//         }
//       }
//     } else {
//       toast.error("Please fill all the required fields!");
//     }
//   };

//   render() {
//     const statusNews = ["publish", "block", "prepare"];
//     const { title, description, link, status, releasedDate } = this.state;
//     return (
//       <div className="" style={{ backgroundColor: "#fff", padding: 10 }}>
//         <div className="form-add-news form-add-listing">
//           <div>
//             <TextField
//               required
//               label="Title"
//               style={{ width: "100%", margin: "20px 0px" }}
//               value={title}
//               onChange={() => this.onChange("title")}
//             />
//           </div>

//           <div>
//             <TextField
//               required
//               style={{ width: "100%", margin: "20px 0px" }}
//               id="standard-multiline-flexible"
//               label="Short Description"
//               multiline
//               rowsMax={10}
//               value={description}
//               onChange={() => this.onChange("description")}
//             />
//           </div>

//           {/* <TextField
//             required
//             label="Link"
//             style={{ width: "45%" }}
//             value={link}
//             onChange={() => this.onChange("link")}
//           /> */}

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               flexWrap: "wrap",
//               flexDirection: "row",
//             }}
//             className="form-filed-date"
//           >
//             <TextField
//               id="date"
//               required
//               label="Release Date"
//               type="date"
//               style={{ margin: "20px", width: "220px" }}
//               // defaultValue="2017-05-24"
//               value={releasedDate}
//               onChange={() => this.onChange("releasedDate")}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//             <FormControl required style={{ margin: "20px" }}>
//               <InputLabel id="demo-simple-select-required-label">
//                 Status
//               </InputLabel>
//               <Select
//                 labelId="demo-simple-select-required-label"
//                 id="demo-simple-select-required"
//                 MenuProps={{
//                   anchorOrigin: {
//                     vertical: "bottom",
//                     horizontal: "left",
//                   },
//                   getContentAnchorEl: null,
//                 }}
//                 style={{ width: "125px" }}
//                 value={status ? status : ""}
//                 onChange={this.handleChange}
//               >
//                 {statusNews &&
//                   statusNews.map((item, index) => (
//                     <MenuItem key={index} value={item}>
//                       {item}
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           </div>

//           <TextField
//             required
//             label="Thumbnail"
//             type="file"
//             accept="image/*"
//             onChange={() => this.onChange("image")}
//             InputLabelProps={{
//               shrink: true,
//             }}
//             style={{ width: "100%", margin: "20px 0px" }}
//           />

//           {this.state.thumbnail && this.state.thumbnail.location && (
//             <>
//               <Image width={0} height={0}
//                 style={{ margin: "15px", width: "30%" }}
//                 alt=""
//                 src={this.state.thumbnail.location || ""}
//               />
//             </>
//           )}
//         </div>

//         <div>
//           <ArticleEditor
//             onChangeEditor={this.onChangeEditor}
//             editorHtml={this.state.editor}
//           />
//         </div>
//         <div className="btn-custom-next">
//           <Button type="button" onClick={() => window.location.reload()}>
//             <span>Back</span>
//           </Button>

//           <Button
//             variant="contained"
//             className="btn-custom"
//             color="primary"
//             onClick={this.handleActionNews}
//           >
//             {this.props.newsDetail ? "Update" : "Add"}
//           </Button>
//         </div>
//         <ToastContainer />
//       </div>
//     );
//   }
// }

// const mapStateToProps = (store) => {
//   return {
//     isAddNews: store.news.isAddNews,
//     isEditNews: store.news.isEditNews,
//   };
// };

// const mapDispatchToProps = {
//   addNews,
//   updateNews,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ActionNews);

import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ArticleEditor from "../ArticleEditor/ArticleEditor";
import {
  Box,
  Grid,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@material-ui/core";

const ActionNews = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [newsData, setNewsData] = useState({ news: "" });
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "https://rebulding-iraq.vercel.app/api/news/add";

    axios
      .post(url, {
        title: title,
        releasedDate: date,
        description: desc,
        editorHtml: newsData?.news,
        status: status,
        thumbnail: thumbnail,
      })
      .then(() => {
        setTimeout(() => {
          toast.success("Add news successfully!");
        }, 2000);
      })
      .catch(() => toast.error("Add news failed!"));
  };

  return (
    <Box bgcolor="white" p={5}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          placeholder="Enter Title Here"
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <br />
        <br />
        <TextField
          label="Short Description"
          value={desc}
          placeholder="Enter Description Here"
          onChange={(e) => setDesc(e.target.value)}
          fullWidth
          required
        />
        <br />
        <br />
        <br />
        <Grid container spacing={5}>
          <Grid item md={6}>
            <TextField
              label="Release Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />
          </Grid>
          <Grid item md={6}>
            <FormControl required fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="publish">publish</MenuItem>
                <MenuItem value="prepare">prepare</MenuItem>
                <MenuItem value="block">block</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <br />
        <TextField
          label="Thumbnail"
          value={thumbnail}
          placeholder="Enter Thumbnail Link Here"
          onChange={(e) => setThumbnail(e.target.value)}
          fullWidth
          required
        />
        <br />
        <br />
        <ArticleEditor
          editorHtml={newsData?.news}
          onChangeEditor={(value) => setNewsData({ news: value })}
        />
        <br />
        <br />
        <Box textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            <b>Submit</b>
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default ActionNews;
