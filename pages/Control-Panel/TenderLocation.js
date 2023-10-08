import React, { useEffect, useState } from "react";
import {
    getProfile,
    updateProfile,
} from "../../redux/actions/user";
import { connect } from "react-redux";
// import { getAllCategories } from "../../redux/actions/category";
import { getAllCompanies } from "../../redux/actions/company";

import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { Typography } from "@material-ui/core";

import Control from './controlPanel';
import Router, { useRouter } from "next/router";
import Footer from "../../components/Layouts/Footer";
import { toast, ToastContainer } from "react-toastify";

const TenderLocation = (props) => {
    // const [treeCategories, setTreeCategories] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [personalInfo, setPersonalInfo] = useState(null);
    const [locations, setLocations] = useState([]);
    const router = useRouter();

    useEffect(() => {
        // dont remove ok function 
        const ok = async () => {
            await props.getAllCompanies();
            await props.getProfile();
        }
        ok()
        console.log()
    }, []);


    useEffect(() => {
        if (props.companies && props.companies.length > 0) {
            const fetchListCompany =
                props.companies &&
                props.companies.map((item) => item.country);
            const removeDuplicates = (data) => {
                return [...new Set(data)];
            };
            const newFetchListCompany = removeDuplicates(fetchListCompany);
            setLocations(newFetchListCompany);
            console.log(newFetchListCompany);
            console.log('---->', locations);
            const treeData = [];
            for (let i = 0; i < newFetchListCompany.length; i++) {
                const item = newFetchListCompany[i];
                if (item !== undefined && item) {
                    const obj = {
                        value: item,
                        label: item,
                        // children: [],
                    };
                    // console.log('object', obj)
                    treeData.push(obj);
                }
                // console.log(treeData);
            }
            setNodes(treeData);
            console.log('Nodes', nodes);
            // setChecked();
            // console.log(nodes)
        }
    }, [props.companies]);

    useEffect(() => {
        if (props.profile) {
            console.log('user Tenders categories', props.profile.tenderLocations);
            setChecked(props.profile.tenderLocations);
            // console.log('dddd', props.profile.tenderLocations);
        }
    }, [props.profile]);

    const handleSelected = (checked) => {
        setChecked(checked);
        const personal = {
            tenderLocations: checked,
        };
        setPersonalInfo(personal);
        console.log(checked);
    };
    const testmode = async () => {
        console.log('This is props', props);
        await props.updateProfile(personalInfo).then(toast.success("Updated successfully!"));
        router.push("/Control-Panel/control-panel-alert");
    }
    const handleclose = () => {
        router.push("/Control-Panel/control-panel-alert");

    }
    return (
        <>
            <Control />
            <div className="container" style={{ border: 1, marginLeft: "15%", borderStyle: "solid", borderColor: "silver", width: "80%", marginBottom: "5%" }}>
                <p className='mt-3'>Please select from the tender categories below so we can send you the specific type of job you are intersted in.</p>
                <h5 style={{ paddingTop: 15 }}>Select Category</h5>
                <hr></hr>
                <div className="grid-view">
                    <div className="column" style={{ width: "50%" }}>
                        <div
                            className="panel-card"
                            style={{ backgroundColor: "#f2f2f2", border: "1px solid #d8d8d8" }}
                        >
                            {nodes.length > 0 && (
                                <CheckboxTree
                                    nodes={nodes}
                                    checked={checked}
                                    expanded={expanded}
                                    onCheck={(checked) => handleSelected(checked)}
                                    onExpand={(expanded) => setExpanded(expanded)}
                                    showNodeTitle={true}
                                    nameAsArray={true}
                                    icons={{
                                        check: <span className="rct-icon rct-icon-check" />,
                                        uncheck: <span className="rct-icon rct-icon-uncheck" />,
                                        halfCheck: <span className="rct-icon rct-icon-half-check" />,
                                        expandClose: (
                                            <span className="rct-icon rct-icon-expand-close" />
                                        ),
                                        expandOpen: (
                                            <span className="rct-icon rct-icon-expand-open" />
                                        ),
                                        expandAll: <span className="rct-icon rct-icon-expand-all" />,
                                        collapseAll: (
                                            <span className="rct-icon rct-icon-collapse-all" />
                                        ),
                                        parentClose: null,
                                        parentOpen: null,
                                        leaf: null,
                                    }}
                                />
                            )}
                        </div>
                        <button className="btn btn-lg m-4 " style={{ backgroundColor: '#2ea3f2' }} onClick={() => testmode()}>Save</button>
                        <button className="btn btn-lg" style={{ backgroundColor: 'silver' }} onClick={() => handleclose()}>Cancel</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = (store) => {
    return {
        // categories: store.category.categories,
        companies: store.company.companies,
        profile: store.user.profile,
        isUpdated: store.user.isUpdated,
    };
};

const mapDispatchToProps = {
    getAllCompanies,
    getProfile,
    updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(TenderLocation);