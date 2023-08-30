import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { TooljetDatabaseContext } from '@/TooljetDatabase/index';
import DropDownSelect from './DropDownSelect';
import { ButtonSolid } from '@/_ui/AppButton/AppButton';
import Trash from '@/_ui/Icon/solidIcons/Trash';
import AddRectangle from '@/_ui/Icon/bulkIcons/AddRectangle';
import { isEmpty } from 'lodash';

export default function JoinSort({ darkMode }) {
  const { tableInfo, joinOrderByOptions, setJoinOrderByOptions } = useContext(TooljetDatabaseContext);

  const tableList = Object.entries(tableInfo).map(([key, value]) => {
    const tableDetails = {
      label: key,
      value: key,
      options: value.map((columns) => ({ label: columns.Header, value: columns.Header, table: key })),
    };
    return tableDetails;
  });

  const sortbyConstants = [
    { label: 'Ascending', value: 'ASC' },
    { label: 'Descending', value: 'DESC' },
  ];

  return (
    <Container className="p-0">
      {isEmpty(joinOrderByOptions) ? (
        <Row className="mb-2">
          <div
            style={{
              border: '1px dashed var(--slate-08, #C1C8CD)',
            }}
            className="px-4 py-2 text-center rounded-1"
          >
            There are no conditions
          </div>
        </Row>
      ) : (
        joinOrderByOptions.map((options, i) => (
          <Row className="border rounded mb-1" key={i}>
            <Col sm="6" className="p-0 border-end">
              <DropDownSelect
                options={tableList}
                darkMode={darkMode}
                value={{ value: options.columnName, label: options.columnName }}
                onChange={(option) => {
                  setJoinOrderByOptions(
                    joinOrderByOptions.map((sortBy, index) => {
                      if (i === index) {
                        return {
                          ...sortBy,
                          columnName: option?.value,
                          table: option.table,
                        };
                      }
                      return sortBy;
                    })
                  );
                }}
              />
            </Col>
            <Col sm="5" className="p-0 border-end d-flex">
              <div className="flex-grow-1">
                <DropDownSelect
                  options={sortbyConstants}
                  darkMode={darkMode}
                  value={sortbyConstants.find((opt) => opt.value === options.direction)}
                  onChange={(option) => {
                    setJoinOrderByOptions(
                      joinOrderByOptions.map((sortBy, index) => {
                        if (i === index) {
                          return {
                            ...sortBy,
                            direction: option?.value,
                          };
                        }
                        return sortBy;
                      })
                    );
                  }}
                />
              </div>
            </Col>
            <Col sm="1" className="p-0">
              <ButtonSolid
                size="sm"
                variant="ghostBlack"
                className="px-1 w-100 rounded-0"
                onClick={() => setJoinOrderByOptions(joinOrderByOptions.filter((opt, idx) => idx !== i))}
              >
                <Trash fill="var(--slate9)" style={{ height: '16px' }} />
              </ButtonSolid>
            </Col>
          </Row>
        ))
      )}
      {/* Dynamically render below Row */}
      <Row className="mb-2">
        <Col className="p-0">
          <ButtonSolid variant="ghostBlue" size="sm" onClick={() => setJoinOrderByOptions([...joinOrderByOptions, {}])}>
            <AddRectangle width="15" fill="#3E63DD" opacity="1" secondaryFill="#ffffff" />
            &nbsp;&nbsp; Add more
          </ButtonSolid>
        </Col>
      </Row>
    </Container>
  );
}
