import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import axios from "axios";

const DIDManagement = () => {
  const [alias, setAlias] = useState("");
  const [alias1, setAlias1] = useState("");
  const [didToUpdate, setDidToUpdate] = useState("");
  const [Doc, setDidDoc] = useState("");
  const [Md, setMd] = useState("");
  const [Rd, setRd] = useState("");

  const [vc_did, set_vc_did] = useState("");
  const [vc_did1, set_vc_did1] = useState("");
  const [vc, set_vc] = useState("");

  const createDID = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/did/create/${alias}`);
      setAlias("");
      alert("DID created successfully");
    } catch (error) {
      console.error("Error creating DID:", error);
      alert("Error creating DID");
    }
  };

  const resolveDID = async (e) => {
    e.preventDefault();
    try {
      const did = "did:cosmos:net:cash:" + { alias1 };
      //const didDoc = await axios.get(`http://localhost:2109/identifier/did:cosmos:net:cash:${alias1}`)

      const didDoc = await axios.get(
        `http://localhost:3000/api/did/resolve/${alias1}`
      );
      setAlias1("");
      //console.log(didDoc)
      //setDidDoc(JSON.stringify(didDoc.data))
      setDidDoc(JSON.stringify(didDoc.data.didDocument), null, "\n");
      setMd(JSON.stringify(didDoc.data.didDocumentMetadata), null, "\n");
      setRd(JSON.stringify(didDoc.data.didResolutionMetadata), null, "\n");

      //alert(JSON.stringify(didDoc.data.didDocumentMetadata),null,'\t');
    } catch (error) {
      console.error("Error resolving DID:", error);
      alert("Error resolving DID");
    }
  };

  const createVC = async (e) => {
    e.preventDefault();
    try {
      //const did = "did:cosmos:net:cash:" + { alias1 };
      //const didDoc = await axios.get(`http://localhost:2109/identifier/did:cosmos:net:cash:${alias1}`)
      const req = {
        issuer: vc_did,
        customer: vc_did1,
      };

      const vc = await axios.get(
        `http://localhost:3000/api/did/createVC/${vc_did1}/${vc_did}`
      );
      set_vc_did("");
      console.log(vc);
      //setDidDoc(JSON.stringify(didDoc.data))
      //setDidDoc(JSON.stringify(didDoc.data.didDocument), null, "\n");
      set_vc(JSON.stringify(vc), null, "\n");

      //alert(JSON.stringify(didDoc.data.didDocumentMetadata),null,'\t');
    } catch (error) {
      console.error("Error creating VC:", error);
      alert("Error creating VC");
    }
  };

  const updateDID = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/did/${didToUpdate}`, {
        alias,
      });
      setAlias("");
      setDidToUpdate("");
      alert("DID alias updated successfully");
    } catch (error) {
      console.error("Error updating DID:", error);
      alert("Error updating DID");
    }
  };

  return (
    <div className="mt-3">
      <h4>Create DID</h4>
      <Form onSubmit={createDID}>
        <Form.Group controlId="createAlias">
          <Form.Label>Alias</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the alias of the DID"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
      <br />
      <br />

      <h4>Resolve DID</h4>
      <Form onSubmit={resolveDID}>
        <Form.Group controlId="resolveAlias">
          <Form.Label>Key</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the key/name of the DID"
            value={alias1}
            onChange={(e) => setAlias1(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Resolve
        </Button>
        <br />
        <br />

        <h4>DID Doc </h4>
        <Form.Text>{Doc}</Form.Text>

        <br />
        <br />

        <h4>DID Doc Metadata </h4>
        <Form.Text>{Md}</Form.Text>

        <br />
        <br />

        <h4>DID Resolution Metadata </h4>
        <Form.Text>{Rd}</Form.Text>
      </Form>

      <br />
      <br />

      <h4>Create Verifiable Credential</h4>
      <Form onSubmit={createVC}>
        <Form.Group controlId="createVC_alias">
          <Form.Label>DID of Customer</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the DID of the user"
            value={vc_did1}
            onChange={(e) => set_vc_did1(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="createVC_alias">
          <Form.Label>DID of user</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the DID of the issuer"
            value={vc_did}
            onChange={(e) => set_vc_did(e.target.value)}
          />
        </Form.Group>

        <br />
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
      <br />
      <br />

      <h4>Verifiable Credential </h4>
      <Form.Text>{vc}</Form.Text>

      <br />
      <br />
    </div>
  );
};
export default DIDManagement;
