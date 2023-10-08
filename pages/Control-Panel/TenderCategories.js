import React, { useEffect, useState } from "react";
import {
    getProfile,
    updateProfile,
} from "../../redux/actions/user";
import { connect } from "react-redux";
import { getAllCategories } from "../../redux/actions/category";

import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { Typography } from "@material-ui/core";

import Control from './controlPanel';
import Router, { useRouter } from "next/router";
import Footer from "../../components/Layouts/Footer";
import { toast, ToastContainer } from "react-toastify";

const TenderCategories = (props) => {
    const [treeCategories, setTreeCategories] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [personalInfo, setPersonalInfo] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // dont remove ok function 
        const ok = async () => {
            await props.getProfile();
            await props.getAllCategories();
        }
        ok()
    }, []);
    useEffect( () => {
        if (props.profile) {
            console.log('user Tenders categories', props.profile.tenderCategories);
            setChecked(props.profile.tenderCategories);
            console.log('dddd', props.profile)
        }
    }, [props.profile]);

    useEffect(() => {
        if (props.categories && props.categories.length > 0) {
            const treeData = [];
            for (let i = 0; i < props.categories.length; i++) {
                const item = props.categories[i];
                const obj = {
                    value: item._id,
                    label: item.title,
                };
                if (item.subCategories && item.subCategories.length > 0) {
                    const children = [];
                    for (let j = 0; j < item.subCategories.length; j++) {
                        const el = item.subCategories[j];
                        const subObj = {
                            value: el._id,
                            label: el.title,
                        };
                        children.push(subObj);
                    }
                    obj.children = children;
                }

                treeData.push(obj);
            }

            setTreeCategories(treeData);
            setNodes(treeData);
        }
    }, [props.categories]);
    useEffect(() => {
    }, []);

    const handleSelected = (checked) => {
        setChecked(checked);
        const personal = {
            tenderCategories: checked,
        };
        setPersonalInfo(personal);
        console.log(checked);
    };
    const testmode = async () => {
        // console.log('This is props', props.profile.tenderCategories);
        await props.updateProfile(personalInfo).then(toast.success("Updated successfully!"));
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
        categories: store.category.categories,
        profile: store.user.profile,
        isUpdated: store.user.isUpdated,
    };
};

const mapDispatchToProps = {
    getAllCategories,
    getProfile,
    updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(TenderCategories);