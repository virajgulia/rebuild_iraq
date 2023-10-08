import React, { Component, useEffect, useState } from "react";
import Link from "next/link";
import ReactWOW from "react-wow";
import axios from "axios";

function MainBanner(props) {
  const [search, setSearch] = useState("");
  const handleNameInput = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    window.open(search.length > 0 ? `/tenders` : "#", "_self");
    localStorage.setItem("search", search);
  };

  return (
    <section className="main-banner-area main-banner-area-one">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="banner-text pt-100">
              <h1>Rebuilding Iraq</h1>
              <hr></hr>
              <h3>Tenders | Projects | News</h3>
              <input
                type="text"
                name="search"
                onChange={handleNameInput}
                placeholder="Search tenders..."
              />

              <div className="banner-btn">
                <a onClick={onSubmit} className="default-btn">
                  Search
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// class MainBanner extends Component {
//   render() {
//     const testString = "George / John -- doe - blah";

//     const formatted = testString.replace(/\s+|-+|[,\/]/g, "-");
//     // console.log(formatted.replace(/-+/g, "-"));
//     const [test, setTest] = useState(0);
//     console.log(test);

//     return (
//       <section className="main-banner-area main-banner-area-one">
//         <div className="container-fluid">
//           <div className="row align-items-center">
//             <div className="col-md-12">
//               <div className="banner-text pt-100">
//                 <h1>Rebuilding Iraq</h1>
//                 <hr></hr>
//                 <h3>Tenders | Projects | News</h3>
//                 {/* <form onSubmit={handleSubmit(onSubmit)}> */}
//                 <form>
//                   <input
//                     type="text"
//                     placeholder="Search tenders..."
//                     name="search"
//                   />

//                   <div className="banner-btn">
//                     <Link legacyBehavior href="/#">
//                       <a className="default-btn">Search</a>
//                     </Link>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }
// }

export default MainBanner;
