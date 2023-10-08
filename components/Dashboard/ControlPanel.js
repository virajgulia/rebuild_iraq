import React, { useState, Component } from "react";
import MainGrid from "./MainGrid";
import AddTender from "./AddTenderComponents/AddTender";
import AddTenderCategoy from "./AddTenderCategory";
import TenderStepper from "./AddTenderComponents/TenderStepper";
import TenderCategories from "./TenderCategories";
import ListAllTenders from "./ListAllTenders";
import TenderCompanies from "./TenderCompanies";
import NewsManagement from "./NewsManagement";
import TenderContacts from "./TenderContacts";
import CustomizedTables from "./UserManagement";

const ControlPanel = (props) => {
  const [componentName, setComponent] = useState("default");

  const renderComponent = () => {
    switch (componentName) {
      case "default":
        return (
          <MainGrid
            openAddNew={props.openAddNew}
            handleClose={props.handleClose}
            selectedComponent={(componentName) => setComponent(componentName)}
          />
        );
      case "manageUser":
        return (
          <CustomizedTables
            selectedComponent={(componentName) => setComponent(componentName)}
            />
            );
      case "addTender":
        return (
          <TenderStepper
            selectedComponent={(componentName) => setComponent(componentName)}
            />
            );
      case "tenderCategories":
        return (
          <TenderCategories
            selectedComponent={(componentName) => setComponent(componentName)}
          />
        );
      case "listAllTenders":
        return (
          <ListAllTenders
            selectedComponent={(componentName) => setComponent(componentName)}
          />
        );
      case "tenderCompanies":
        return (
          <TenderCompanies
            selectedComponent={(componentName) => setComponent(componentName)}
          />
        );
      case "tenderContacts":
        return (
          <TenderContacts
            selectedComponent={(componentName) => setComponent(componentName)}
          />
        );
      case "listAllNews":
        return (
          <NewsManagement
            openAddNew={props.openAddNew}
            handleClose={props.handleClose}
            selectedComponent={(componentName) => setComponent(componentName)}
          />
        );

      default:
        return <h1>error</h1>;
    }
  };

  return (
    <section className="control-panel">
      {/* <MainGrid selectedComponent={componentName => setComponent(componentName)} /> */}
      {renderComponent()}
    </section>
  );
};

export default ControlPanel;
