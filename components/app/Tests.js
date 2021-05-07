import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStepForward } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

import {
  Container,
  Button,
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


const Tests = (props) => {
   const router = useRouter();
   const handleStartPractice = async (testId) => {    
    router.push(`/practice/${testId}`);
  };

  const tableColumns = [
    {
      dataField: "id",
      text: "Id",
      hidden: true,
    },
    {
      dataField:"text",
      text:"Name",
      sort:true
    },
    {
      dataField: "subject",
      text: "Subject",
      sort: true,
    },
    {
      dataField: "",
      text: "Attempts",
      sort: false,
    },
    {
      text: "Actions",
      dataField: "",
      formatter: (cell, row, rowIndex) => (
        <>
         
          <Button
            onClick={() => handleStartPractice(row.id)}
          >
         <FontAwesomeIcon
              icon={faPlay}
              fixedWidth
              className="align-middle mr-1"
            />   Start
          </Button>
          <span> </span>
           <Button
            onClick={() => handleStartPractice(row.id)}
          >
                     <FontAwesomeIcon
              icon={faStepForward}
              fixedWidth
              className="align-middle mr-1"
            /> Resume
          </Button>
          <span> </span>
        </>
      ),
    },
  ];

  return (
    <section className="py-6 bg-white">
      <Container>
        <div className="mb-4 text-center">
          <h2>Available Tests</h2>
        </div>
        <BootstrapTable
            keyField="id"
            data={props.testList.testsByTypeAndYear}
            columns={tableColumns}
            bootstrap4
            bordered={false}
            pagination={paginationFactory({
              sizePerPage: 50,
              sizePerPageList: [5, 10, 25, 50],
            })}
          />
      </Container>
    </section>
  );
};

export default Tests;
