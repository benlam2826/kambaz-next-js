"use client";
import { useState } from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls({
    moduleName,
    setModuleName,
    addModule,
}: {
    moduleName: string;
    setModuleName: (title: string) => void;
    addModule: () => void;
}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div
            id="wd-modules-controls"
            className="d-flex flex-wrap justify-content-end align-items-center gap-2 w-100 mb-3"
        >
            <Button variant="secondary" size="lg" id="wd-collapse-all">
                Collapse All
            </Button>
            <Button variant="secondary" size="lg" id="wd-view-progress">
                View Progress
            </Button>
            <Dropdown>
                <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
                    <GreenCheckmark /> Publish All
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem id="wd-publish-all">
                        <GreenCheckmark /> Publish All
                    </DropdownItem>
                    <DropdownItem id="wd-publish-all-modules-and-items">
                        <GreenCheckmark /> Publish all modules and items
                    </DropdownItem>
                    <DropdownItem id="wd-publish-modules-only">
                        <GreenCheckmark /> Publish modules only
                    </DropdownItem>
                    <DropdownItem id="wd-unpublish-all-modules-and-items">
                        Unpublish all modules and items
                    </DropdownItem>
                    <DropdownItem id="wd-unpublish-modules-only">
                        Unpublish modules only
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Button
                variant="danger"
                size="lg"
                id="wd-add-module-btn"
                onClick={handleShow}
            >
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module
            </Button>
            <ModuleEditor
                show={show}
                handleClose={handleClose}
                dialogTitle="Add Module"
                moduleName={moduleName}
                setModuleName={setModuleName}
                addModule={() => {
                    const trimmed = moduleName.trim();
                    if (!trimmed) return;
                    addModule();
                    handleClose();
                }}
            />
        </div>
    );
}
