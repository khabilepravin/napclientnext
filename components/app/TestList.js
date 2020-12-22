import React from "react";
import {  useQuery } from "@apollo/react-hooks";

import { GET_TESTS } from "../../lib/apiproxy/queries";
import { useRouter } from "next/router";
import  Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Button,
} from "reactstrap";

import Header from "../theme/Header";
import HeaderTitle from "../theme/HeaderTitle";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TestList({ history })  {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_TESTS);

  const tableColumns = [
    {
      dataField: "id",
      text: "Id",
      hidden: true,
    },
    {
      dataField: "text",
      text: "Text",
      sort: true,
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
    },
    {
      dataField: "subject",
      text: "Subject",
      sort: true,
    },
    {
      dataField: "year",
      text: "Year",
      sort: true,
    },
    {
      text: "Actions",
      dataField: "",
      formatter: (cell, row, rowIndex) => (
        <Link href={`/content/addtest/testadd/${row.id}`}>
        <a>
         Questions
        </a>
        </Link>
      ),
    },
  ];

  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>There was an error</p>
      </div>
    );
  }

  if (data) {
    return (
      <Container fluid>
        <Header>
          <HeaderTitle>Tests List</HeaderTitle>         
        </Header>
        <Card>
          <CardHeader>
            <CardTitle tag="h5">Test List</CardTitle>
          </CardHeader>
          <CardBody>
            
            <Button
              color="secondary"
              className="mr-1 mb-1"
              onClick={() => { router.push("/content/testadd") }}>
              <FontAwesomeIcon icon={faPlus} /> Add Test
            </Button>
            
            <BootstrapTable
              keyField="id"
              data={data.tests}
              columns={tableColumns}
              bootstrap4
              bordered={false}
              pagination={paginationFactory({
                sizePerPage: 10,
                sizePerPageList: [5, 10, 25, 50],
              })}
            />
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default TestList;
