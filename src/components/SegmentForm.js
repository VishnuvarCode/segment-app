import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../components/SegmentForm.model.css";

const SegmentForm = () => {
  const [show, setShow] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState("");
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddSchema = () => {
    if (selectedSchema) {
      const selected = availableSchemas.find(
        (schema) => schema.value === selectedSchema
      );
      setSchemas([...schemas, selected]);
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema.value !== selectedSchema)
      );
      setSelectedSchema("");
    }
  };

  const handleSaveSegment = () => {
    const segmentData = {
      segment_name: segmentName,
      schema: schemas.map((schema) => ({ [schema.value]: schema.label })),
    };

    // Webhook url
    const webhookUrl =
      "https://webhook.site/e68f604e-9bf5-4281-9df4-50cb53a8e086";

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(segmentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    handleClose();
  };

  return (
    <>
      <div className="SegmentFormStyle">
        <h1>Save Segment Form</h1>
      </div>

      <div className="SegmentFormStyle">
        <Button variant="primary" onClick={handleShow}>
          Save segment
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save Segment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Segment Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter segment name"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Add schema to segment</Form.Label>
              <Form.Control
                as="select"
                value={selectedSchema}
                onChange={(e) => setSelectedSchema(e.target.value)}
              >
                <option value="">Select schema</option>
                {availableSchemas.map((schema) => (
                  <option key={schema.value} value={schema.value}>
                    {schema.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button
              variant="secondary"
              onClick={handleAddSchema}
              className="mt-2"
            >
              + Add new schema
            </Button>

            <div className="mt-3">
              {schemas.map((schema, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#cce5ff",
                    padding: "10px",
                    margin: "5px 0",
                  }}
                >
                  <Form.Control
                    as="select"
                    value={schema.value}
                    onChange={(e) => {
                      const updatedSchema = schemas.map((s, i) =>
                        i === index
                          ? availableSchemas.find(
                              (s) => s.value === e.target.value
                            )
                          : s
                      );
                      setSchemas(updatedSchema);
                      setAvailableSchemas(
                        availableSchemas.filter(
                          (s) => s.value !== e.target.value
                        )
                      );
                    }}
                  >
                    <option value={schema.value}>{schema.label}</option>
                    {availableSchemas.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </Form.Control>
                </div>
              ))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveSegment}>
            Save Segment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SegmentForm;
