"use client";

import Link from "next/link";
import { Row, Col, Button, ButtonGroup, ListGroup, InputGroup, FormControl,
  Badge, DropdownButton, Dropdown } from "react-bootstrap";
import { BsSearch, BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="pt-2">
      <Row className="align-items-center mb-3">
        <Col md={6} lg={5}>
          <InputGroup>
            <InputGroupText>
              <BsSearch />
            </InputGroupText>
            <FormControl
              id="wd-search-assignment"
              placeholder="Search for Assignment"
              aria-label="Search for Assignment"
            />
          </InputGroup>
        </Col>
        <Col className="text-end">
          <ButtonGroup>
            <Button id="wd-add-assignment-group" variant="secondary" className="text-nowrap">
              <FaPlus className="me-2" />
              Group
            </Button>
            <Button id="wd-add-assignment" variant="danger" className="text-nowrap">
              <FaPlus className="me-2" />
              Assignment
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      {/* Group header */}
      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroup.Item className="p-3 bg-body border-gray d-flex justify-content-between align-items-center">
          <h3 id="wd-assignments-title" className="m-0 d-flex align-items-center">
            <BsGripVertical className="me-2 fs-4 text-secondary" />
            <span className="me-2">ASSIGNMENTS</span>
            <Badge bg="secondary" text="dark">40% of Total</Badge>
          </h3>
          <div className="d-flex align-items-center">
            <DropdownButton
              id="wd-assignments-publish-dd"
              title={<span><GreenCheckmark /> Publish All</span>}
              variant="secondary"
              align="end"
              className="me-2"
            >
              <Dropdown.Item><GreenCheckmark /> Publish All</Dropdown.Item>
              <Dropdown.Item><GreenCheckmark /> Publish all assignments and items</Dropdown.Item>
              <Dropdown.Item><GreenCheckmark /> Publish assignments only</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Unpublish all assignments and items</Dropdown.Item>
              <Dropdown.Item>Unpublish assignments only</Dropdown.Item>
            </DropdownButton>
            <Button variant="danger" size="sm" className="text-nowrap">
              <FaPlus className="me-1" /> Assignment
            </Button>
          </div>
        </ListGroup.Item>

        {/* A1 */}
        <ListGroup.Item className="wd-assignment-item p-3">
          <div className="d-flex justify-content-between">
            <div>
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-5 text-secondary" />
                <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link text-decoration-none">
                  <strong>A1 – ENV + HTML</strong>
                </Link>
              </div>
              <div className="text-secondary small ps-4 mt-1">
                <span className="me-2">Multiple Modules</span>
                <span className="me-2">|</span>
                <span className="me-2">Due: Oct 10 at 11:59pm</span>
                <span className="me-2">|</span>
                <span>100 pts</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <GreenCheckmark />
              <IoEllipsisVertical className="fs-4 text-secondary" />
            </div>
          </div>
        </ListGroup.Item>

        {/* A2 */}
        <ListGroup.Item className="wd-assignment-item p-3">
          <div className="d-flex justify-content-between">
            <div>
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-5 text-secondary" />
                <Link href="/Courses/1234/Assignments/124" className="wd-assignment-link text-decoration-none">
                  <strong>A2 – CSS + BOOTSTRAP</strong>
                </Link>
              </div>
              <div className="text-secondary small ps-4 mt-1">
                <span className="me-2">Multiple Modules</span>
                <span className="me-2">|</span>
                <span className="me-2">Due: Oct 17 at 11:59pm</span>
                <span className="me-2">|</span>
                <span>100 pts</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <GreenCheckmark />
              <IoEllipsisVertical className="fs-4 text-secondary" />
            </div>
          </div>
        </ListGroup.Item>

        {/* A3 */}
        <ListGroup.Item className="wd-assignment-item p-3">
          <div className="d-flex justify-content-between">
            <div>
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-5 text-secondary" />
                <Link href="/Courses/1234/Assignments/125" className="wd-assignment-link text-decoration-none">
                  <strong>A3 – JAVASCRIPT + REACT</strong>
                </Link>
              </div>
              <div className="text-secondary small ps-4 mt-1">
                <span className="me-2">Multiple Modules</span>
                <span className="me-2">|</span>
                <span className="me-2">Due: Oct 24 at 11:59pm</span>
                <span className="me-2">|</span>
                <span>100 pts</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <GreenCheckmark />
              <IoEllipsisVertical className="fs-4 text-secondary" />
            </div>
          </div>
        </ListGroup.Item>

        {/* A4 */}
        <ListGroup.Item className="wd-assignment-item p-3">
          <div className="d-flex justify-content-between">
            <div>
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-5 text-secondary" />
                <Link href="/Courses/1234/Assignments/126" className="wd-assignment-link text-decoration-none">
                  <strong>A4 – RESTFUL APIS + NODEJS</strong>
                </Link>
              </div>
              <div className="text-secondary small ps-4 mt-1">
                <span className="me-2">Multiple Modules</span>
                <span className="me-2">|</span>
                <span className="me-2">Due: Oct 31 at 11:59pm</span>
                <span className="me-2">|</span>
                <span>100 pts</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <GreenCheckmark />
              <IoEllipsisVertical className="fs-4 text-secondary" />
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
